/* =====================================
   seguridad.js — Proyecto Mera
   Lógica exclusiva de la página de seguridad:
   validación de correo institucional,
   contraseña fuerte, localStorage y sessionStorage.
   Se auto-inicializa cuando la página carga.
   ===================================== */

function initSeguridad() {

    var emailInput = document.getElementById('email');
    var pwInput    = document.getElementById('pw');
    var btnGuardar = document.getElementById('btnGuardar');
    var info       = document.getElementById('info');

    // Si no existe el botón, esta página no tiene el formulario
    if (!btnGuardar) return;

    // Si hay un email guardado en localStorage, se precarga
    var emailGuardado = localStorage.getItem('user_email');
    if (emailGuardado && emailInput) {
        emailInput.value = emailGuardado;
    }

    btnGuardar.addEventListener('click', function () {

        var email    = emailInput.value.trim();
        var password = pwInput.value;

        // Validación de correo institucional (.edu o .ac)
        var emailValido = /@[a-z0-9.-]+\.(?:edu|ac)(?:\.[a-z]{2,})?$/i.test(email);

        // Validación de contraseña fuerte
        var passwordFuerte = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);

        info.className = '';

        if (!emailValido) {
            info.textContent = 'Se requiere un correo institucional (ej: usuario@universidad.edu).';
            info.className   = 'err';
            return;
        }

        if (!passwordFuerte) {
            info.textContent = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo (!@#$%^&*).';
            info.className   = 'err';
            return;
        }

        // Guardar en localStorage (persiste al cerrar navegador)
        localStorage.setItem('user_email', email);

        // Guardar en sessionStorage (se borra al cerrar pestaña)
        sessionStorage.setItem('session_start', Date.now().toString());
        sessionStorage.setItem('session_user',  email);

        info.textContent = 'Datos guardados correctamente. (Demo — no guardes contraseñas reales.)';
        info.className   = 'ok';
    });
}

// Auto-inicialización
window.addEventListener('load', initSeguridad);
