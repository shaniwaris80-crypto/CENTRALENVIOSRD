const menuBtn=document.querySelector('.menu-btn');const nav=document.querySelector('.nav');if(menuBtn&&nav){menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');}));}

document.querySelectorAll('[data-size]').forEach(link=>{link.addEventListener('click',()=>{const select=document.querySelector('select[name="tamano"]');if(select)select.value=link.dataset.size;});});

document.getElementById('year').textContent=new Date().getFullYear();

const form=document.getElementById('pickupForm');const result=document.getElementById('formResult');if(form){form.addEventListener('submit',async e=>{e.preventDefault();const d=new FormData(form);const text=[
'📦 SOLICITUD CENTRAL ENVÍOS RD',
'────────────────────',
`Nombre: ${d.get('nombre')}`,
`Teléfono: ${d.get('telefono')}`,
`Recogida: ${d.get('direccion')} · ${d.get('localidad')}`,
`Cajas: ${d.get('cantidad')} · ${d.get('tamano')}`,
`Destino RD: ${d.get('destino')} · ${d.get('zona')}`,
`Observaciones: ${d.get('notas')||'—'}`,
'────────────────────',
'🚚 Recogida en Burgos y alrededores',
'📅 Salida semanal a República Dominicana'
].join('\n');let copied=false;try{await navigator.clipboard.writeText(text);copied=true;}catch(_){copied=false;}result.hidden=false;result.textContent=copied?'✅ Solicitud preparada y copiada. Ya está lista para compartir con Central Envíos RD.':'✅ Solicitud preparada. Mantén pulsado el texto inferior para copiarlo:\n\n'+text;if(navigator.share){try{await navigator.share({title:'Solicitud Central Envíos RD',text});}catch(_){}}});}
