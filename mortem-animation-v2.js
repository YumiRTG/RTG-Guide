(function(){
  var page=document.getElementById('mortem');
  if(!page)return;

  document.head.insertAdjacentHTML('beforeend','<style>'+[
    '.mortem-sequence{margin:16px 0;background:linear-gradient(180deg,#111,#090909);border:1px solid var(--border);border-radius:14px;padding:16px;overflow:hidden;box-shadow:0 14px 36px rgba(0,0,0,.35)}',
    '.mortem-seq-head{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,.07)}',
    '.mortem-seq-head h4{font-family:"Bebas Neue",sans-serif;font-size:28px;letter-spacing:2px;color:#fff;margin:0}',
    '.mortem-seq-head p{font-size:12px;color:#999;margin:3px 0 0}',
    '.mortem-seq-chip{font:10px "Share Tech Mono",monospace;letter-spacing:1px;padding:5px 8px;border-radius:999px;background:rgba(192,57,43,.14);border:1px solid rgba(192,57,43,.35);color:#ffc2b8;white-space:nowrap}',
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
    '.mortem-seq-map{position:relative;height:540px;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,.05);background:radial-gradient(circle at 52% 46%,rgba(139,0,0,.2),transparent 24%),radial-gradient(circle at 31% 25%,rgba(52,152,219,.1),transparent 18%),linear-gradient(180deg,#151515,#0a0a0a)}',
    '.mortem-seq-map:before{content:"";position:absolute;inset:22px;border:1px dashed rgba(255,255,255,.08);border-radius:50%}',
    '.sim-warning{position:absolute;left:14px;right:14px;top:12px;display:flex;justify-content:space-between;gap:8px;z-index:8;pointer-events:none}',
    '.sim-warning span{font:9px "Share Tech Mono",monospace;letter-spacing:1px;padding:4px 7px;border-radius:999px;background:rgba(0,0,0,.45);border:1px solid rgba(255,255,255,.1)}',
    '.sim-warning .red{color:#ffb9ad;border-color:rgba(192,57,43,.35);background:rgba(192,57,43,.12)}',
    '.sim-warning .blue{color:#dff3ff;border-color:rgba(52,152,219,.35);background:rgba(52,152,219,.11)}',
    '.sim-warning .green{color:#e6ffef;border-color:rgba(46,204,113,.35);background:rgba(46,204,113,.11)}',
    '.sim-cluster{position:absolute;left:22%;top:14%;width:190px;height:165px;border:1px dashed rgba(52,152,219,.3);border-radius:26px;z-index:1;box-shadow:inset 0 0 30px rgba(52,152,219,.05)}',
    '.sim-cluster:before{content:"RALLY CLUSTER";position:absolute;left:12px;top:-10px;font:9px "Share Tech Mono",monospace;letter-spacing:1px;padding:2px 6px;border-radius:999px;background:#0d1114;border:1px solid rgba(52,152,219,.28);color:#9fd6ff}',
    '.sim-boss,.sim-leader,.sim-member{position:absolute;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:3}',
    '.sim-boss{width:124px;height:124px;left:54%;top:48%;transform:translate(-50%,-50%);background:radial-gradient(circle at 35% 30%,#ff9270,#7b0505 68%);color:#fff;font:27px "Bebas Neue",sans-serif;letter-spacing:2px;box-shadow:0 0 30px rgba(192,57,43,.25);animation:simBoss 2s ease-in-out infinite;flex-direction:column}',
    '.sim-boss small{font:9px "Share Tech Mono",monospace;color:#ffd5ce;letter-spacing:1px;margin-top:2px}',
    '.sim-leader{width:70px;height:70px;background:#1c2b37;border:2px solid rgba(52,152,219,.35);color:#fff;opacity:0;transition:left .9s cubic-bezier(.18,.89,.32,1.15),top .9s cubic-bezier(.18,.89,.32,1.15),opacity .4s,transform .5s,box-shadow .3s;overflow:visible;box-shadow:0 0 20px rgba(52,152,219,.2),0 10px 24px rgba(0,0,0,.4)}',
    '.sim-leader img{width:100%;height:100%;object-fit:cover;border-radius:50%;display:block}',
    '.sim-leader .llabel{position:absolute;left:50%;bottom:-20px;transform:translateX(-50%);font:9px "Share Tech Mono",monospace;padding:2px 6px;border-radius:999px;background:#10161a;border:1px solid rgba(52,152,219,.3);color:#dff3ff;white-space:nowrap}',
    '.sim-leader.show{opacity:1}',
    '.sim-leader.teleport{animation:simTeleport 1s ease}',
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
    '.sim-tele-ring{position:absolute;width:94px;height:94px;border-radius:50%;border:1px solid rgba(52,152,219,.38);box-shadow:0 0 22px rgba(52,152,219,.2);z-index:2;opacity:0;pointer-events:none}',
    '.sim-tele-ring.fire{animation:simTeleRing 1s ease}',
    '.sim-caption{position:absolute;left:50%;bottom:14px;transform:translateX(-50%);z-index:8;padding:7px 12px;border-radius:8px;background:rgba(0,0,0,.72);border:1px solid rgba(255,255,255,.09);font:10px "Share Tech Mono",monospace;color:#ddd;white-space:nowrap}',
    '@keyframes simBeam{0%,100%{filter:brightness(.8)}50%{filter:brightness(1.6)}}',
    '@keyframes simBoss{0%,100%{box-shadow:0 0 12px rgba(192,57,43,.2)}50%{box-shadow:0 0 38px rgba(192,57,43,.5)}}',
    '@keyframes simTeleport{0%{transform:scale(.55);filter:brightness(1.7) blur(2px)}50%{transform:scale(1.1);filter:brightness(1.3)}100%{transform:scale(1);filter:brightness(1)}}',
    '@keyframes simTeleRing{0%{opacity:0;transform:scale(.55)}20%{opacity:1}100%{opacity:0;transform:scale(1.35)}}',
    '@media(max-width:760px){.mortem-seq-phases{grid-template-columns:1fr 1fr}.mortem-seq-map{height:620px}.mortem-seq-status,.mortem-seq-head{align-items:flex-start;flex-direction:column}.sim-warning{flex-wrap:wrap}.sim-caption{white-space:normal;text-align:center;width:80%}}'
  ].join('')+'</style>');

  var heading=Array.from(page.querySelectorAll('h3.sub-header')).find(function(h){return h.textContent.indexOf('ANIMIERTE ALLIANZ-AUFSTELLUNG')!==-1;});
  if(!heading)return;
  var oldCallout=heading.nextElementSibling;
  var oldMap=oldCallout&&oldCallout.nextElementSibling;
  if(oldCallout&&oldCallout.classList.contains('callout'))oldCallout.innerHTML='<strong>Live-Ablauf:</strong> Die Animation zeigt jetzt sichtbar: <strong>Leader teleportieren von außen in den Cluster → Member teleportieren → alle 4 Rallys joinen → 4 Rallys greifen Mortem gleichzeitig an.</strong>';
  if(oldMap&&oldMap.classList.contains('mortem-map-card'))oldMap.style.display='none';
  var oldSeq=page.querySelector('.mortem-sequence');if(oldSeq)oldSeq.remove();

  var box=document.createElement('div');box.className='mortem-sequence';
  box.innerHTML='<div class="mortem-seq-head"><div><h4>☣ LIVE DEPLOYMENT SIMULATION</h4><p>Resident-Evil-inspirierte Allianz-Simulation mit Hero-Portraits, Teleport-Effekt, Rally-Join und Vierfach-Angriff.</p></div><span class="mortem-seq-chip">B.O.W. CONTACT · MORTEM</span></div>'+
    '<div class="mortem-seq-phases"><div class="mortem-seq-phase" data-p="1"><small>PHASE 1</small><b>4 Leader teleportieren</b></div><div class="mortem-seq-phase" data-p="2"><small>PHASE 2</small><b>Member teleportieren</b></div><div class="mortem-seq-phase" data-p="3"><small>PHASE 3</small><b>Alle Rallys joinen</b></div><div class="mortem-seq-phase" data-p="4"><small>PHASE 4</small><b>4 Rallys greifen an</b></div></div>'+
    '<div class="mortem-seq-status"><div><strong id="simTitle"></strong><br><span id="simSub"></span></div><span class="mortem-seq-loop">AUTO LOOP · 2.8s / PHASE</span></div>'+
    '<div class="mortem-seq-map" id="simMap"><div class="sim-warning"><span class="red">☣ MORTEM ACTIVE</span><span class="blue">LEADERS FIRST</span><span class="green">THEN ALL 4 RALLIES FULL</span></div><div class="sim-cluster"></div><div class="sim-boss">MORTEM<small>BIOHAZARD BOSS</small></div><div class="sim-caption">4 MÄRSCHE PRO SPIELER · 1 MARSCH PRO RALLY</div></div>';
  (oldMap||oldCallout||heading).insertAdjacentElement('afterend',box);

  var map=box.querySelector('#simMap');
  var leaders=[
    {name:'SHERRY',img:'assets/heroes/s4-sherry.jpg',sx:7,sy:82,ex:26,ey:21},
    {name:'JAKE',img:'assets/heroes/s4-jake.jpg',sx:5,sy:16,ex:34,ey:18},
    {name:'PIERS',img:'assets/heroes/s4-piers.jpg',sx:76,sy:82,ex:24,ey:31},
    {name:'EXCELLA',img:'assets/heroes/s5-excella.jpg',sx:80,sy:16,ex:35,ey:29}
  ];
  leaders.forEach(function(l,i){
    var n=document.createElement('div');n.className='sim-leader';n.id='simLeader'+(i+1);n.dataset.sx=l.sx;n.dataset.sy=l.sy;n.dataset.ex=l.ex;n.dataset.ey=l.ey;n.style.left=l.sx+'%';n.style.top=l.sy+'%';n.innerHTML='<img src="'+l.img+'" alt="'+l.name+'"><span class="llabel">L'+(i+1)+' · '+l.name+'</span>';map.appendChild(n);
    var tag=document.createElement('div');tag.className='sim-rallytag';tag.textContent='R'+(i+1)+' READY';tag.style.left=(l.ex-1)+'%';tag.style.top=(l.ey-7)+'%';map.appendChild(tag);
    var ring=document.createElement('div');ring.className='sim-tele-ring';ring.id='simRing'+(i+1);ring.style.left='calc('+l.ex+'% - 12px)';ring.style.top='calc('+l.ey+'% - 12px)';map.appendChild(ring);
  });

  var memberPos=[[14,10],[19,6],[28,6],[39,8],[46,13],[14,21],[10,30],[13,40],[18,48],[27,42],[41,41],[53,22],[63,28],[68,39],[58,52],[47,58],[34,60],[24,56],[8,52],[73,48],[77,20],[82,32],[82,56],[68,66],[54,72],[36,75],[18,70],[6,64]];
  memberPos.forEach(function(p){var n=document.createElement('div');n.className='sim-member';n.style.left=p[0]+'%';n.style.top=p[1]+'%';n.style.setProperty('--dx',((p[0]-50)*4)+'px');n.style.setProperty('--dy',((p[1]-50)*4)+'px');map.appendChild(n);});
  function line(cls,x,y,w,a){var l=document.createElement('div');l.className=cls;l.style.left=x+'%';l.style.top=y+'%';l.style.width=w+'px';l.style.transform='rotate('+a+'deg)';map.appendChild(l);return l;}
  [[17,9,88,31],[16,23,76,-3],[19,45,92,-38],[43,12,83,125],[54,24,105,176],[59,51,125,190],[37,63,118,248],[77,37,170,193]].forEach(function(v){line('sim-joinline',v[0],v[1],v[2],v[3]);});
  [[29,26,160,27],[31,27,145,31],[32,30,138,20],[34,29,128,35]].forEach(function(v){line('sim-attackline',v[0],v[1],v[2],v[3]);});

  var titles=[['PHASE 1 — LEADER TELEPORTIEREN','Zuerst teleportieren die 4 Rally-Leader sichtbar von ihren Außenpositionen in einen engen Cluster links oberhalb von Mortem.'],['PHASE 2 — MEMBER TELEPORTIEREN','Danach teleportieren sich alle Allianzmitglieder kompakt außen um Mortem und die Rally-Leader.'],['PHASE 3 — ALLE 4 RALLYS JOINEN','Jeder Spieler nutzt 4 Märsche: genau 1 Marsch pro Rally. Die grünen Linien zeigen das gleichzeitige Befüllen aller vier Rallys.'],['PHASE 4 — 4 RALLYS GREIFEN AN','Alle vier gefüllten Rallys greifen Mortem gleichzeitig an. Danach beginnt der Ablauf sofort wieder mit Phase 1.']];
  var step=1;

  function resetLeaders(){leaders.forEach(function(l,i){var n=document.getElementById('simLeader'+(i+1));n.classList.remove('show','teleport');n.style.left=l.sx+'%';n.style.top=l.sy+'%';});}
  function phase(s){
    box.querySelectorAll('.mortem-seq-phase').forEach(function(n){n.classList.toggle('active',+n.dataset.p===s);});box.querySelector('#simTitle').textContent=titles[s-1][0];box.querySelector('#simSub').textContent=titles[s-1][1];
    var members=box.querySelectorAll('.sim-member'),tags=box.querySelectorAll('.sim-rallytag'),joins=box.querySelectorAll('.sim-joinline'),attacks=box.querySelectorAll('.sim-attackline');
    members.forEach(function(n){n.classList.toggle('show',s>=2);n.classList.toggle('join',s===3);});joins.forEach(function(n){n.classList.toggle('show',s===3);});attacks.forEach(function(n){n.classList.toggle('show',s===4);});tags.forEach(function(n){n.classList.toggle('show',s>=1);n.classList.toggle('full',s>=3);n.textContent=s>=3?n.textContent.replace('READY','FULL'):n.textContent.replace('FULL','READY');});
    if(s===1){resetLeaders();leaders.forEach(function(l,i){setTimeout(function(){var n=document.getElementById('simLeader'+(i+1));n.classList.add('show','teleport');n.style.left=l.ex+'%';n.style.top=l.ey+'%';var r=document.getElementById('simRing'+(i+1));r.classList.remove('fire');void r.offsetWidth;r.classList.add('fire');setTimeout(function(){n.classList.remove('teleport');},1000);},i*220);});}
    if(s>=2){leaders.forEach(function(l,i){var n=document.getElementById('simLeader'+(i+1));n.classList.add('show');n.style.left=l.ex+'%';n.style.top=l.ey+'%';});}
    if(s===4){tags.forEach(function(n,i){n.textContent='R'+(i+1)+' ATTACK';});}
  }
  phase(step);if(window.__mortemSequenceV2)clearInterval(window.__mortemSequenceV2);window.__mortemSequenceV2=setInterval(function(){step=step===4?1:step+1;phase(step);},2800);
})();
