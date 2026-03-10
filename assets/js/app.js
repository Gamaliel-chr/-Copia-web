/* app.js - router por hash, utilidades y vistas modulares para Proyecto Mera */

// Utilidad para crear elementos de forma segura
function el(tag, attrs = {}, children = []){
  const node = document.createElement(tag);
  for(const [k,v] of Object.entries(attrs)){
    if(k === 'class') node.className = v;
    else if(k === 'text') node.textContent = v;
    else if(k === 'html') node.innerHTML = v; // solo si el desarrollador sabe que es seguro
    else node.setAttribute(k,String(v));
  }
  (Array.isArray(children)?children:[children]).forEach(c=>{
    if(c==null) return;
    if(typeof c === 'string') node.appendChild(document.createTextNode(c));
    else node.appendChild(c);
  });
  return node;
}

function escapeHtml(str){
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// Vistas
const Views = {
  inicio: ()=> el('section',{},[
    el('h2',{text:'Inicio'}),
    el('p',{text:'Bienvenido al proyecto Mera — recursos y demos para estudiantes de Ingeniería y TI.'})
  ]),

  fundamentos: ()=> el('section',{},[
    el('h2',{text:'Fundamentos'}),
    el('p',{text:'Conceptos y métricas para definir un público meta.'})
  ]),

  diseno: ()=> el('section',{},[
    el('h2',{text:'Diseño'}),
    el('p',{text:'Buenas prácticas UI/UX para proyectos dirigidos a estudiantes de TI.'})
  ]),

  seguridad: ()=>{
    const email = el('input',{type:'email',id:'email',placeholder:'tu@institucion.edu'});
    const pw = el('input',{type:'password',id:'pw',placeholder:'Contraseña fuerte'});
    const btn = el('button',{type:'button'},'Guardar (demo)');
    const info = el('div',{class:'muted',id:'info'});
    btn.addEventListener('click',()=>{
      const em = email.value.trim();
      const p = pw.value;
      const validEmail = /@(?:edu|ac|edu\.[a-z]{2,})$/i.test(em);
      const strong = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(p);
      if(!validEmail) info.textContent = 'Correo institucional requerido.';
      else if(!strong) info.textContent = 'Contraseña no cumple los requisitos.';
      else{
        localStorage.setItem('user_email',em);
        sessionStorage.setItem('session_start',Date.now().toString());
        info.textContent = 'Datos guardados (demo). No guardes contraseñas reales.';
      }
    });

    return el('section',{},[
      el('h2',{text:'Seguridad'}),
      el('p',{text:'Validaciones y prácticas seguras.'}),
      el('div',{class:'card'},[
        el('label',{for:'email',text:'Correo institucional'}), email,
        el('label',{for:'pw',text:'Contraseña'}), pw,
        btn, info
      ])
    ]);
  },

  talleres: ()=> el('section',{},[ el('h2',{text:'Talleres'}), el('p',{text:'Ejercicios prácticos.'}) ]),

  sandbox: ()=>{
    const ta = el('textarea',{id:'xss',rows:4,placeholder:'Ingresa HTML/JS para demo'});
    const btnUnsafe = el('button',{type:'button'},'Mostrar (inseguro)');
    const btnSafe = el('button',{type:'button'},'Mostrar (seguro)');
    const out = el('div',{class:'card',id:'out'});
    const iframe = el('iframe',{sandbox:'allow-scripts',style:'width:100%;height:220px;border:1px solid #ddd;border-radius:8px;'});
    const btnIframe = el('button',{type:'button'},'Cargar en iframe');

    btnUnsafe.addEventListener('click',()=>{ out.innerHTML = ta.value; });
    btnSafe.addEventListener('click',()=>{ out.textContent = ta.value; });
    btnIframe.addEventListener('click',()=>{ iframe.srcdoc = ta.value; });

    return el('section',{},[
      el('h2',{text:'Sandbox / XSS demo'}),
      el('p',{text:'Compara insertar HTML sin filtrar vs escapar y usar un iframe aislado.'}),
      ta, el('div',{},[btnUnsafe,btnSafe,btnIframe]), out, iframe
    ]);
  }
};

// Router
function router(){
  const hash = (location.hash || '#inicio').replace('#','');
  const view = Views[hash] || Views.inicio;
  const app = document.getElementById('app');
  // limpiar de forma segura
  while(app.firstChild) app.removeChild(app.firstChild);
  const node = view();
  app.appendChild(node);
  // focus management para accesibilidad
  app.setAttribute('tabindex','-1');
  app.focus();
}

// Menu responsive - inicializar dentro de load para evitar null refs
function initMenu(){
  const btnMenu = document.getElementById('btnMenu');
  const menu = document.getElementById('menu');
  if(!btnMenu || !menu) return;

  btnMenu.addEventListener('click',()=>{
    const open = menu.classList.toggle('open');
    btnMenu.setAttribute('aria-expanded',String(open));
  });

  // Cierra al hacer click en un enlace (navegación SPA)
  menu.addEventListener('click',(e)=>{ if(e.target.tagName === 'A'){ menu.classList.remove('open'); btnMenu.setAttribute('aria-expanded','false'); }});


  // Cierra al hacer click fuera del menú
  document.addEventListener('click',e=>{
    if(!menu.contains(e.target) && e.target !== btnMenu){
      menu.classList.remove('open');
      btnMenu.setAttribute('aria-expanded','false');
    }
  });


  // Cierra con Escape para accesibilidad
  document.addEventListener('keydown',e=>{
    if(e.key === 'Escape'){
      menu.classList.remove('open');
      btnMenu.setAttribute('aria-expanded','false');
      btnMenu.focus();
    }
  });
}

// init
window.addEventListener('hashchange',router);
window.addEventListener('load',()=>{ initMenu(); router(); const em = localStorage.getItem('user_email'); if(em) console.log('Demo user:',em); });
