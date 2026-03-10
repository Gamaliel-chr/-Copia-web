/* =====================================
   menu.js — Proyecto Mera
   Lógica del menú hamburguesa responsive.
   Se auto-inicializa cuando la página carga.
   ===================================== */

function initMenu() {

    var btnMenu = document.getElementById('btnMenu');
    var nav     = document.querySelector('nav');

    if (!btnMenu || !nav) return;

    // Abrir/cerrar menú al hacer clic en el botón
    btnMenu.addEventListener('click', function () {
        var isOpen = nav.classList.toggle('open');
        btnMenu.setAttribute('aria-expanded', String(isOpen));
    });

    // Cerrar al hacer clic en un enlace
    nav.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            nav.classList.remove('open');
            btnMenu.setAttribute('aria-expanded', 'false');
        }
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener('click', function (e) {
        if (!nav.contains(e.target) && e.target !== btnMenu) {
            nav.classList.remove('open');
            btnMenu.setAttribute('aria-expanded', 'false');
        }
    });

    // Cerrar con tecla Escape (accesibilidad)
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            nav.classList.remove('open');
            btnMenu.setAttribute('aria-expanded', 'false');
            btnMenu.focus();
        }
    });
}

// Auto-inicialización
window.addEventListener('load', initMenu);
