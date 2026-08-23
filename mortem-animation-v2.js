(function(){
  var page=document.getElementById('mortem');
  if(!page)return;

  document.head.insertAdjacentHTML('beforeend','<style>'+[
    '.mortem-sequence{margin:16px 0;background:linear-gradient(180deg,#111,#090909);border:1px solid var(--border);border-radius:12px;padding:16px;overflow:hidden}',
    '.mortem-seq-phases{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px}',
    '.mortem-seq-phase{border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:9px 10px;background:rgba(255,255,255,.025);transition:.3s}',
    '.mortem-seq-phase small{display:block;font-family:"Share Tech Mono",monospace;color:#777;font-size:9px;letter-spacing:1px}',
    '.mortem-seq-phase b{font-size:12px;color:#ccc}',
    '.mortem-seq-phase.active{background:rgba(52,152,219,.15);border-color:rgba(52,152,219,.6);box-shadow:0 0 22px rgba(52,152,219,.12)}',
    '.mortem-seq-phase.active b{color:#fff}',
    '.mortem-seq-status{display:flex;align-items:center;justify-content:space-between;gap:12px;border:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.03);padding:11px 13px;border-radius:9px;margin-bottom:12px}',
    '.mortem-seq-status strong{font-family:"Bebas Neue",sans-serif;letter-spacing:2px;font-size:22px;color:#fff}',
    '.mortem-seq-status span{font-size:12px;color:#aaa}',
    '.mortem-seq-loop{font-family:"Share Tech Mono",monospace!important;color:#f5d08a!important;font-size:10px!important;white-space:nowrap}',
    '.mortem-seq-map{position:relative;height:500px;border-radius:10px;overflow:hidden;border:1px solid rgba(255,255,255,.05);background:radial-gradient(circle at 52% 46%,rgba(139,0,0,.17),transparent 24%),radial-gradient(circle at 31% 25%,rgba(52,152,219,.08),transparent 18%),linear-gradient(180deg,#151515,#0a0a0a)}',
    '.mortem-seq-map:before{content:"";position:absolute;inset:22px;border:1px dashed rgba(255,255,255,.08);border-radius:50%}',
    '.sim-boss,.sim-leader,.sim-member{position:absolute;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:3}',
    '.sim-boss{width:112px;height:112px;left:52%;top:46%;transform:translate(-50%,-50%);background:radial-gradient(circle at 35% 30%,#ff8a65,#8b0000 68%);color:#fff;font:24px "Bebas Neue",sans-serif;letter-spacing:2px;box-shadow:0 0 30px rgba(192,57,43,.25);animation:simBoss 2s ease-in-out infinite}',
    '.sim-leader{width:54px;height:54px;background:linear-gradient(#4da8e8,#1d5278);border:1px solid rgba(255,255,255,.2);color:#fff;font:11px "Share Tech Mono",monospace;opacity:0;transform:translate(-150px,-110px) scale(.45);transition:opacity .45s,transform .75s cubic-bezier(.18,.89,.32,1.28),box-shadow .3s}',
    '.sim-leader.show{opacity:1;transform:translate(0,0) scale(1)}',
    '.sim-member{width:22px;height:22px;background:linear-gradient(#42db7b,#197342);border:1px solid rgba(255,255,255,.12);opacity:0;transform:translate(var(--dx),var(--dy)) scale(.3);transition:opacity .4s,transform .8s cubic-bezier(.18,.89,.32,1.18),box-shadow .3s}',
    '.sim-member.show{opacity:1;transform:translate(0,0) scale(1)}',
    '.sim-member.join{box-shadow:0 0 15px rgba(46,204,113,.9)}',
    '.sim-rallytag{position:absolute;z-index:6;padding:4px 7px;border-radius:999px;background:rgba(52,152,219,.15);border:1px solid rgba(52,152,219,.45);color:#dff3ff;font:9px "Share Tech Mono",monospace;opacity:0;transform:translateY(7px);transition:.3s}',
    '.sim-rallytag.show{opacity:1;transform:none}',
    '.sim-rallytag.full{background:rgba(46,204,113,.16);border-color:rgba(46,204,113,.55);color:#e3ffec}',
    '.sim-joinline,.sim-attackline{position:absolute;z-index:2;height:2px;transform-origin:left center;opacity:0;transition:opacity .3s;overflow:visible}',
    '.sim-joinline{background:linear-gradient(90deg,rgba(46,204,113,.95),rgba(46,204,113,0))}',
    '.sim-attackline{height:3px;background:linear-gradient(90deg,#5dade2,#fff 45%,rgba(93,173,226,0));box-shadow:0 0 10px rgba(93,173,226,.8)}',
    '.sim-joinline.show,.sim-attackline.show{opacity:1;animation:simBeam .75s linear infinite}',
    '.sim-caption{position:absolute;left:50%;bottom:14px;transform:translateX(-50%);z-index:8;padding:7px 12px;border-radius:8px;background:rgba(0,0,0,.72);border:1px solid rgba(255,255,255,.09);font:10px "Share Tech Mono",monospace;color:#ddd;white-space:nowrap}',
    '@keyframes simBeam{0%,100%{filter:brightness(.8)}50%{filter:brightness(1.6)}}',
    '@keyframes simBoss{0%,100%{box-shadow:0 0 12px rgba(192,57,43,.2)}50%{box-shadow:0 0 38px rgba(192,57,43,.5)}}',
    '@media(max-width:760px){.mortem-seq-phases{grid-template-columns:1fr 1fr}.mortem-seq-map{height:570px}.mortem-seq-status{align-items:flex-start;flex-direction:column}}'
  ].join('')+'</style>');

  var heading=Array.from(page.querySelectorAll('h3.sub-header')).find(function(h){return h.textContent.indexOf('ANIMIERTE ALLIANZ-AUFSTELLUNG')!==-1;});
  if(!heading)return;
  var oldCallout=heading.nextElementSibling;
  var oldMap=oldCallout&&oldCallout.nextElementSibling;
  if(oldCallout&&oldCallout.classList.contains('callout'))oldCallout.innerHTML='<strong>Live-Ablauf:</strong> Die Animation zeigt exakt die Reihenfolge: <strong>Leader teleportieren → Member teleportieren → alle 4 Rallys joinen → 4 Rallys greifen Mortem an.</strong>';
  if(oldMap&&oldMap.classList.contains('mortem-map-card'))oldMap.style.display='none';

  var box=document.createElement('div');
  box.className='mortem-sequence';
  box.innerHTML='<div class="mortem-seq-phases">'+
    '<div class="mortem-seq-phase" data-p="1"><small>PHASE 1</small><b>4 Leader teleportieren</b></div>'+
    '<div class="mortem-seq-phase" data-p="2"><small>PHASE 2</small><b>Member teleportieren</b></div>'+
    '<div class="mortem-seq-phase" data-p="3"><small>PHASE 3</small><b>Alle Rallys joinen</b></div>'+
    '<div class="mortem-seq-phase" data-p="4"><small>PHASE 4</small><b>4 Rallys greifen an</b></div></div>'+
    '<div class="mortem-seq-status"><div><strong id="simTitle"></strong><br><span id="simSub"></span></div><span class="mortem-seq-loop">AUTO LOOP · 2.4s / PHASE</span></div>'+
    '<div class="mortem-seq-map" id="simMap"><div class="sim-boss">MORTEM</div><div class="sim-caption">4 MÄRSCHE PRO SPIELER · 1 MARSCH PRO RALLY</div></div>';
  (oldMap||oldCallout||heading).insertAdjacentElement('afterend',box);

  var map=box.querySelector('#simMap');
  var leaderPos=[[26,20],[34,17],[24,31],[35,29]];
  leaderPos.forEach(function(p,i){
    var n=document.createElement('div');n.className='sim-leader';n.textContent='L'+(i+1);n.style.left=p[0]+'%';n.style.top=p[1]+'%';map.appendChild(n);
    var tag=document.createElement('div');tag.className='sim-rallytag';tag.textContent='R'+(i+1)+' READY';tag.style.left=(p[0]-1)+'%';tag.style.top=(p[1]-7)+'%';map.appendChild(tag);
  });
  var memberPos=[[14,10],[19,6],[28,6],[39,8],[46,13],[14,21],[10,30],[13,40],[18,48],[27,42],[41,41],[53,22],[63,28],[68,39],[58,52],[47,58],[34,60],[24,56],[8,52],[73,48],[77,20],[82,32],[82,56],[68,66],[54,72],[36,75],[18,70],[6,64]];
  memberPos.forEach(function(p){var n=document.createElement('div');n.className='sim-member';n.style.left=p[0]+'%';n.style.top=p[1]+'%';n.style.setProperty('--dx',((p[0]-50)*4)+'px');n.style.setProperty('--dy',((p[1]-50)*4)+'px');map.appendChild(n);});

  function line(cls,x,y,w,a){var l=document.createElement('div');l.className=cls;l.style.left=x+'%';l.style.top=y+'%';l.style.width=w+'px';l.style.transform='rotate('+a+'deg)';map.appendChild(l);return l;}
  [[17,9,88,31],[16,23,76,-3],[19,45,92,-38],[43,12,83,125],[54,24,105,176],[59,51,125,190],[37,63,118,248],[77,37,170,193]].forEach(function(v){line('sim-joinline',v[0],v[1],v[2],v[3]);});
  [[29,26,150,27],[31,27,132,31],[32,30,126,20],[34,29,118,35]].forEach(function(v){line('sim-attackline',v[0],v[1],v[2],v[3]);});

  var titles=[
    ['PHASE 1 — LEADER TELEPORTIEREN','Zuerst teleportieren sich die 4 Rally-Leader eng links oberhalb von Mortem.'],
    ['PHASE 2 — MEMBER TELEPORTIEREN','Danach teleportieren sich alle Allianzmitglieder kompakt außen um Mortem und die Leader.'],
    ['PHASE 3 — ALLE 4 RALLYS JOINEN','Jeder Spieler nutzt 4 Märsche: genau 1 Marsch pro Rally. Alle vier Rallys werden gleichzeitig gefüllt.'],
    ['PHASE 4 — 4 RALLYS GREIFEN AN','Alle vier gefüllten Rallys greifen Mortem gleichzeitig an. Danach startet der Ablauf direkt wieder von vorn.']
  ];
  var step=1;
  function phase(s){
    box.querySelectorAll('.mortem-seq-phase').forEach(function(n){n.classList.toggle('active',+n.dataset.p===s);});
    box.querySelector('#simTitle').textContent=titles[s-1][0];box.querySelector('#simSub').textContent=titles[s-1][1];
    var leaders=box.querySelectorAll('.sim-leader'),members=box.querySelectorAll('.sim-member'),tags=box.querySelectorAll('.sim-rallytag'),joins=box.querySelectorAll('.sim-joinline'),attacks=box.querySelectorAll('.sim-attackline');
    leaders.forEach(function(n){n.classList.toggle('show',s>=1);});
    members.forEach(function(n){n.classList.toggle('show',s>=2);n.classList.toggle('join',s===3);});
    tags.forEach(function(n){n.classList.toggle('show',s>=1);n.classList.toggle('full',s>=3);n.textContent=s>=3?n.textContent.replace('READY','FULL'):n.textContent.replace('FULL','READY');});
    joins.forEach(function(n){n.classList.toggle('show',s===3);});
    attacks.forEach(function(n){n.classList.toggle('show',s===4);});
  }
  phase(step);
  if(!window.__mortemSequenceV2){window.__mortemSequenceV2=setInterval(function(){step=step===4?1:step+1;phase(step);},2400);}
})();
