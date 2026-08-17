const CENTRAL_PHONE_DISPLAY='+34 631 667 893';
const CENTRAL_PHONE_TEL='+34631667893';
const CENTRAL_PHONE_WA='34631667893';

const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav');

if(menuBtn&&nav){
  menuBtn.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded',String(open));
  });

  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded','false');
  }));
}

const serviceSelect=document.getElementById('serviceSelect');
const sizeSelect=document.getElementById('sizeSelect');
const specialNote=document.getElementById('specialNote');

const specialServices=new Set([
  'Caja personalizada',
  'Bicicleta',
  'Artículo grande / voluminoso',
  'Mudanza a República Dominicana',
  'Otro / consultar'
]);

function syncServiceUI(){
  if(!serviceSelect)return;
  const service=serviceSelect.value;
  const special=specialServices.has(service);
  if(specialNote)specialNote.hidden=!special;

  if(sizeSelect){
    sizeSelect.classList.toggle('emphasis',special);
    if(special&&service!=='Cajas estándar'){
      sizeSelect.value='Personalizado / especial';
    }
    if(service==='Cajas estándar'&&sizeSelect.value==='Personalizado / especial'){
      sizeSelect.value='';
    }
  }
}

if(serviceSelect){
  serviceSelect.addEventListener('change',syncServiceUI);
}

document.querySelectorAll('[data-service]').forEach(link=>{
  link.addEventListener('click',()=>{
    if(serviceSelect){
      serviceSelect.value=link.dataset.service;
      syncServiceUI();
    }
  });
});

const year=document.getElementById('year');
if(year)year.textContent=new Date().getFullYear();

function whatsappUrl(message){
  return `https://wa.me/${CENTRAL_PHONE_WA}?text=${encodeURIComponent(message)}`;
}

function addContactActions(){
  const style=document.createElement('style');
  style.textContent=`
    .central-action{min-height:50px;display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:0 16px;border-radius:13px;font-weight:900;font-size:14px;text-decoration:none;white-space:nowrap;transition:transform .18s ease,box-shadow .18s ease}
    .central-action:hover{transform:translateY(-2px)}
    .central-action-call{background:#082b6f;color:#fff}
    .central-action-wa{background:#25D366;color:#092516;box-shadow:0 8px 20px rgba(37,211,102,.22)}
    .central-action-pickup{background:#e31b23;color:#fff;box-shadow:0 10px 24px rgba(227,27,35,.26)}
    .central-action-icon{font-size:20px;line-height:1}
    .hero-contact-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:12px}
    .hero-contact-actions .central-action{min-height:46px}
    .central-pickup-float{position:fixed;z-index:100;right:18px;bottom:18px;min-height:58px;padding:0 18px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;gap:9px;background:#e31b23;color:#fff;font-weight:950;text-decoration:none;box-shadow:0 16px 38px rgba(227,27,35,.32);border:3px solid rgba(255,255,255,.92)}
    .central-pickup-float:hover{transform:translateY(-2px)}
    .central-pickup-float .central-action-icon{font-size:23px}
    .floating-cta{display:none!important}
    @media(max-width:760px){
      .hero-contact-actions{display:grid;grid-template-columns:1fr 1fr;margin-top:12px}
      .hero-contact-actions .central-action{flex-direction:row;font-size:13px;min-height:48px}
      .central-pickup-float{right:12px;bottom:12px;min-height:56px;padding:0 15px;font-size:12px}
    }
    @media(max-width:390px){.central-pickup-float span:last-child{display:none}.central-pickup-float{width:58px;height:58px;padding:0;border-radius:50%}.central-pickup-float .central-action-icon{font-size:25px}}
  `;
  document.head.appendChild(style);

  const directMessage='Hola, quiero información sobre un envío a República Dominicana.';

  const pickup=document.createElement('a');
  pickup.className='central-pickup-float';
  pickup.href='#recogida';
  pickup.setAttribute('aria-label','Solicitar recogida de caja');
  pickup.innerHTML='<span class="central-action-icon">📦</span><span>RECOGIDA DE CAJA</span>';
  document.body.appendChild(pickup);

  const heroActions=document.querySelector('.hero-actions');
  if(heroActions){
    const extra=document.createElement('div');
    extra.className='hero-contact-actions';
    extra.innerHTML=`
      <a class="central-action central-action-call" href="tel:${CENTRAL_PHONE_TEL}"><span class="central-action-icon">📞</span><span>Llamar</span></a>
      <a class="central-action central-action-wa" href="${whatsappUrl(directMessage)}" target="_blank" rel="noopener"><span class="central-action-icon">💬</span><span>WhatsApp</span></a>
    `;
    heroActions.insertAdjacentElement('afterend',extra);
  }
}

addContactActions();

const form=document.getElementById('pickupForm');
const result=document.getElementById('formResult');

if(form){
  const submitButton=form.querySelector('button[type="submit"]');
  if(submitButton){
    submitButton.textContent='💬 ENVIAR SOLICITUD POR WHATSAPP';
    submitButton.setAttribute('aria-label','Enviar solicitud de recogida por WhatsApp');
  }

  form.addEventListener('submit',e=>{
    e.preventDefault();
    const d=new FormData(form);

    const text=[
      '📦 *SOLICITUD DE RECOGIDA — CENTRAL ENVÍOS RD*',
      '',
      `👤 *Nombre:* ${d.get('nombre')||'—'}`,
      `📱 *Teléfono:* ${d.get('telefono')||'—'}`,
      `🚚 *Servicio:* ${d.get('servicio')||'—'}`,
      `📍 *Recogida:* ${d.get('direccion')||'—'} · ${d.get('localidad')||'—'}`,
      `📦 *Cantidad / bultos:* ${d.get('cantidad')||'—'}`,
      `📐 *Formato / tamaño:* ${d.get('tamano')||'No indicado'}`,
      `🇩🇴 *Destino RD:* ${d.get('destino')||'—'} · ${d.get('zona')||'—'}`,
      `📝 *Descripción:* ${d.get('notas')||'—'}`,
      '',
      '🚚 Recogida en Burgos y alrededores',
      '📅 Salida semanal a República Dominicana'
    ].join('\n');

    if(result){
      result.hidden=false;
      result.textContent='✅ Abriendo WhatsApp con tu solicitud preparada…';
    }

    window.location.href=whatsappUrl(text);
  });
}
