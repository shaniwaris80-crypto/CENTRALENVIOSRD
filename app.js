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

const form=document.getElementById('pickupForm');
const result=document.getElementById('formResult');

if(form){
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const d=new FormData(form);

    const text=[
      '📦 SOLICITUD CENTRAL ENVÍOS RD',
      '────────────────────',
      `Nombre: ${d.get('nombre')}`,
      `Teléfono: ${d.get('telefono')}`,
      `Servicio: ${d.get('servicio')}`,
      `Recogida: ${d.get('direccion')} · ${d.get('localidad')}`,
      `Cantidad / bultos: ${d.get('cantidad')}`,
      `Formato / tamaño: ${d.get('tamano')||'No indicado'}`,
      `Destino RD: ${d.get('destino')} · ${d.get('zona')}`,
      `Descripción: ${d.get('notas')||'—'}`,
      '────────────────────',
      '🚚 Recogida en Burgos y alrededores',
      '📅 Salida semanal a República Dominicana'
    ].join('\n');

    let copied=false;
    try{
      await navigator.clipboard.writeText(text);
      copied=true;
    }catch(_){
      copied=false;
    }

    if(result){
      result.hidden=false;
      result.textContent=copied
        ? '✅ Solicitud preparada y copiada. Ya está lista para compartir con Central Envíos RD.'
        : '✅ Solicitud preparada. Mantén pulsado el texto inferior para copiarlo:\n\n'+text;
    }

    if(navigator.share){
      try{
        await navigator.share({title:'Solicitud Central Envíos RD',text});
      }catch(_){
        // El usuario puede cerrar el cuadro de compartir sin problema.
      }
    }
  });
}
