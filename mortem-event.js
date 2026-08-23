(function(){
  document.head.insertAdjacentHTML('beforeend',[
    '<style>',
    '.mortem-hero-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:16px;align-items:start}',
    '.mortem-preview{background:linear-gradient(180deg,#191919,#101010);border:1px solid #2a2a2a;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.35)}',
    '.mortem-preview-head{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1px solid #2a2a2a;background:linear-gradient(90deg,rgba(192,57,43,.25),rgba(255,255,255,.02))}',
    '.mortem-preview-title{font-family:"Bebas Neue",sans-serif;font-size:28px;letter-spacing:2px;color:#fff}',
    '.mortem-badge{display:inline-block;padding:4px 10px;border-radius:5px;background:rgba(243,156,18,.16);border:1px solid rgba(243,156,18,.3);color:#f5d08a;font-family:"Share Tech Mono",monospace;font-size:11px;letter-spacing:1px;text-transform:uppercase}',
    '.mortem-preview-body{padding:16px}',
    '.mortem-timer{font-family:"Share Tech Mono",monospace;color:#2ecc71;font-size:12px;letter-spacing:1px;margin-bottom:14px}',
    '.mortem-mission{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 12px;border:1px solid rgba(255,255,255,.06);border-radius:8px;background:rgba(255,255,255,.03);margin-bottom:10px}',
    '.mortem-mission:last-child{margin-bottom:0}',
    '.mortem-mission-name{font-weight:700;color:#fff;font-size:14px}',
    '.mortem-mission-sub{font-size:12px;color:#888;margin-top:2px}',
    '.mortem-reward{font-family:"Share Tech Mono",monospace;font-size:11px;color:#f5d08a;white-space:nowrap}',
    '.mortem-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin:16px 0}',
    '.mortem-step{background:var(--panel2);border:1px solid var(--border);border-radius:10px;padding:14px;position:relative;overflow:hidden}',
    '.mortem-step::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(192,57,43,.16),transparent 55%);pointer-events:none}',
    '.mortem-step-num{font-family:"Bebas Neue",sans-serif;font-size:30px;letter-spacing:2px;color:var(--gold);line-height:1;margin-bottom:8px}',
    '.mortem-step-title{font-family:"Bebas Neue",sans-serif;font-size:20px;letter-spacing:2px;color:#fff;margin-bottom:6px}',
    '.mortem-map-card{background:linear-gradient(180deg,#111,#0c0c0c);border:1px solid var(--border);border-radius:12px;padding:18px;margin:16px 0 8px}',
    '.mortem-map{position:relative;height:420px;border-radius:12px;border:1px solid rgba(255,255,255,.05);background:radial-gradient(circle at center,rgba(255,69,0,.08),transparent 32%), radial-gradient(circle at 35% 28%,rgba(52,152,219,.08),transparent 18%), linear-gradient(180deg,#141414,#0b0b0b);overflow:hidden}',
    '.mortem-map::before{content:"";position:absolute;inset:20px;border:1px dashed rgba(255,255,255,.08);border-radius:50%;animation:mortemPulse 4s ease-in-out infinite}',
    '.mortem-ring{position:absolute;border:1px dashed rgba(255,255,255,.08);border-radius:50%;animation:mortemPulse 4s ease-in-out infinite}',
    '.mortem-ring.r1{width:180px;height:180px;left:38px;top:28px;border-color:rgba(52,152,219,.25)}',
    '.mortem-ring.r2{width:250px;height:250px;left:4px;top:-8px;border-color:rgba(255,255,255,.12);animation-delay:.8s}',
    '.mortem-node{position:absolute;display:flex;align-items:center;justify-content:center;text-align:center;border-radius:999px;color:#fff;font-weight:700;box-shadow:0 0 0 1px rgba(255,255,255,.06),0 8px 26px rgba(0,0,0,.35)}',
    '.mortem-node.mortem-boss{width:110px;height:110px;left:52%;top:46%;transform:translate(-50%,-50%);background:radial-gradient(circle at 35% 35%,#ff8a65,#8b0000 70%);font-family:"Bebas Neue",sans-serif;font-size:24px;letter-spacing:2px;animation:mortemBoss 2.8s ease-in-out infinite}',
    '.mortem-node.leader{width:54px;height:54px;background:linear-gradient(180deg,#3498db,#1f4f78);font-family:"Share Tech Mono",monospace;font-size:11px;animation:mortemFloat 3s ease-in-out infinite}',
    '.mortem-node.member{width:24px;height:24px;background:linear-gradient(180deg,#2ecc71,#1d7e47);font-size:0;animation:mortemFloat 3.6s ease-in-out infinite}',
    '.mortem-line{position:absolute;height:2px;background:linear-gradient(90deg,rgba(52,152,219,.9),rgba(52,152,219,0));transform-origin:left center;animation:mortemDash 1.8s linear infinite}',
    '.mortem-legend{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin-top:14px}',
    '.mortem-legend-item{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.05);border-radius:8px;padding:10px 12px;font-size:13px}',
    '.mortem-dot{width:18px;height:18px;border-radius:999px;flex-shrink:0}',
    '.mortem-flow{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin:14px 0}',
    '.mortem-flow-item{background:var(--panel2);border:1px solid var(--border);border-radius:10px;padding:14px;text-align:center;position:relative}',
    '.mortem-flow-item::after{content:"→";position:absolute;right:-11px;top:50%;transform:translateY(-50%);color:var(--crimson);font-size:22px}',
    '.mortem-flow-item:last-child::after{display:none}',
    '.mortem-mini{font-family:"Share Tech Mono",monospace;font-size:11px;color:var(--dim);letter-spacing:1px;margin-bottom:4px}',
    '.mortem-check{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;margin-top:12px}',
    '.mortem-check .callout{margin:0;height:100%}',
    '@keyframes mortemPulse{0%,100%{transform:scale(1);opacity:.55}50%{transform:scale(1.04);opacity:1}}',
    '@keyframes mortemFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}',
    '@keyframes mortemBoss{0%,100%{box-shadow:0 0 0 0 rgba(192,57,43,.18),0 10px 30px rgba(0,0,0,.35)}50%{box-shadow:0 0 0 12px rgba(192,57,43,0),0 10px 30px rgba(0,0,0,.45)}}',
    '@keyframes mortemDash{0%{opacity:.35;filter:brightness(.85)}50%{opacity:1;filter:brightness(1.2)}100%{opacity:.35;filter:brightness(.85)}}',
    '@media (max-width: 860px){.mortem-hero-grid{grid-template-columns:1fr}.mortem-map{height:500px}.mortem-flow-item::after{display:none}}',
    '</style>'
  ].join(''));

  function mortemMap(){
    return '<div class="mortem-map-card"><div class="mortem-map">'+
      '<div class="mortem-ring r1"></div><div class="mortem-ring r2"></div>'+
      '<div class="mortem-node mortem-boss">MORTEM</div>'+
      '<div class="mortem-line" style="left:29%;top:26%;width:150px;transform:rotate(27deg)"></div>'+
      '<div class="mortem-line" style="left:31%;top:27%;width:132px;transform:rotate(31deg);animation-delay:.2s"></div>'+
      '<div class="mortem-line" style="left:32%;top:30%;width:126px;transform:rotate(20deg);animation-delay:.4s"></div>'+
      '<div class="mortem-line" style="left:34%;top:29%;width:118px;transform:rotate(35deg);animation-delay:.6s"></div>'+
      '<div class="mortem-node leader" style="left:26%;top:20%">L1</div>'+
      '<div class="mortem-node leader" style="left:34%;top:17%">L2</div>'+
      '<div class="mortem-node leader" style="left:24%;top:31%">L3</div>'+
      '<div class="mortem-node leader" style="left:35%;top:29%">L4</div>'+
      '<div class="mortem-node member" style="left:14%;top:10%"></div>'+
      '<div class="mortem-node member" style="left:19%;top:6%"></div>'+
      '<div class="mortem-node member" style="left:28%;top:6%"></div>'+
      '<div class="mortem-node member" style="left:39%;top:8%"></div>'+
      '<div class="mortem-node member" style="left:46%;top:13%"></div>'+
      '<div class="mortem-node member" style="left:14%;top:21%"></div>'+
      '<div class="mortem-node member" style="left:10%;top:30%"></div>'+
      '<div class="mortem-node member" style="left:13%;top:40%"></div>'+
      '<div class="mortem-node member" style="left:18%;top:48%"></div>'+
      '<div class="mortem-node member" style="left:27%;top:42%"></div>'+
      '<div class="mortem-node member" style="left:41%;top:41%"></div>'+
      '<div class="mortem-node member" style="left:53%;top:22%"></div>'+
      '<div class="mortem-node member" style="left:63%;top:28%"></div>'+
      '<div class="mortem-node member" style="left:68%;top:39%"></div>'+
      '<div class="mortem-node member" style="left:58%;top:52%"></div>'+
      '<div class="mortem-node member" style="left:47%;top:58%"></div>'+
      '<div class="mortem-node member" style="left:34%;top:60%"></div>'+
      '<div class="mortem-node member" style="left:24%;top:56%"></div>'+
      '<div class="mortem-node member" style="left:8%;top:52%"></div>'+
      '<div class="mortem-node member" style="left:73%;top:48%"></div>'+
      '<div class="mortem-node member" style="left:77%;top:20%"></div>'+
      '<div class="mortem-node member" style="left:82%;top:32%"></div>'+
      '<div class="mortem-node member" style="left:82%;top:56%"></div>'+
      '<div class="mortem-node member" style="left:68%;top:66%"></div>'+
      '<div class="mortem-node member" style="left:54%;top:72%"></div>'+
      '<div class="mortem-node member" style="left:36%;top:75%"></div>'+
      '<div class="mortem-node member" style="left:18%;top:70%"></div>'+
      '<div class="mortem-node member" style="left:6%;top:64%"></div>'+
      '</div>'+
      '<div class="mortem-legend">'+
        '<div class="mortem-legend-item"><span class="mortem-dot" style="background:linear-gradient(180deg,#ff8a65,#8b0000)"></span><strong>Mortem</strong> steht im Zentrum.</div>'+
        '<div class="mortem-legend-item"><span class="mortem-dot" style="background:linear-gradient(180deg,#3498db,#1f4f78)"></span><strong>4 Rally-Leader</strong> stehen eng links oberhalb.</div>'+
        '<div class="mortem-legend-item"><span class="mortem-dot" style="background:linear-gradient(180deg,#2ecc71,#1d7e47)"></span><strong>Allianzmitglieder</strong> stehen ringförmig möglichst nah außen herum.</div>'+
      '</div></div>';
  }

  function mortemSection(){
    return '<div class="page-inner">'+
      '<div class="section-title">MORTEM-ABWEHR – ALLIANZ-TAKTIK</div>'+
      '<div class="section-sub">// VORBEREITUNG · POSITIONIERUNG · 4 RALLIES · MAXIMIZE DAMAGE //</div>'+
      '<div class="mortem-hero-grid">'+
        '<div class="mortem-preview">'+
          '<div class="mortem-preview-head"><div class="mortem-preview-title">Mortem-Abwehr</div><span class="mortem-badge">Vorbereitung</span></div>'+
          '<div class="mortem-preview-body">'+
            '<div class="mortem-timer">BOSS-BESCHWÖRUNG → MISSIONEN ABSCHLIESSEN → ALLIANZ-KAMPFKRAFT ERHÖHEN</div>'+
            '<div class="mortem-mission"><div><div class="mortem-mission-name">Verwende Edelsteine</div><div class="mortem-mission-sub">Vorbereitungsmission für Allianzschaden</div></div><div class="mortem-reward">Stärkung ▲</div></div>'+
            '<div class="mortem-mission"><div><div class="mortem-mission-name">Verwende Beschleunigungen</div><div class="mortem-mission-sub">Schneller Fortschritt für alle Mitglieder</div></div><div class="mortem-reward">Boost ▲</div></div>'+
            '<div class="mortem-mission"><div><div class="mortem-mission-name">Epische Heldenrekrutierung</div><div class="mortem-mission-sub">Zusätzliche Punkte in der Vorbereitung</div></div><div class="mortem-reward">Power ▲</div></div>'+
            '<div class="mortem-mission"><div><div class="mortem-mission-name">Kostenfreie Edelsteine erhalten</div><div class="mortem-mission-sub">Kleine Aufgabe – schneller Beitrag</div></div><div class="mortem-reward">Beitrag ▲</div></div>'+
            '<div class="mortem-mission"><div><div class="mortem-mission-name">Infizierte eliminieren</div><div class="mortem-mission-sub">Jeder Abschluss stärkt den Bosskampf</div></div><div class="mortem-reward">Schaden ▲</div></div>'+
          '</div></div>'+
        '<div>'+
          '<div class="callout fire"><strong>Ziel:</strong> Kurze Laufwege, dauerhaft volle Rallys und möglichst wenig Zeit zwischen den Angriffen.</div>'+
          '<div class="callout green"><strong>Vorbereitungsphase:</strong> Möglichst viele Mitglieder schließen die verfügbaren Vorbereitungsmissionen ab. Dadurch wird die Kampfkraft der Allianz verbessert und der verursachte Schaden im Bosskampf erhöht.</div>'+
          '<div class="callout blue"><strong>Sobald Mortem beschworen wird:</strong> Es laufen dauerhaft <strong>4 Rallys gleichzeitig</strong>. Jeder Spieler nutzt seine <strong>4 Märsche</strong> – <strong>1 Marsch pro Rally</strong>.</div>'+
          '<div class="callout gold"><strong>Kernregel:</strong> WORK TOGETHER. STAY CLOSE. KEEP 4 RALLIES RUNNING. MAXIMIZE DAMAGE.</div>'+
        '</div></div>'+
      '<div class="divider"></div>'+
      '<h3 class="sub-header">SO LÄUFT DAS EVENT AB</h3>'+
      '<div class="mortem-steps">'+
        '<div class="mortem-step"><div class="mortem-step-num">01</div><div class="mortem-step-title">Vorbereitung</div><p>Möglichst viele Mitglieder erledigen Missionen, bevor Mortem beschworen wird.</p></div>'+
        '<div class="mortem-step"><div class="mortem-step-num">02</div><div class="mortem-step-title">Teleport</div><p>Erst die 4 Rally-Leader links oberhalb von Mortem. Danach alle anderen eng außen herum.</p></div>'+
        '<div class="mortem-step"><div class="mortem-step-num">03</div><div class="mortem-step-title">4 Rallys</div><p>Alle vier Leader starten möglichst gleichzeitig. Jeder Spieler joint alle 4 Rallys mit je einem Marsch.</p></div>'+
        '<div class="mortem-step"><div class="mortem-step-num">04</div><div class="mortem-step-title">Dauerbetrieb</div><p>Nach jedem Angriff sofort wieder: Rally starten → füllen → angreifen → neu starten.</p></div>'+
      '</div>'+
      '<div class="divider"></div>'+
      '<h3 class="sub-header">ANIMIERTE ALLIANZ-AUFSTELLUNG</h3>'+
      '<div class="callout blue"><strong>Visuelle Regel:</strong> Die 4 Rally-Leader stehen als enger Cluster links oberhalb von Mortem. Die Allianz bildet außen herum einen kompakten Ring. Je näher an den Leadern, desto besser.</div>'+
      mortemMap()+
      '<div class="divider"></div>'+
      '<h3 class="sub-header">RALLY-TAKTIK</h3>'+
      '<div class="mortem-flow">'+
        '<div class="mortem-flow-item"><div class="mortem-mini">SCHRITT 1</div><strong>4 Rallys starten</strong><p>Alle vier Rally-Leader starten ihre Rally möglichst gleichzeitig.</p></div>'+
        '<div class="mortem-flow-item"><div class="mortem-mini">SCHRITT 2</div><strong>Alle 4 joinen</strong><p>Jeder Spieler nutzt 4 Märsche und joint jede Rally genau einmal.</p></div>'+
        '<div class="mortem-flow-item"><div class="mortem-mini">SCHRITT 3</div><strong>Angriff</strong><p>Kurze Wege sorgen dafür, dass alle Rallys schneller gefüllt und abgeschickt werden.</p></div>'+
        '<div class="mortem-flow-item"><div class="mortem-mini">SCHRITT 4</div><strong>Sofort neu</strong><p>Direkt die nächsten 4 Rallys starten. Möglichst keine Leerlaufzeit.</p></div>'+
      '</div>'+
      '<div class="divider"></div>'+
      '<h3 class="sub-header">WARUM DIE 4 LEADER ZUSAMMENSTEHEN</h3>'+
      '<div class="mortem-check">'+
        '<div class="callout"><strong>Extrem kurze Marschwege:</strong> Alle Rallys liegen fast am gleichen Ausgangspunkt.</div>'+
        '<div class="callout"><strong>Schneller volle Rallys:</strong> Jeder erreicht jede Rally ohne lange Umwege.</div>'+
        '<div class="callout"><strong>Einfache Orientierung:</strong> Niemand muss zwischen verschiedenen Seiten auswählen.</div>'+
        '<div class="callout"><strong>Alle 4 Märsche nutzbar:</strong> Jeder Spieler kann parallel alle vier Rallys bedienen.</div>'+
        '<div class="callout"><strong>Kompakte Allianz:</strong> Die gesamte Allianz kämpft als eine Gruppe statt verteilt.</div>'+
        '<div class="callout"><strong>Mehr Gesamtschaden:</strong> Weniger Leerlauf bedeutet mehr Rallys und damit mehr Schaden auf Mortem.</div>'+
      '</div>'+
      '<div class="divider"></div>'+
      '<h3 class="sub-header">TELEPORT-REGEL</h3>'+
      '<div class="mortem-steps">'+
        '<div class="mortem-step"><div class="mortem-step-num">P1</div><div class="mortem-step-title">Leader zuerst</div><p>Alle 4 Rally-Leader teleportieren sich zuerst links oberhalb von Mortem und stehen eng zusammen.</p></div>'+
        '<div class="mortem-step"><div class="mortem-step-num">P2</div><div class="mortem-step-title">Mitglieder danach</div><p>Danach teleportieren sich alle Allianzmitglieder rund um den Leader-Cluster.</p></div>'+
        '<div class="mortem-step"><div class="mortem-step-num">P3</div><div class="mortem-step-title">Keine Lücken</div><p>Bitte keine großen freien Plätze in der Nähe der Leader lassen – jeder freie Platz verlängert fremde Laufwege.</p></div>'+
      '</div>'+
      '<div class="divider"></div>'+
      '<h3 class="sub-header">KURZREGEL FÜR ALLE</h3>'+
      '<div class="mortem-check">'+
        '<div class="callout fire"><strong>4 Rally-Leader</strong> links oberhalb von Mortem.</div>'+
        '<div class="callout gold"><strong>Alle anderen</strong> teleportieren sich eng außen herum.</div>'+
        '<div class="callout green"><strong>Wir starten 4 Rallys gleichzeitig.</strong></div>'+
        '<div class="callout blue"><strong>Jeder nutzt 4 Märsche</strong> – 1 Marsch pro Rally.</div>'+
        '<div class="callout"><strong>Immer alle 4 Rallys joinen.</strong></div>'+
        '<div class="callout"><strong>Kurze Wege = mehr Rallys = mehr Gesamtschaden.</strong></div>'+
      '</div>'+
    '</div>';
  }

  var topTabs=document.querySelector('.top-tabs');
  var arenaTopBtn=topTabs?Array.from(topTabs.querySelectorAll('.top-tab-btn')).find(function(btn){return (btn.getAttribute('onclick')||'').indexOf("'arena'")!==-1;}):null;
  if(topTabs&&!topTabs.querySelector('[onclick*="\'mortem\'"]')){
    var mortemBtn=document.createElement('button');
    mortemBtn.className='top-tab-btn';
    mortemBtn.setAttribute('onclick',"showTop('mortem',this)");
    mortemBtn.innerHTML='🧟 MORTEM-ABWEHR';
    if(arenaTopBtn&&arenaTopBtn.nextSibling){
      topTabs.insertBefore(mortemBtn,arenaTopBtn.nextSibling);
    }else{
      topTabs.appendChild(mortemBtn);
    }
  }

  var mortemPage=document.getElementById('mortem');
  if(!mortemPage){
    mortemPage=document.createElement('div');
    mortemPage.id='mortem';
    mortemPage.className='top-page';
    mortemPage.innerHTML=mortemSection();
    var arenaPageNode=document.getElementById('arena');
    if(arenaPageNode&&arenaPageNode.nextSibling){
      arenaPageNode.parentNode.insertBefore(mortemPage,arenaPageNode.nextSibling);
    }else if(arenaPageNode&&arenaPageNode.parentNode){
      arenaPageNode.parentNode.appendChild(mortemPage);
    }
  }else{
    mortemPage.innerHTML=mortemSection();
  }
})();
