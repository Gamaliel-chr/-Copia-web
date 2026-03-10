/* =====================================
   sandbox.js — Proyecto Mera
   Lógica exclusiva de la demo XSS:
   modo inseguro, modo seguro e iframe aislado.
   Se auto-inicializa cuando la página carga.
   ===================================== */

function initSandbox() {

    var textarea   = document.getElementById('xss');
    var btnUnsafe  = document.getElementById('btnUnsafe');
    var btnSafe    = document.getElementById('btnSafe');
    var btnIframe  = document.getElementById('btnIframe');
    var out        = document.getElementById('out');
    var frame      = document.getElementById('sandbox-frame');

    // Si no existe el textarea, esta página no tiene el sandbox
    if (!textarea) return;

    // Modo inseguro: inserta HTML directamente (demuestra XSS)
    btnUnsafe.addEventListener('click', function () {
        out.innerHTML = textarea.value;
    });

    // Modo seguro: muestra como texto plano (previene XSS)
    btnSafe.addEventListener('click', function () {
        out.textContent = textarea.value;
    });

    // Ejecuta en iframe aislado (sandbox)
    btnIframe.addEventListener('click', function () {
        frame.srcdoc = textarea.value;
    });
}

// Auto-inicialización
window.addEventListener('load', initSandbox);
