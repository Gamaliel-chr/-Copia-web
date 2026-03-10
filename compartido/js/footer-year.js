/* =====================================
   footer-year.js — Proyecto Mera
   Coloca el año actual en los elementos
   con clase "year" dentro del footer.
   Se auto-inicializa cuando la página carga.
   ===================================== */

function initYear() {

    var spans = document.querySelectorAll('.year');
    var year  = new Date().getFullYear();

    for (var i = 0; i < spans.length; i++) {
        spans[i].textContent = year;
    }
}

// Auto-inicialización
window.addEventListener('load', initYear);
