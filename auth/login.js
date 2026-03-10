/* =====================================
   login.js — Proyecto Mera
   Lógica exclusiva del módulo de autenticación:
   protección de páginas, credenciales demo,
   formulario de login, barra de sesión y logout.
   Se auto-inicializa cuando la página carga.
   ===================================== */


/* Credenciales de ejemplo para probar el login */
var USUARIOS_DEMO = [
    { email: 'wagner@est.utn.ac.cr',     password: 'Gramo1234!' },
    { email: 'estudiante@est.utn.ac.cr',  password: 'Seguro99@' }
];


/* =====================================
   PROTECCIÓN DE PÁGINAS
   Se ejecuta inmediatamente al cargar el script.
   Si no hay sesión activa, redirige al login.
   ===================================== */
(function () {

    var pagina    = window.location.pathname;
    var esLogin   = pagina.indexOf('login.html') !== -1;
    var haySession = sessionStorage.getItem('session_user');

    // Si no está en login y no hay sesión → redirige al login
    if (!esLogin && !haySession) {
        window.location.replace('../auth/login.html');
    }

    // Si ya hay sesión y está en login → redirige al inicio
    if (esLogin && haySession) {
        window.location.replace('../inicio/inicio.html');
    }

}());


/* =====================================
   FORMULARIO DE LOGIN
   ===================================== */

function initLogin() {

    var btnLogin = document.getElementById('btnLogin');
    if (!btnLogin) return;

    var loginInfo = document.getElementById('login-info');

    function intentarLogin() {

        var email    = document.getElementById('login-email').value.trim();
        var password = document.getElementById('login-pw').value;

        loginInfo.className   = '';
        loginInfo.textContent = '';

        if (!email || !password) {
            loginInfo.textContent = 'Completa todos los campos.';
            loginInfo.className   = 'err';
            return;
        }

        var valido = USUARIOS_DEMO.some(function (u) {
            return u.email === email && u.password === password;
        });

        if (!valido) {
            loginInfo.textContent = 'Correo o contraseña incorrectos.';
            loginInfo.className   = 'err';
            return;
        }

        // Crear sesión
        sessionStorage.setItem('session_user',  email);
        sessionStorage.setItem('session_start', Date.now().toString());
        localStorage.setItem('user_email', email);

        loginInfo.textContent = 'Acceso correcto. Redirigiendo...';
        loginInfo.className   = 'ok';

        setTimeout(function () {
            window.location.href = '../inicio/inicio.html';
        }, 800);
    }

    btnLogin.addEventListener('click', intentarLogin);

    ['login-email', 'login-pw'].forEach(function (id) {
        document.getElementById(id).addEventListener('keydown', function (e) {
            if (e.key === 'Enter') intentarLogin();
        });
    });
}


/* =====================================
   BARRA DE SESIÓN EN EL HEADER
   ===================================== */

function initSesionHeader() {

    var header  = document.querySelector('header');
    var usuario = sessionStorage.getItem('session_user');

    if (!header || !usuario) return;

    var bar = document.createElement('div');
    bar.className = 'session-bar';

    var icono = document.createElement('span');
    icono.textContent = '👤';

    var texto = document.createElement('span');
    texto.textContent = usuario;

    var btnLogout = document.createElement('button');
    btnLogout.className = 'btn-logout';
    btnLogout.textContent = 'Cerrar sesión';

    btnLogout.addEventListener('click', function () {
        sessionStorage.clear();
        window.location.href = '../auth/login.html';
    });

    bar.appendChild(icono);
    bar.appendChild(texto);
    bar.appendChild(btnLogout);
    header.appendChild(bar);
}


/* =====================================
   INICIALIZACIÓN
   ===================================== */

window.addEventListener('load', function () {
    initLogin();
    initSesionHeader();
});
