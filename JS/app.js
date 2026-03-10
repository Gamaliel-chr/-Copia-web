/* =====================================
   app.js — Proyecto Meta
   Aquí está el JavaScript principal del proyecto.
   En este archivo controlo varias cosas del sitio:
   - el menú hamburguesa
   - validaciones de seguridad
   - uso de localStorage y sessionStorage
   - y un pequeño sandbox para probar XSS
   ===================================== */


/* =====================================
   UTILIDADES
   ===================================== */

// Esta función sirve para evitar problemas de seguridad cuando se muestra texto del usuario.
// Lo que hace es reemplazar ciertos caracteres especiales de HTML para que no se ejecuten
// como código dentro de la página.
function escapeHtml(str) {
    return String(str)
        // Reemplaza el símbolo & por su versión segura
        .replace(/&/g, '&amp;')
        // Reemplaza < para que no se interprete como etiqueta HTML
        .replace(/</g,  '&lt;')
        // Reemplaza >
        .replace(/>/g,  '&gt;')
        // Reemplaza comillas dobles
        .replace(/"/g,  '&quot;')
        // Reemplaza comillas simples
        .replace(/'/g,  '&#39;');
}


/* =====================================
   MENÚ HAMBURGUESA RESPONSIVE
   ===================================== */

// Esta función inicializa todo lo relacionado al menú
function initMenu() {

    // Obtengo el botón del menú hamburguesa
    var btnMenu = document.getElementById('btnMenu');

    // Obtengo el elemento nav donde están los links
    var nav     = document.querySelector('nav');

    // Si por alguna razón no existen esos elementos en la página
    // la función simplemente termina
    if (!btnMenu || !nav) return;

    // Evento cuando se hace clic en el botón del menú
    btnMenu.addEventListener('click', function () {

        // Alterna la clase "open" para abrir o cerrar el menú
        var isOpen = nav.classList.toggle('open');

        // Actualiza el atributo aria-expanded para accesibilidad
        btnMenu.setAttribute('aria-expanded', String(isOpen));
    });

    // Cuando se hace clic en un link del menú
    // el menú se cierra automáticamente
    nav.addEventListener('click', function (e) {

        // Verifica que lo que se clickeó sea un enlace
        if (e.target.tagName === 'A') {

            // Quita la clase open
            nav.classList.remove('open');

            // Actualiza el atributo de accesibilidad
            btnMenu.setAttribute('aria-expanded', 'false');
        }
    });

    // Este evento detecta si se hace clic fuera del menú
    document.addEventListener('click', function (e) {

        // Si el clic no fue dentro del nav ni en el botón
        if (!nav.contains(e.target) && e.target !== btnMenu) {

            // entonces se cierra el menú
            nav.classList.remove('open');

            btnMenu.setAttribute('aria-expanded', 'false');
        }
    });

    // Este evento detecta cuando se presiona una tecla
    document.addEventListener('keydown', function (e) {

        // Si la tecla presionada es Escape
        if (e.key === 'Escape') {

            // se cierra el menú
            nav.classList.remove('open');

            btnMenu.setAttribute('aria-expanded', 'false');

            // y el foco vuelve al botón del menú
            btnMenu.focus();
        }
    });
}


/* =====================================
   AÑO ACTUAL EN EL FOOTER
   ===================================== */

// Esta función coloca automáticamente el año actual en el footer
function initYear() {

    // Busca todos los elementos que tengan la clase "year"
    var spans = document.querySelectorAll('.year');

    // Obtiene el año actual del sistema
    var year  = new Date().getFullYear();

    // Recorre todos los elementos encontrados
    for (var i = 0; i < spans.length; i++) {

        // Inserta el año dentro del elemento
        spans[i].textContent = year;
    }
}


/* =====================================
   SEGURIDAD — VALIDACIÓN Y STORAGE
   ===================================== */

// Esta función maneja la validación de datos del formulario
// y también el uso de localStorage y sessionStorage
function initSeguridad() {

    // Obtengo los elementos del formulario
    var emailInput = document.getElementById('email');
    var pwInput    = document.getElementById('pw');
    var btnGuardar = document.getElementById('btnGuardar');
    var info       = document.getElementById('info');

    // Si no existe el botón, significa que esta página
    // no tiene el formulario y se termina la función
    if (!btnGuardar) return;

    // Revisa si ya existe un email guardado en localStorage
    var emailGuardado = localStorage.getItem('user_email');

    // Si existe, lo coloca automáticamente en el input
    if (emailGuardado && emailInput) {
        emailInput.value = emailGuardado;
    }

    // Evento cuando se presiona el botón guardar
    btnGuardar.addEventListener('click', function () {

        // Obtiene el valor del email quitando espacios
        var email    = emailInput.value.trim();

        // Obtiene la contraseña
        var password = pwInput.value;

        // Validación del correo institucional
        // acepta dominios como .edu o .ac
        var emailValido = /@[a-z0-9.-]+\.(?:edu|ac)(?:\.[a-z]{2,})?$/i.test(email);

        // Validación de contraseña fuerte
        // mínimo 8 caracteres, mayúscula, minúscula, número y símbolo
        var passwordFuerte = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);

        // Limpia cualquier clase anterior
        info.className = '';

        // Si el correo no es válido
        if (!emailValido) {

            // muestra un mensaje de error
            info.textContent = 'Se requiere un correo institucional (ej: usuario@universidad.edu).';
            info.className   = 'err';

            return;
        }

        // Si la contraseña no cumple los requisitos
        if (!passwordFuerte) {

            info.textContent = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo (!@#$%^&*).';
            info.className   = 'err';

            return;
        }

        // Guarda el email en localStorage
        // esto permanece aunque se cierre el navegador
        localStorage.setItem('user_email', email);

        // Guarda datos de sesión
        // estos se borran cuando se cierra la pestaña
        sessionStorage.setItem('session_start', Date.now().toString());
        sessionStorage.setItem('session_user',  email);

        // Mensaje de confirmación
        info.textContent = 'Datos guardados correctamente. (Demo — no guardes contraseñas reales.)';
        info.className   = 'ok';
    });
}


/* =====================================
   SANDBOX — DEMO XSS
   ===================================== */

// Esta función muestra una demostración básica de XSS
// para entender la diferencia entre código inseguro y seguro
function initSandbox() {

    // Obtengo los elementos de la interfaz
    var textarea   = document.getElementById('xss');
    var btnUnsafe  = document.getElementById('btnUnsafe');
    var btnSafe    = document.getElementById('btnSafe');
    var btnIframe  = document.getElementById('btnIframe');
    var out        = document.getElementById('out');
    var frame      = document.getElementById('sandbox-frame');

    // Si no existe el textarea se cancela la función
    if (!textarea) return;

    // Modo inseguro
    // Inserta directamente el HTML en la página
    // esto demuestra cómo puede ocurrir un ataque XSS
    btnUnsafe.addEventListener('click', function () {
        out.innerHTML = textarea.value;
    });

    // Modo seguro
    // muestra el contenido como texto normal
    // evitando que se ejecute código
    btnSafe.addEventListener('click', function () {
        out.textContent = textarea.value;
    });

    // Ejecuta el código dentro de un iframe aislado
    // para probarlo sin afectar la página principal
    btnIframe.addEventListener('click', function () {
        frame.srcdoc = textarea.value;
    });
}


/* =====================================
   INICIALIZACIÓN GENERAL
   ===================================== */

// Cuando la página termina de cargar
window.addEventListener('load', function () {

    // Inicializa todas las funciones del sitio
    initMenu();
    initYear();
    initSeguridad();
    initSandbox();

    // Revisa si hay un usuario guardado en localStorage
    var userActivo = localStorage.getItem('user_email');

    if (userActivo) {

        // Solo lo muestra en consola como demostración
        console.log('Demo — usuario en localStorage:', userActivo);
    }

    // Revisa si hay una sesión iniciada
    var sesionInicio = sessionStorage.getItem('session_start');

    if (sesionInicio) {

        // Convierte el timestamp a fecha legible
        console.log('Demo — sesión iniciada en:', new Date(Number(sesionInicio)).toLocaleString());
    }
});