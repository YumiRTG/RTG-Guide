(function(){
  var tabs=document.querySelector('.top-tabs');
  if(!tabs || document.getElementById('herb')) return;

  document.head.insertAdjacentHTML('beforeend',`<style id="herb-event-style">
  .herb-wrap{max-width:1180px;margin:auto;padding:22px 20px 36px;color:#d8dfda}
  .herb-title{font-family:"Bebas Neue",sans-serif;font-size:44px;letter-spacing:3px;color:#fff;line-height:1;margin-bottom:4px}
  .herb-sub{font:11px "Share Tech Mono",monospace;color:#799587;letter-spacing:2px;margin-bottom:16px}
  .herb-alert{border:1px solid #2b5f43;background:#0d1b13;border-radius:10px;padding:12px 14px;margin:10px 0;line-height:1.5}
  .herb-alert strong{color:#fff}.herb-alert.hot{border:2px solid #b38a31;background:#241c0c;color:#f4ddb0}
  .herb-rules{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:14px 0 16px}
  .herb-rule{background:#111;border:1px solid #2a2a2a;border-radius:9px;padding:11px;min-height:72px}
  .herb-rule small{display:block;font:9px "Share Tech Mono",monospace;color:#6f7f77;margin-bottom:3px}.herb-rule b{color:#fff;font-size:13px}
  .herb-card{background:#0d0f0e;border:1px solid #27312b;border-radius:14px;padding:14px;box-shadow:0 14px 34px #0008}
  .herb-card h3{font-family:"Bebas Neue",sans-serif;color:#fff;letter-spacing:2px;font-size:25px;margin:0}
  .herb-phases{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;margin:12px 0}
  .herb-phase{padding:8px;border:1px solid #28312c;border-radius:8px;background:#121513;min-height:48px;transition:.25s}
  .herb-phase small{display:block;color:#627069;font:8px "Share Tech Mono",monospace}.herb-phase b{font-size:10px;color:#aeb8b2}
  .herb-phase.on{border-color:#52b777;background:#10261a;box-shadow:0 0 18px rgba(61,183,108,.18)}.herb-phase.on b{color:#fff}
  .herb-status{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:10px 12px;border:1px solid #28312c;border-radius:9px;background:#121513;margin-bottom:10px}
  .herb-status strong{display:block;color:#fff;font-family:"Bebas Neue",sans-serif;font-size:22px;letter-spacing:1.5px}.herb-status span{font-size:12px;color:#9fa9a3}.herb-clock{font:10px "Share Tech Mono",monospace;color:#f0c86b;white-space:nowrap}
  .herb-stage{position:relative;height:590px;overflow:hidden;border-radius:12px;border:1px solid #27312b;background:radial-gradient(circle at 50% 50%,rgba(82,183,119,.18),transparent 25%),radial-gradient(circle at 50% 50%,rgba(126,165,97,.08),transparent 50%),linear-gradient(#121714,#080b09)}
  .herb-stage:before{content:"";position:absolute;inset:28px;border:1px solid rgba(255,255,255,.04);border-radius:50%}
  .herb-zone{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:50%;pointer-events:none}
  .herb-zone.z1{width:88%;height:88%;border:1px dashed rgba(103,147,104,.25)}
  .herb-zone.z2{width:61%;height:61%;border:1px dashed rgba(162,178,94,.38);background:rgba(162,178,94,.025)}
  .herb-zone.z3{width:34%;height:34%;border:2px dashed rgba(84,210,125,.55);background:rgba(84,210,125,.045);box-shadow:inset 0 0 34px rgba(84,210,125,.08)}
  .herb-zone-label{position:absolute;left:50%;transform:translateX(-50%);padding:3px 8px;border-radius:99px;background:#09100b;border:1px solid #2a5137;font:9px "Share Tech Mono",monospace;letter-spacing:1px;color:#b9dfc5;z-index:3}
  .herb-zone-label.l1{top:5%}.herb-zone-label.l2{top:18%}.herb-zone-label.l3{top:34%;color:#e5ffe9;border-color:#459765}
  .herb-node{position:absolute;display:flex;align-items:center;justify-content:center;border-radius:50%;z-index:4;box-shadow:0 7px 18px #0008;transition:.3s}
  .herb-node:after{position:absolute;bottom:-15px;left:50%;transform:translateX(-50%);white-space:nowrap;font:8px "Share Tech Mono",monospace;color:#a9b4ad}
  .herb-node.l1{width:30px;height:30px;background:radial-gradient(circle at 35% 30%,#94be79,#365b37);border:1px solid #5f8f5d}.herb-node.l1:after{content:"L1"}
  .herb-node.l2{width:36px;height:36px;background:radial-gradient(circle at 35% 30%,#c0c66c,#667135);border:1px solid #939d4e}.herb-node.l2:after{content:"L2"}
  .herb-node.l3{width:48px;height:48px;background:radial-gradient(circle at 35% 30%,#6de39a,#187342);border:2px solid #54d486;box-shadow:0 0 22px rgba(84,212,134,.25),0 8px 20px #0008}.herb-node.l3:after{content:"L3 PRIORITY";color:#dfffe9}
  .herb-node.enemy{background:radial-gradient(circle at 35% 30%,#ff927d,#8f2f25);border-color:#d95b4f}.herb-node.enemy:after{content:"ENEMY L3";color:#ffc2ba}
  .herb-leaf{font-size:17px;filter:drop-shadow(0 1px 2px #000)}.herb-node.l3 .herb-leaf{font-size:25px}
  .herb-drop{position:absolute;width:28px;height:28px;border-radius:50%;background:radial-gradient(circle,#fff8b7 0 18%,#ffd95b 20% 44%,#9b6816 70%);border:2px solid #ffe780;box-shadow:0 0 24px rgba(255,222,92,.85);opacity:0;transform:scale(.25);z-index:8;transition:.25s}.herb-drop.on{opacity:1;transform:scale(1);animation:herbDropPulse .7s infinite alternate}.herb-drop:after{content:"DROP";position:absolute;left:50%;top:31px;transform:translateX(-50%);font:8px "Share Tech Mono",monospace;color:#ffe89b;white-space:nowrap}
  .herb-march{position:absolute;width:25px;height:25px;border-radius:7px;background:linear-gradient(#4fb8ff,#245b87);border:1px solid #75c9ff;display:flex;align-items:center;justify-content:center;color:#fff;font:bold 10px "Share Tech Mono",monospace;z-index:9;box-shadow:0 0 15px rgba(79,184,255,.32);transition:left 1.1s ease,top 1.1s ease,transform .25s}.herb-march.fast{transition:left .55s ease,top .55s ease;box-shadow:0 0 22px rgba(255,217,91,.58)}
  .herb-march:after{content:"MARCH";position:absolute;top:28px;left:50%;transform:translateX(-50%);font:7px "Share Tech Mono",monospace;color:#acdfff;white-space:nowrap}
  .herb-enemy-march{position:absolute;width:23px;height:23px;border-radius:7px;background:linear-gradient(#dc6859,#762c25);border:1px solid #f28d80;display:flex;align-items:center;justify-content:center;color:#fff;font:bold 9px "Share Tech Mono",monospace;z-index:7;transition:left 1s ease,top 1s ease}
  .herb-banner{position:absolute;left:50%;bottom:14px;transform:translateX(-50%);z-index:12;min-width:50%;max-width:86%;text-align:center;padding:8px 12px;border-radius:9px;background:#050806e8;border:1px solid #2c5138;font:10px "Share Tech Mono",monospace;color:#d9e8dd;letter-spacing:.5px}
  .herb-banner.hot{border:2px solid #d19b35;color:#ffe3a2;box-shadow:0 0 20px rgba(209,155,53,.18)}
  .herb-zombie{position:absolute;right:5%;bottom:12%;width:70px;height:70px;border-radius:50%;border:1px solid #50363a;background:#171214;display:flex;align-items:center;justify-content:center;font-size:28px;opacity:.45}.herb-zombie:after{content:"IGNORE ZOMBIES";position:absolute;top:76px;white-space:nowrap;font:8px "Share Tech Mono",monospace;color:#a57b80}
  .herb-tips{display:grid;grid-template-columns:repeat(2,1fr);gap:9px;margin-top:14px}.herb-tip{padding:11px 12px;border:1px solid #29342d;background:#101411;border-radius:9px;font-size:13px}.herb-tip b{color:#fff}.herb-tip.good{border-color:#2d6d46}.herb-tip.bad{border-color:#6f3838;background:#1b1111}
  @keyframes herbDropPulse{from{box-shadow:0 0 12px rgba(255,222,92,.55)}to{box-shadow:0 0 30px rgba(255,222,92,1)}}
  @media(max-width:850px){.herb-rules{grid-template-columns:1fr 1fr}.herb-phases{grid-template-columns:1fr 1fr}.herb-stage{height:680px}.herb-status{align-items:flex-start;flex-direction:column}.herb-tips{grid-template-columns:1fr}.herb-banner{min-width:82%}}
  </style>`);

  var vaccineBtn=Array.from(tabs.querySelectorAll('.top-tab-btn')).find(function(btn){
    return (btn.getAttribute('onclick')||'').indexOf("'vaccine'")!==-1;
  });
  var herbBtn=document.createElement('button');
  herbBtn.className='top-tab-btn';
  herbBtn.setAttribute('onclick',"showTop('herb',this)");
  herbBtn.textContent='🌿 HERB EVENT';
  if(vaccineBtn && vaccineBtn.nextSibling) tabs.insertBefore(herbBtn,vaccineBtn.nextSibling); else tabs.appendChild(herbBtn);

  var page=document.createElement('section');
  page.id='herb';
  page.className='top-page';
  page.innerHTML=`<div class="herb-wrap">
    <div class="herb-title">HERB EVENT</div>
    <div class="herb-sub">// FARM CENTER · PRIORITIZE LEVEL 3 · COLLECT DROPS IMMEDIATELY //</div>

    <div class="herb-alert hot"><strong>Core strategy:</strong> Spend almost all of your time on <strong>Level 3 gathering spots in the center</strong>. Drops are worth more than normal gathering, so the moment a drop appears, grab it immediately.</div>

    <div class="herb-rules">
      <div class="herb-rule"><small>ZONE 1</small><b>Level 1 spots spawn on the outside.</b></div>
      <div class="herb-rule"><small>ZONE 2</small><b>Level 2 spots spawn closer to the middle.</b></div>
      <div class="herb-rule"><small>ZONE 3</small><b>Level 3 spots spawn in the center — farm these most.</b></div>
      <div class="herb-rule"><small>DROP PRIORITY</small><b>When drops appear, collect them before anything else.</b></div>
    </div>

    <div class="herb-card">
      <h3>LIVE FARMING SEQUENCE</h3>
      <div class="herb-phases">${['Move to center','Farm Level 3','Spot cleared','Drop appears','Collect instantly','Steal enemy drop'].map(function(x,i){return '<div class="herb-phase" data-herb-phase="'+(i+1)+'"><small>PHASE '+(i+1)+'</small><b>'+x+'</b></div>';}).join('')}</div>
      <div class="herb-status"><div><strong id="herbStatusTitle">MOVE TO THE CENTER</strong><span id="herbStatusText">Ignore low-value distractions and send your marches toward Level 3 spots.</span></div><div class="herb-clock" id="herbClock">EVENT TIMER 00:00</div></div>
      <div class="herb-stage" id="herbStage">
        <div class="herb-zone z1"></div><div class="herb-zone z2"></div><div class="herb-zone z3"></div>
        <div class="herb-zone-label l1">OUTER RING — LEVEL 1</div><div class="herb-zone-label l2">MIDDLE RING — LEVEL 2</div><div class="herb-zone-label l3">CENTER — LEVEL 3 PRIORITY</div>
        <div class="herb-node l1" style="left:8%;top:21%"><span class="herb-leaf">🌿</span></div><div class="herb-node l1" style="left:82%;top:18%"><span class="herb-leaf">🌿</span></div><div class="herb-node l1" style="left:13%;top:73%"><span class="herb-leaf">🌿</span></div><div class="herb-node l1" style="left:84%;top:71%"><span class="herb-leaf">🌿</span></div>
        <div class="herb-node l2" style="left:25%;top:25%"><span class="herb-leaf">🌿</span></div><div class="herb-node l2" style="left:69%;top:27%"><span class="herb-leaf">🌿</span></div><div class="herb-node l2" style="left:23%;top:63%"><span class="herb-leaf">🌿</span></div><div class="herb-node l2" style="left:71%;top:62%"><span class="herb-leaf">🌿</span></div>
        <div class="herb-node l3" id="herbL3A" style="left:43%;top:39%"><span class="herb-leaf">🌿</span></div><div class="herb-node l3" id="herbL3B" style="left:54%;top:50%"><span class="herb-leaf">🌿</span></div><div class="herb-node l3 enemy" id="herbEnemyL3" style="left:48%;top:58%"><span class="herb-leaf">🌿</span></div>
        <div class="herb-drop" id="herbDrop" style="left:48%;top:44%"></div><div class="herb-drop" id="enemyDrop" style="left:54%;top:61%"></div>
        <div class="herb-march" id="herbMarch1" style="left:8%;top:48%">1</div><div class="herb-march" id="herbMarch2" style="left:89%;top:42%">2</div><div class="herb-march" id="herbMarch3" style="left:14%;top:84%">3</div>
        <div class="herb-enemy-march" id="enemyMarch" style="left:80%;top:80%">E</div>
        <div class="herb-zombie">🧟</div>
        <div class="herb-banner" id="herbBanner">GO CENTER → FARM LEVEL 3 → GRAB EVERY DROP</div>
      </div>
    </div>

    <div class="herb-alert"><strong>≈ 3-minute drop window:</strong> Small high-value drops can appear during the event. Watch the map constantly and redirect a march immediately when one appears.</div>
    <div class="herb-alert"><strong>Enemy opportunity:</strong> If an enemy Level 3 spot is cleared and its drop is exposed, take the chance to grab that drop before the enemy does. Do not chase random fights — only take efficient drop steals.</div>

    <div class="herb-tips">
      <div class="herb-tip good">✅ <b>Prioritize Level 3 spots</b> in the center.</div>
      <div class="herb-tip good">✅ <b>Collect every drop immediately.</b> Drops are the highest-value target.</div>
      <div class="herb-tip good">✅ <b>Steal enemy Level 3 drops</b> whenever the opportunity is quick and safe.</div>
      <div class="herb-tip bad">❌ <b>Do not waste time killing zombies.</b> Focus on gathering and drops.</div>
    </div>
  </div>`;

  var reference=document.getElementById('vaccine');
  if(reference && reference.nextSibling) reference.parentNode.insertBefore(page,reference.nextSibling); else document.body.appendChild(page);

  var phases=Array.from(page.querySelectorAll('[data-herb-phase]'));
  var title=document.getElementById('herbStatusTitle');
  var text=document.getElementById('herbStatusText');
  var clock=document.getElementById('herbClock');
  var banner=document.getElementById('herbBanner');
  var m1=document.getElementById('herbMarch1'),m2=document.getElementById('herbMarch2'),m3=document.getElementById('herbMarch3');
  var drop=document.getElementById('herbDrop'),enemyDrop=document.getElementById('enemyDrop'),enemyMarch=document.getElementById('enemyMarch');
  var phaseText=[
    ['MOVE TO THE CENTER','Send your marches toward Level 3 spots. Level 1 and Level 2 are fallback targets only.'],
    ['FARM LEVEL 3','Keep your marches on the highest-value Level 3 gathering spots in the center.'],
    ['LEVEL 3 SPOT CLEARED','The spot finishes. Be ready — the next valuable target is the drop.'],
    ['HIGH-VALUE DROP APPEARS','A small drop appears. Drops are worth more, so react immediately.'],
    ['COLLECT THE DROP NOW','Redirect the nearest march, grab the drop, then return to Level 3 farming.'],
    ['STEAL ENEMY LEVEL 3 DROP','If an enemy exposes a Level 3 drop, take it before they do — then return to farming.']
  ];

  function move(el,x,y,fast){if(!el)return;el.classList.toggle('fast',!!fast);el.style.left=x+'%';el.style.top=y+'%';}
  function setPhase(n){
    phases.forEach(function(p,i){p.classList.toggle('on',i===n-1);});
    title.textContent=phaseText[n-1][0];text.textContent=phaseText[n-1][1];
    drop.classList.remove('on');enemyDrop.classList.remove('on');banner.classList.remove('hot');
    if(n===1){move(m1,39,40);move(m2,58,51);move(m3,49,55);move(enemyMarch,74,71);banner.textContent='SKIP LOW-VALUE DISTRACTIONS — MOVE TO LEVEL 3';}
    if(n===2){move(m1,43,39);move(m2,54,50);move(m3,47,56);banner.textContent='KEEP YOUR MARCHES ON LEVEL 3 SPOTS';}
    if(n===3){move(m1,44,40);move(m2,55,50);move(m3,48,57);banner.textContent='SPOT CLEARED — WATCH FOR THE DROP';}
    if(n===4){drop.classList.add('on');banner.textContent='DROP SPAWNED — THIS IS NOW THE #1 TARGET';banner.classList.add('hot');}
    if(n===5){drop.classList.add('on');move(m1,48,44,true);banner.textContent='COLLECT DROP IMMEDIATELY → RETURN TO LEVEL 3';banner.classList.add('hot');setTimeout(function(){drop.classList.remove('on');},1300);}
    if(n===6){enemyDrop.classList.add('on');move(enemyMarch,58,64);move(m2,54,61,true);banner.textContent='ENEMY DROP EXPOSED — TAKE IT IF YOU CAN';banner.classList.add('hot');setTimeout(function(){enemyDrop.classList.remove('on');},1500);}
  }

  var step=1,seconds=0;
  setPhase(step);
  setInterval(function(){seconds+=1;var mm=String(Math.floor(seconds/60)).padStart(2,'0'),ss=String(seconds%60).padStart(2,'0');clock.textContent='EVENT TIMER '+mm+':'+ss+(seconds>=180?' · DROP WINDOW ACTIVE':' · DROPS ≈ 03:00');},1000);
  setInterval(function(){step=step%6+1;setPhase(step);},3900);
})();