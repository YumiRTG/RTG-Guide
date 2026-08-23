(function(){
  var page=document.getElementById('mortem');
  if(!page)return;

  // Move Mortem to the first main tab.
  var topTabs=document.querySelector('.top-tabs');
  if(topTabs){
    var mortemTab=Array.from(topTabs.querySelectorAll('.top-tab-btn')).find(function(btn){
      return (btn.getAttribute('onclick')||'').indexOf("'mortem'")!==-1;
    });
    if(mortemTab && topTabs.firstElementChild!==mortemTab) topTabs.insertBefore(mortemTab,topTabs.firstElementChild);
  }

  if(!document.getElementById('mortem-v4-style')){
    document.head.insertAdjacentHTML('beforeend','<style id="mortem-v4-style">'+[
      '.mortem-v4{margin:16px 0;background:linear-gradient(180deg,#111,#090909);border:1px solid var(--border);border-radius:14px;padding:16px;overflow:hidden;box-shadow:0 14px 36px rgba(0,0,0,.35)}',
      '.m4-head{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,.07)}',
      '.m4-head h4{font-family:"Bebas Neue",sans-serif;font-size:30px;letter-spacing:2px;color:#fff;margin:0;line-height:1}',
      '.m4-head p{margin:5px 0 0;color:#aaa;font-size:13px}',
      '.m4-badges{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}',
      '.m4-badge{font:10px "Share Tech Mono",monospace;letter-spacing:1px;padding:5px 8px;border-radius:999px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);color:#ddd}',
      '.m4-badge.red{background:rgba(192,57,43,.15);border-color:rgba(192,57,43,.35);color:#ffc3ba}',
      '.m4-badge.green{background:rgba(46,204,113,.12);border-color:rgba(46,204,113,.3);color:#dcffea}',
      '.m4-phases{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:12px}',
      '.m4-phase{border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:9px 10px;background:rgba(255,255,255,.025);transition:.3s}',
      '.m4-phase small{display:block;font:9px "Share Tech Mono",monospace;color:#777;letter-spacing:1px}',
      '.m4-phase b{font-size:12px;color:#ccc}',
      '.m4-phase.active{background:rgba(52,152,219,.15);border-color:rgba(52,152,219,.6);box-shadow:0 0 22px rgba(52,152,219,.12)}',
      '.m4-phase.active b{color:#fff}',
      '.m4-status{display:flex;align-items:center;justify-content:space-between;gap:12px;border:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.03);padding:11px 13px;border-radius:9px;margin-bottom:12px}',
      '.m4-status strong{font-family:"Bebas Neue",sans-serif;letter-spacing:2px;font-size:22px;color:#fff}',
      '.m4-status span{font-size:12px;color:#aaa}',
      '.m4-loop{font:10px "Share Tech Mono",monospace!important;color:#f5d08a!important;white-space:nowrap}',
      '.m4-stage{position:relative;height:560px;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,.05);background:radial-gradient(circle at 55% 47%,rgba(139,0,0,.18),transparent 24%),radial-gradient(circle at 29% 27%,rgba(52,152,219,.08),transparent 17%),linear-gradient(180deg,#151515,#090909)}',
      '.m4-stage:before{content:"";position:absolute;inset:22px;border:1px dashed rgba(255,255,255,.07);border-radius:50%}',
      '.m4-alerts{position:absolute;top:12px;left:14px;right:14px;display:flex;justify-content:space-between;gap:8px;z-index:8;pointer-events:none}',
      '.m4-alert{font:9px "Share Tech Mono",monospace;letter-spacing:1px;padding:4px 8px;border-radius:999px;background:rgba(0,0,0,.5);border:1px solid rgba(255,255,255,.1);color:#bbb}',
      '.m4-alert.red{color:#ffbdb3;border-color:rgba(192,57,43,.35);background:rgba(192,57,43,.12)}',
      '.m4-alert.blue{color:#dff2ff;border-color:rgba(52,152,219,.35);background:rgba(52,152,219,.1)}',
      '.m4-cluster{position:absolute;left:14%;top:13%;width:31%;height:33%;border:1px dashed rgba(52,152,219,.28);border-radius:28px;z-index:1;box-shadow:inset 0 0 28px rgba(52,152,219,.05)}',
      '.m4-cluster:before{content:"RALLY CLUSTER — MEMBERS STAY HERE";position:absolute;top:-10px;left:12px;font:9px "Share Tech Mono",monospace;letter-spacing:.8px;color:#9fd4ff;background:#0d1012;border:1px solid rgba(52,152,219,.25);padding:2px 6px;border-radius:999px}',
      '.m4-bosswrap{position:absolute;left:56%;top:48%;width:165px;transform:translate(-50%,-50%);z-index:5;text-align:center}',
      '.m4-boss{position:relative;width:128px;height:128px;margin:0 auto;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ff8d68,#800606 70%);display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 0 0 1px rgba(255,255,255,.08),0 0 38px rgba(192,57,43,.28);animation:m4BossPulse 2.2s ease-in-out infinite}',
      '.m4-boss:before{content:"☣";position:absolute;font-size:54px;opacity:.12}',
      '.m4-boss strong{font-family:"Bebas Neue",sans-serif;font-size:28px;letter-spacing:2px;z-index:2}',
      '.m4-shieldring{position:absolute;inset:-11px;border-radius:50%;border:3px solid rgba(93,173,226,.78);box-shadow:0 0 24px rgba(93,173,226,.48),inset 0 0 24px rgba(93,173,226,.14);transition:.35s}',
      '.m4-shieldring.broken{opacity:0;transform:scale(1.18)}',
      '.m4-armorplate{position:absolute;inset:8px;border-radius:50%;border:4px double rgba(220,220,220,.72);box-shadow:inset 0 0 20px rgba(255,255,255,.08);transition:.35s}',
      '.m4-armorplate.broken{opacity:0;transform:scale(.82)}',
      '.m4-bars{margin-top:14px;background:rgba(0,0,0,.44);border:1px solid rgba(255,255,255,.08);border-radius:9px;padding:8px 9px;text-align:left}',
      '.m4-barrow{display:grid;grid-template-columns:48px 1fr 34px;gap:6px;align-items:center;margin:5px 0;font:9px "Share Tech Mono",monospace;color:#bdbdbd}',
      '.m4-track{height:8px;border-radius:999px;background:rgba(255,255,255,.07);overflow:hidden;border:1px solid rgba(255,255,255,.05)}',
      '.m4-fill{height:100%;width:100%;transition:width .4s ease}',
      '.m4-fill.shield{background:linear-gradient(90deg,#3498db,#85c9ff)}',
      '.m4-fill.armor{background:linear-gradient(90deg,#7f8c8d,#ecf0f1)}',
      '.m4-fill.hp{background:linear-gradient(90deg,#c0392b,#ff6b57)}',
      '.m4-weakness{margin-top:8px;border-radius:8px;border:1px solid rgba(243,156,18,.28);background:rgba(243,156,18,.08);padding:7px 8px;text-align:center;font:10px "Share Tech Mono",monospace;color:#f7d89b;opacity:0;transform:translateY(6px);transition:.3s}',
      '.m4-weakness.on{opacity:1;transform:none}',
      '.m4-weakness b{color:#fff;font-size:11px}',
      '.m4-leader{position:absolute;width:68px;height:68px;border-radius:50%;overflow:visible;z-index:4;opacity:0;transform:scale(.5);transition:left .7s ease,top .7s ease,opacity .35s ease,transform .45s ease}',
      '.m4-leader .pic{width:100%;height:100%;border-radius:50%;overflow:hidden;box-shadow:0 0 0 2px rgba(52,152,219,.3),0 0 22px rgba(52,152,219,.22),0 10px 22px rgba(0,0,0,.4)}',
      '.m4-leader img{width:100%;height:100%;object-fit:cover;display:block}',
      '.m4-leader .lbl{position:absolute;left:50%;bottom:-18px;transform:translateX(-50%);font:9px "Share Tech Mono",monospace;color:#dff2ff;background:#0d1114;border:1px solid rgba(52,152,219,.28);padding:2px 5px;border-radius:999px;white-space:nowrap}',
      '.m4-leader.on{opacity:1;transform:scale(1)}',
      '.m4-leader.tele{animation:m4Teleport .85s ease}',
      '.m4-member{position:absolute;width:22px;height:22px;border-radius:50%;z-index:4;background:linear-gradient(#3ad47b,#167043);border:1px solid rgba(255,255,255,.12);box-shadow:0 0 12px rgba(46,204,113,.18);opacity:0;transform:scale(.35);transition:opacity .3s,transform .45s,box-shadow .25s,background .25s}',
      '.m4-member.on{opacity:1;transform:scale(1)}',
      '.m4-member.join{box-shadow:0 0 18px rgba(46,204,113,.75)}',
      '.m4-member.troop{width:26px;height:26px;border-radius:7px;display:flex;align-items:center;justify-content:center;color:#fff;font:bold 10px "Share Tech Mono",monospace;box-shadow:0 0 14px rgba(255,255,255,.15)}',
      '.m4-member.troop.shooter{background:linear-gradient(#b57cff,#6c3bb0)}',
      '.m4-member.troop.attacker{background:linear-gradient(#ff7b69,#a93326)}',
      '.m4-member.troop.infantry{background:linear-gradient(#6fb9ff,#28679e)}',
      '.m4-rally{position:absolute;z-index:6;padding:4px 7px;border-radius:999px;background:rgba(52,152,219,.15);border:1px solid rgba(52,152,219,.45);color:#dff3ff;font:9px "Share Tech Mono",monospace;opacity:0;transform:translateY(6px);transition:.25s}',
      '.m4-rally.on{opacity:1;transform:none}',
      '.m4-rally.full{background:rgba(46,204,113,.16);border-color:rgba(46,204,113,.55);color:#e3ffec}',
      '.m4-svg{position:absolute;inset:0;width:100%;height:100%;z-index:2;pointer-events:none}',
      '.m4-svg line{stroke-linecap:round;opacity:0}',
      '.m4-svg line.on{opacity:1;animation:m4Beam .72s linear infinite}',
      '.m4-joinline{stroke:#39d77c;stroke-width:.42}',
      '.m4-attackline{stroke:#7dc9ff;stroke-width:.6;filter:drop-shadow(0 0 2px #7dc9ff)}',
      '.m4-individual{stroke:#ffd166;stroke-width:.34;filter:drop-shadow(0 0 1.5px #ffd166)}',
      '.m4-caption{position:absolute;left:50%;bottom:12px;transform:translateX(-50%);z-index:8;padding:7px 11px;border-radius:8px;background:rgba(0,0,0,.72);border:1px solid rgba(255,255,255,.08);font:9px "Share Tech Mono",monospace;color:#ddd;white-space:nowrap}',
      '@keyframes m4BossPulse{0%,100%{box-shadow:0 0 12px rgba(192,57,43,.2)}50%{box-shadow:0 0 36px rgba(192,57,43,.5)}}',
      '@keyframes m4Teleport{0%{filter:brightness(2) blur(2px);transform:scale(.55)}50%{filter:brightness(1.3);transform:scale(1.12)}100%{filter:none;transform:scale(1)}}',
      '@keyframes m4Beam{0%,100%{filter:brightness(.78)}50%{filter:brightness(1.7)}}',
      '@media(max-width:820px){.m4-phases{grid-template-columns:1fr 1fr}.m4-stage{height:650px}.m4-status,.m4-head{flex-direction:column;align-items:flex-start}.m4-badges{justify-content:flex-start}.m4-alerts{flex-wrap:wrap}.m4-bosswrap{left:58%}}'
    ].join('')+'</style>');
  }

  // Replace previous animation blocks.
  page.querySelectorAll('.mortem-sequence,.mortem-x-card,.mortem-sim-card,.mortem-map-card,.mortem-v4').forEach(function(el){el.remove();});
  var heading=Array.from(page.querySelectorAll('h3.sub-header')).find(function(h){return h.textContent.indexOf('ANIMIERTE ALLIANZ-AUFSTELLUNG')!==-1;});
  if(!heading)return;
  var info=heading.nextElementSibling;
  if(info&&info.classList.contains('callout')){
    info.innerHTML='<strong>Live-Ablauf:</strong> Erst teleportiert <strong>ein Rally-Leader nach dem anderen</strong> links oberhalb von Mortem. Danach teleportieren <strong>alle Spieler nur direkt neben den Leader-Cluster</strong>. Dann: Rally starten → alle 4 Rallys joinen → 4 Rallys greifen Mortem an → Schild &amp; Rüstung brechen → Spieler greifen einzeln mit der passenden Truppenart gegen Mortems Schwäche an.';
  }

  var leaderData=[
    {name:'SHERRY',img:'assets/heroes/s4-sherry.jpg',sx:3,sy:82,ex:26,ey:20},
    {name:'JAKE',img:'assets/heroes/s4-jake.jpg',sx:5,sy:9,ex:35,ey:18},
    {name:'PIERS',img:'assets/heroes/s4-piers.jpg',sx:82,sy:80,ex:24,ey:32},
    {name:'EXCELLA',img:'assets/heroes/s5-excella.jpg',sx:84,sy:12,ex:36,ey:31}
  ];
  // Members stay tightly around the leaders only.
  var memberPos=[[16,15],[20,12],[25,11],[31,12],[39,13],[44,16],[14,22],[18,25],[22,27],[29,25],[40,24],[45,23],[13,31],[17,35],[22,39],[28,38],[34,39],[41,37],[46,33],[16,42],[23,44],[31,43],[38,44],[44,40]];
  var box=document.createElement('div');
  box.className='mortem-v4';
  box.innerHTML='<div class="m4-head"><div><h4>☣ MORTEM — ALLIANCE COMBAT SIMULATION</h4><p>Die komplette Reihenfolge wird live gezeigt — inklusive Boss-Schild, Rüstung, HP und Schwächenphase.</p></div><div class="m4-badges"><span class="m4-badge red">BIOHAZARD BOSS</span><span class="m4-badge">4 RALLY LEADERS</span><span class="m4-badge green">MEMBERS STAY CLOSE</span></div></div>'+
    '<div class="m4-phases">'+
      '<div class="m4-phase" data-p="1"><small>PHASE 1</small><b>Leader teleportieren</b></div>'+
      '<div class="m4-phase" data-p="2"><small>PHASE 2</small><b>Member daneben</b></div>'+
      '<div class="m4-phase" data-p="3"><small>PHASE 3</small><b>Rally start + join</b></div>'+
      '<div class="m4-phase" data-p="4"><small>PHASE 4</small><b>4 Rally-Angriffe</b></div>'+
      '<div class="m4-phase" data-p="5"><small>PHASE 5</small><b>Schwäche ausnutzen</b></div>'+
    '</div>'+
    '<div class="m4-status"><div><strong id="m4Title"></strong><br><span id="m4Sub"></span></div><span class="m4-loop">AUTO LOOP · SHOOTER → ATTACKER → INFANTRY</span></div>'+
    '<div class="m4-stage" id="m4Stage">'+
      '<div class="m4-alerts"><span class="m4-alert red">☣ MORTEM ACTIVE</span><span class="m4-alert blue">LEADERS FIRST</span><span class="m4-alert">MEMBERS ONLY BESIDE LEADERS</span></div>'+
      '<div class="m4-cluster"></div>'+
      '<svg class="m4-svg" viewBox="0 0 100 100" preserveAspectRatio="none" id="m4Svg"></svg>'+
      '<div class="m4-bosswrap"><div class="m4-boss"><div class="m4-shieldring" id="m4ShieldRing"></div><div class="m4-armorplate" id="m4ArmorPlate"></div><strong>MORTEM</strong></div>'+
      '<div class="m4-bars">'+
        '<div class="m4-barrow"><span>SHIELD</span><div class="m4-track"><div class="m4-fill shield" id="m4Shield"></div></div><b id="m4ShieldTxt">100%</b></div>'+
        '<div class="m4-barrow"><span>ARMOR</span><div class="m4-track"><div class="m4-fill armor" id="m4Armor"></div></div><b id="m4ArmorTxt">100%</b></div>'+
        '<div class="m4-barrow"><span>HP</span><div class="m4-track"><div class="m4-fill hp" id="m4Hp"></div></div><b id="m4HpTxt">100%</b></div>'+
      '</div><div class="m4-weakness" id="m4Weakness">WEAKNESS: <b>SCANNING…</b></div></div>'+
      '<div class="m4-caption">4 MÄRSCHE PRO SPIELER · 1 MARSCH PRO RALLY · NACH ARMOR BREAK: PASSENDE TRUPPENART EINZELN ANGRIFF</div>'+
    '</div>';
  (info||heading).insertAdjacentElement('afterend',box);
  var stage=box.querySelector('#m4Stage');
  var svg=box.querySelector('#m4Svg');

  leaderData.forEach(function(d,i){
    var n=document.createElement('div');
    n.className='m4-leader';n.id='m4L'+(i+1);n.dataset.sx=d.sx;n.dataset.sy=d.sy;n.dataset.ex=d.ex;n.dataset.ey=d.ey;
    n.style.left=d.sx+'%';n.style.top=d.sy+'%';
    n.innerHTML='<div class="pic"><img src="'+d.img+'" alt="'+d.name+'"></div><span class="lbl">L'+(i+1)+' · '+d.name+'</span>';
    stage.appendChild(n);
    var r=document.createElement('div');r.className='m4-rally';r.id='m4R'+(i+1);r.style.left=(d.ex-3)+'%';r.style.top=(d.ey-7)+'%';r.textContent='RALLY '+(i+1)+' — READY';stage.appendChild(r);
  });
  memberPos.forEach(function(p,i){var m=document.createElement('div');m.className='m4-member';m.id='m4M'+(i+1);m.dataset.x=p[0];m.dataset.y=p[1];m.style.left=p[0]+'%';m.style.top=p[1]+'%';stage.appendChild(m);});

  function mkLine(cls,x1,y1,x2,y2,id){var l=document.createElementNS('http://www.w3.org/2000/svg','line');l.setAttribute('class',cls);l.setAttribute('x1',x1);l.setAttribute('y1',y1);l.setAttribute('x2',x2);l.setAttribute('y2',y2);if(id)l.id=id;svg.appendChild(l);return l;}
  // Join lines: each member only to nearby leader positions.
  memberPos.forEach(function(p,i){var ld=leaderData[i%4];mkLine('m4-joinline',p[0]+1,p[1]+1,ld.ex+3,ld.ey+3,'m4J'+(i+1));});
  leaderData.forEach(function(d,i){mkLine('m4-attackline',d.ex+3,d.ey+4,56,48,'m4A'+(i+1));});
  memberPos.forEach(function(p,i){mkLine('m4-individual',p[0]+1,p[1]+1,56,48,'m4I'+(i+1));});

  var title=box.querySelector('#m4Title'),sub=box.querySelector('#m4Sub');
  var shield=box.querySelector('#m4Shield'),armor=box.querySelector('#m4Armor'),hp=box.querySelector('#m4Hp');
  var shieldTxt=box.querySelector('#m4ShieldTxt'),armorTxt=box.querySelector('#m4ArmorTxt'),hpTxt=box.querySelector('#m4HpTxt');
  var shieldRing=box.querySelector('#m4ShieldRing'),armorPlate=box.querySelector('#m4ArmorPlate'),weakBox=box.querySelector('#m4Weakness');
  var leaders=leaderData.map(function(_,i){return box.querySelector('#m4L'+(i+1));});
  var rallies=leaderData.map(function(_,i){return box.querySelector('#m4R'+(i+1));});
  var members=memberPos.map(function(_,i){return box.querySelector('#m4M'+(i+1));});
  var joinLines=memberPos.map(function(_,i){return box.querySelector('#m4J'+(i+1));});
  var rallyLines=leaderData.map(function(_,i){return box.querySelector('#m4A'+(i+1));});
  var indivLines=memberPos.map(function(_,i){return box.querySelector('#m4I'+(i+1));});
  var weaknessTypes=[{key:'SHOOTER',cls:'shooter',icon:'S'},{key:'ATTACKER',cls:'attacker',icon:'A'},{key:'INFANTRY',cls:'infantry',icon:'I'}];
  var weaknessRound=0;
  var timers=[];
  function later(fn,ms){var t=setTimeout(fn,ms);timers.push(t);return t;}
  function clearTimers(){timers.forEach(clearTimeout);timers=[];}
  function setBars(s,a,h){shield.style.width=s+'%';armor.style.width=a+'%';hp.style.width=h+'%';shieldTxt.textContent=Math.max(0,Math.round(s))+'%';armorTxt.textContent=Math.max(0,Math.round(a))+'%';hpTxt.textContent=Math.max(0,Math.round(h))+'%';shieldRing.classList.toggle('broken',s<=0);armorPlate.classList.toggle('broken',a<=0);}
  function resetVisual(){
    clearTimers();
    box.querySelectorAll('.m4-phase').forEach(function(p){p.classList.remove('active');});
    leaders.forEach(function(n,i){n.classList.remove('on','tele');n.style.left=leaderData[i].sx+'%';n.style.top=leaderData[i].sy+'%';});
    members.forEach(function(m){m.className='m4-member';m.textContent='';});
    rallies.forEach(function(r,i){r.className='m4-rally';r.textContent='RALLY '+(i+1)+' — READY';});
    joinLines.concat(rallyLines).concat(indivLines).forEach(function(l){l.classList.remove('on');});
    weakBox.classList.remove('on');weakBox.innerHTML='WEAKNESS: <b>SCANNING…</b>';
    setBars(100,100,100);
  }
  function activePhase(p){box.querySelectorAll('.m4-phase').forEach(function(n){n.classList.toggle('active',+n.dataset.p===p);});}
  function showLeaderSequential(){
    leaders.forEach(function(n,i){later(function(){n.classList.add('on','tele');n.style.left=leaderData[i].ex+'%';n.style.top=leaderData[i].ey+'%';later(function(){n.classList.remove('tele');},900);},i*420);});
  }
  function showMembers(){members.forEach(function(m,i){later(function(){m.classList.add('on');},i*45);});}
  function startRalliesAndJoin(){
    rallies.forEach(function(r,i){later(function(){r.classList.add('on');r.textContent='RALLY '+(i+1)+' — START';},i*180);});
    joinLines.forEach(function(l,i){later(function(){l.classList.add('on');members[i].classList.add('join');},350+i*40);});
    rallies.forEach(function(r,i){later(function(){r.classList.add('full');r.textContent='RALLY '+(i+1)+' — FULL';},1250+i*160);});
  }
  function rallyAttack(){
    var states=[[50,100],[0,100],[0,50],[0,0]];
    rallyLines.forEach(function(l,i){later(function(){l.classList.add('on');rallies[i].textContent='RALLY '+(i+1)+' — ATTACK';setBars(states[i][0],states[i][1],100);later(function(){l.classList.remove('on');},650);},i*650);});
  }
  function weaknessAttack(){
    var w=weaknessTypes[weaknessRound%weaknessTypes.length]; weaknessRound++;
    weakBox.classList.add('on');weakBox.innerHTML='WEAKNESS DETECTED: <b>'+w.key+'</b> — NUTZE '+w.key+'-TRUPPEN';
    members.forEach(function(m,i){m.className='m4-member on troop '+w.cls;m.textContent=w.icon;});
    var hpNow=100;
    indivLines.forEach(function(l,i){later(function(){l.classList.add('on');hpNow=Math.max(0,hpNow-(100/indivLines.length));setBars(0,0,hpNow);later(function(){l.classList.remove('on');},230);},i*145);});
  }

  var phase=1;
  function runPhase(p){
    activePhase(p);
    if(p===1){resetVisual();activePhase(1);title.textContent='PHASE 1 — LEADER TELEPORTIEREN';sub.textContent='Ein Rally-Leader nach dem anderen teleportiert sich in den engen Cluster links oberhalb von Mortem.';showLeaderSequential();}
    if(p===2){title.textContent='PHASE 2 — SPIELER NUR NEBEN DEN LEADERN';sub.textContent='Erst jetzt teleportieren die Spieler — ausschließlich direkt um den Rally-Leader-Cluster, nicht weit verteilt.';leaders.forEach(function(n,i){n.classList.add('on');n.style.left=leaderData[i].ex+'%';n.style.top=leaderData[i].ey+'%';});showMembers();}
    if(p===3){title.textContent='PHASE 3 — RALLY STARTEN UND ALLE 4 JOINEN';sub.textContent='Die 4 Leader starten ihre Rallys. Jeder Spieler nutzt 4 Märsche und joint jede Rally genau einmal.';members.forEach(function(m){m.classList.add('on');});startRalliesAndJoin();}
    if(p===4){title.textContent='PHASE 4 — 4 RALLYS BRECHEN SCHILD UND RÜSTUNG';sub.textContent='Die vier Rallys schlagen nacheinander auf Mortem ein: zuerst fällt der Schild, danach die Rüstung. HP bleibt bis zum Armor Break unangetastet.';rallies.forEach(function(r,i){r.classList.add('on','full');r.textContent='RALLY '+(i+1)+' — FULL';});rallyAttack();}
    if(p===5){title.textContent='PHASE 5 — SCHWÄCHE AUSNUTZEN';sub.textContent='Sobald die Rüstung weg ist, greifen die Spieler einzeln an. Die Truppenart passt sich an Mortems aktuelle Schwäche an: Shooter, Attacker oder Infantry.';setBars(0,0,100);weaknessAttack();}
  }
  runPhase(1);
  if(window.__mortemV4Loop) clearInterval(window.__mortemV4Loop);
  window.__mortemV4Loop=setInterval(function(){phase=phase===5?1:phase+1;runPhase(phase);},4200);
})();