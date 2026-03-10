/* =====================================
   utilidades.js — Proyecto Mera
   Funciones globales reutilizables
   en cualquier parte del proyecto.
   ===================================== */

/**
 * Escapa caracteres HTML peligrosos para prevenir XSS.
 * Reemplaza &, <, >, " y ' por sus entidades HTML seguras.
 *
 * @param {string} str - Texto a escapar
 * @returns {string} Texto seguro para insertar en HTML
 */
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g,  '&lt;')
        .replace(/>/g,  '&gt;')
        .replace(/"/g,  '&quot;')
        .replace(/'/g,  '&#39;');
}
