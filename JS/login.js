/* =====================================
   login.js — Proyecto Meta

   Este archivo se encarga del sistema de
   inicio de sesión del proyecto.

   Aquí manejo:
   - autenticación del usuario
   - control de sesión
   - protección de páginas
   ===================================== */


/* Credenciales de ejemplo para probar el login
   (solo son usuarios de demostración) */
var USUARIOS_DEMO = [
    { email: 'wagner@est.utn.ac.cr',      password: 'Gramo1234!' },
    { email: 'estudiante@est.utn.ac.cr', password: 'Seguro99@' }
];


/* =====================================
   PROTECCIÓN DE PÁGINAS

   Este bloque se ejecuta inmediatamente
   cuando el archivo se carga, incluso
   antes de que la página termine de cargar.

   La idea es que si un usuario no tiene
   sesión activa, no pueda entrar a páginas
   protegidas del sitio.
   ===================================== */
(function () {

    // Obtiene la ruta de la página actual
    var pagina = window.location.pathname;

    // Verifica si la página actual es login.html
    var esLogin = pagina.indexOf('login.html') !== -1;

    // Revisa si existe una sesión guardada
    var haySession = sessionStorage.getItem('session_user');

    // Si NO está en la página de login y tampoco hay sesión
    if (!esLogin && !haySession) {

        // entonces redirige automáticamente al login
        window.location.replace('./login.html');
    }

    // Si ya hay sesión pero el usuario abre login.html
    if (esLogin && haySession) {

        // lo manda al inicio para evitar que vuelva a iniciar sesión
        window.location.replace('./index.html');
    }

}());


/* =====================================
   FORMULARIO DE LOGIN
   ===================================== */

function initLogin() {

    // Botón que ejecuta el login
    var btnLogin = document.getElementById('btnLogin');

    // Si el botón no existe, significa que esta página
    // no tiene formulario de login
    if (!btnLogin) return;

    // Elemento donde se mostrarán mensajes
    var loginInfo = document.getElementById('login-info');


    // Función que intenta hacer el login
    function intentarLogin() {

        // Obtiene el correo ingresado
        var email = document.getElementById('login-email').value.trim();

        // Obtiene la contraseña
        var password = document.getElementById('login-pw').value;

        // Limpia mensajes anteriores
        loginInfo.className = '';
        loginInfo.textContent = '';

        // Verifica que los campos no estén vacíos
        if (!email || !password) {

            loginInfo.textContent = 'Completa todos los campos.';
            loginInfo.className = 'err';
            return;
        }

        // Busca si el correo y la contraseña coinciden
        // con alguno de los usuarios demo
        var valido = USUARIOS_DEMO.some(function (u) {

            return u.email === email && u.password === password;

        });

        // Si no coincide con ningún usuario
        if (!valido) {

            loginInfo.textContent = 'Correo o contraseña incorrectos.';
            loginInfo.className = 'err';
            return;
        }

        /* Si el login es correcto se crea una sesión
           usando sessionStorage.

           sessionStorage dura mientras la pestaña esté abierta.
           Si el usuario cierra el navegador, la sesión se borra.
        */

        sessionStorage.setItem('session_user', email);

        // Guarda el momento en que inició la sesión
        sessionStorage.setItem('session_start', Date.now().toString());

        // También guardo el correo en localStorage
        // para poder recordarlo en otros formularios
        localStorage.setItem('user_email', email);

        // Mensaje de confirmación
        loginInfo.textContent = 'Acceso correcto. Redirigiendo...';
        loginInfo.className = 'ok';

        // Espera un pequeño momento y luego redirige al inicio
        setTimeout(function () {

            window.location.href = './index.html';

        }, 800);
    }


    // Ejecuta el login cuando se presiona el botón
    btnLogin.addEventListener('click', intentarLogin);


    // También permite iniciar sesión presionando Enter
    ['login-email', 'login-pw'].forEach(function (id) {

        document.getElementById(id).addEventListener('keydown', function (e) {

            if (e.key === 'Enter') intentarLogin();

        });

    });
}


/* =====================================
   BARRA DE SESIÓN EN EL HEADER

   Esta parte muestra en el encabezado
   qué usuario está conectado y agrega
   un botón para cerrar sesión.
   ===================================== */

function initSesionHeader() {

    // Busca el header de la página
    var header = document.querySelector('header');

    // Obtiene el usuario de la sesión
    var usuario = sessionStorage.getItem('session_user');

    // Si no hay header o no hay usuario activo, termina
    if (!header || !usuario) return;

    // Crea un contenedor para la barra de sesión
    var bar = document.createElement('div');
    bar.className = 'session-bar';

    // Icono simple de usuario
    var icono = document.createElement('span');
    icono.textContent = '👤';

    // Texto con el correo del usuario
    var texto = document.createElement('span');
    texto.textContent = usuario;

    // Botón para cerrar sesión
    var btnLogout = document.createElement('button');
    btnLogout.className = 'btn-logout';
    btnLogout.textContent = 'Cerrar sesión';

    // Cuando el usuario hace clic en cerrar sesión
    btnLogout.addEventListener('click', function () {

        // Borra toda la información de sesión
        sessionStorage.clear();

        // Regresa al login
        window.location.href = './cls-login.html';
    });

    // Agrega los elementos a la barra
    bar.appendChild(icono);
    bar.appendChild(texto);
    bar.appendChild(btnLogout);

    // Finalmente agrega la barra al header
    header.appendChild(bar);
}


/* =====================================
   INICIALIZACIÓN DEL SCRIPT
   ===================================== */

// Cuando la página termina de cargar
window.addEventListener('load', function () {

    // Inicializa el sistema de login
    initLogin();

    // Inicializa la barra de sesión en el header
    initSesionHeader();

});