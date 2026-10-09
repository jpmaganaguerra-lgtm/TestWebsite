/* ============ CONFIGURACIÓN DEL MOTOR DE RESERVAS ============
   Pegar la URL de búsqueda del motor y ajustar los nombres de parámetros
   según el motor que se use. Si url está vacío, el sitio arma la búsqueda
   pero no sale a ningún lado. */
var BOOKING = {
  url: '',                       // ej. 'https://reservas.ejemplo.com/search'
  params: { checkin:'checkin', checkout:'checkout', adults:'adults', children:'children' },
  dateFormat: 'YYYY-MM-DD',      // 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY'
  extra: {},                     // parámetros fijos, ej. { hotel_id:'XXXX', lang:'es' }
  newTab: true,
  minNights: 1, maxNights: 30, maxAdults: 8, maxChildren: 6
};
window.dataLayer = window.dataLayer || [];
function track(n,p){ window.dataLayer.push(Object.assign({event:n},p||{})); }
document.documentElement.classList.add('js');
document.addEventListener('click',function(e){var el=e.target.closest('[data-track]'); if(el) track(el.getAttribute('data-track'),{where:el.getAttribute('data-where')});});

/* ---- header, nav activo, reveal ---- */
var hdr=document.querySelector('header.top');
addEventListener('scroll',function(){hdr.classList.toggle('scrolled',scrollY>8);},{passive:true});
var links=document.querySelectorAll('nav a');
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){links.forEach(function(a){a.removeAttribute('aria-current');});var a=document.querySelector('nav a[href="#'+en.target.id+'"]');if(a)a.setAttribute('aria-current','true');}});},{rootMargin:'-40% 0px -55% 0px'});
  ['amaya','habitaciones','valladolid','reservar'].forEach(function(id){var el=document.getElementById(id);if(el)io.observe(el);});
  var rv=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');rv.unobserve(en.target);}});},{rootMargin:'0px 0px -8% 0px',threshold:.08});
  document.querySelectorAll('.rv').forEach(function(el){rv.observe(el);});
  setTimeout(function(){document.querySelectorAll('.rv:not(.in)').forEach(function(el){var r=el.getBoundingClientRect();if(r.top<innerHeight)el.classList.add('in');});},1800);
} else { document.querySelectorAll('.rv').forEach(function(el){el.classList.add('in');}); }

/* ---- selector de fechas y huéspedes ---- */
var MESES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
var DIAS=['L','M','X','J','V','S','D'];
var today=new Date(); today.setHours(0,0,0,0);
var view=new Date(today.getFullYear(),today.getMonth(),1);
var inD=null,outD=null,adults=2,kids=0,dateTracked=false;
var $=function(id){return document.getElementById(id);};
function same(a,b){return a&&b&&a.getTime()===b.getTime();}
function nights(){return inD&&outD?Math.round((outD-inD)/864e5):0;}
function pad(n){return String(n).padStart(2,'0');}
function fmtShort(d){return d.getDate()+' '+MESES[d.getMonth()].slice(0,3)+' '+d.getFullYear();}
function fmtParam(d){var y=d.getFullYear(),m=pad(d.getMonth()+1),dd=pad(d.getDate());
  return BOOKING.dateFormat==='DD/MM/YYYY'?dd+'/'+m+'/'+y:BOOKING.dateFormat==='MM/DD/YYYY'?m+'/'+dd+'/'+y:y+'-'+m+'-'+dd;}
function monthEl(first,pos){
  var m=document.createElement('div');m.className='month';
  var h=document.createElement('div');h.className='mhead';
  var prev=document.createElement('button');prev.type='button';prev.className='nav-b';prev.textContent='‹';prev.setAttribute('aria-label','Mes anterior');
  var next=document.createElement('button');next.type='button';next.className='nav-b';next.textContent='›';next.setAttribute('aria-label','Mes siguiente');
  var t=document.createElement('h3');t.textContent=MESES[first.getMonth()]+' '+first.getFullYear();
  var atMin=first.getFullYear()===today.getFullYear()&&first.getMonth()===today.getMonth();
  prev.disabled=atMin; if(pos!==0) prev.classList.add('ph-sp'); if(pos!==1) next.classList.add('ph-sp');
  prev.onclick=function(){view=new Date(view.getFullYear(),view.getMonth()-1,1);render();};
  next.onclick=function(){view=new Date(view.getFullYear(),view.getMonth()+1,1);render();};
  h.appendChild(prev);h.appendChild(t);h.appendChild(next);m.appendChild(h);
  var g=document.createElement('div');g.className='grid';
  DIAS.forEach(function(d){var c=document.createElement('div');c.className='dow';c.textContent=d;c.setAttribute('aria-hidden','true');g.appendChild(c);});
  var off=(first.getDay()+6)%7;
  for(var i=0;i<off;i++){g.appendChild(document.createElement('div'));}
  var n=new Date(first.getFullYear(),first.getMonth()+1,0).getDate();
  for(var d=1;d<=n;d++){
    var dt=new Date(first.getFullYear(),first.getMonth(),d);
    var b=document.createElement('button');b.type='button';b.className='day';b.textContent=d;
    b.setAttribute('aria-label',d+' de '+MESES[dt.getMonth()]+' de '+dt.getFullYear());
    if(dt<today) b.disabled=true;
    if(same(dt,today)) b.classList.add('today');
    if(same(dt,inD)||same(dt,outD)){b.classList.add('sel');b.setAttribute('aria-pressed','true');}
    else if(inD&&outD&&dt>inD&&dt<outD) b.classList.add('inr');
    (function(dt){b.onclick=function(){pick(dt);};})(dt);
    g.appendChild(b);
  }
  m.appendChild(g);return m;
}
function render(){
  var c=$('cal');c.innerHTML='';
  c.appendChild(monthEl(view,0));
  c.appendChild(monthEl(new Date(view.getFullYear(),view.getMonth()+1,1),1));
  update();
}
function pick(d){
  if(!inD||(inD&&outD)){inD=d;outD=null;}
  else if(d<=inD){inD=d;}
  else if(Math.round((d-inD)/864e5)>BOOKING.maxNights){inD=d;outD=null;$('hint').textContent='Máximo '+BOOKING.maxNights+' noches por búsqueda.';}
  else {outD=d;}
  if(outD&&Math.round((outD-inD)/864e5)<BOOKING.minNights){outD=null;}
  if(!dateTracked||outD){track('date_select',{checkin:inD&&fmtParam(inD),checkout:outD?fmtParam(outD):null});dateTracked=true;}
  render();
}
function update(){
  $('o-in').textContent=inD?fmtShort(inD):'Elegir fecha';
  $('o-out').textContent=outD?fmtShort(outD):'Elegir fecha';
  var n=nights();$('o-n').textContent=n?n:'—';
  $('a-o').textContent=adults;$('c-o').textContent=kids;
  $('a-').disabled=adults<=1;$('a+').disabled=adults>=BOOKING.maxAdults;
  $('c-').disabled=kids<=0;$('c+').disabled=kids>=BOOKING.maxChildren;
  var ok=!!(inD&&outD);$('book-btn').disabled=!ok;
  $('hint').textContent=ok?(n+(n===1?' noche':' noches')+' · '+adults+(adults===1?' adulto':' adultos')+(kids?' · '+kids+(kids===1?' niño':' niños'):'')):(inD?'Ahora elige la fecha de salida.':'Elige llegada y salida para continuar.');
}
$('a-').onclick=function(){adults--;update();};$('a+').onclick=function(){adults++;update();};
$('c-').onclick=function(){kids--;update();};$('c+').onclick=function(){kids++;update();};
function searchUrl(){
  var q=new URLSearchParams();
  q.set(BOOKING.params.checkin,fmtParam(inD));q.set(BOOKING.params.checkout,fmtParam(outD));
  q.set(BOOKING.params.adults,adults);q.set(BOOKING.params.children,kids);
  Object.keys(BOOKING.extra).forEach(function(k){q.set(k,BOOKING.extra[k]);});
  var u=BOOKING.url||'';return u+(u.indexOf('?')>-1?'&':'?')+q.toString();
}
$('book-btn').onclick=function(){
  if(!inD||!outD) return;
  var payload={checkin:fmtParam(inD),checkout:fmtParam(outD),nights:nights(),adults:adults,children:kids};
  track('availability_check_start',payload);
  var st=$('book-status');
  if(!BOOKING.url){
    st.innerHTML='Búsqueda lista. El motor de reservas aún no está conectado, por eso no se abre ninguna página.<br><code>'+searchUrl().replace(/&/g,'&amp;')+'</code>';
    return;
  }
  var u=searchUrl();track('booking_engine_exit',Object.assign({url:u},payload));
  st.textContent='Abriendo el motor de reservas…';
  if(BOOKING.newTab) window.open(u,'_blank','noopener'); else location.href=u;
};
render();
