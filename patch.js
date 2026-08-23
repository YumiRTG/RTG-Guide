(function(){
  function tierRow(label){
    var rows=document.querySelectorAll('#heroes-tierlist .tier-row');
    for(var i=0;i<rows.length;i++){
      var tier=rows[i].querySelector('.tier-label');
      if(tier&&tier.textContent.trim()===label)return rows[i];
    }
    return null;
  }

  function heroCard(img,name,season,seasonClass,stat,tagline){
    return '<div class="char-card">'+
      '<img class="char-card-img" src="'+img+'" alt="'+name+'">'+
      '<div class="char-card-body">'+
      '<div class="char-name">'+name+' <span class="season-badge '+seasonClass+'">'+season+'</span></div>'+
      '<div class="char-role">'+season+' · NEW HERO</div>'+
      '<div class="char-stat">'+stat+'% MAX STATS</div>'+
      '<div class="char-tagline">'+tagline+'</div>'+
      '</div></div>';
  }

  function moveHero(name,targetTier){
    var target=tierRow(targetTier); if(!target)return;
    var cards=document.querySelectorAll('#heroes-tierlist .char-card');
    for(var i=0;i<cards.length;i++){
      var n=cards[i].querySelector('.char-name');
      if(n&&n.textContent.trim().toUpperCase().indexOf(name.toUpperCase())===0){
        target.querySelector('.tier-cards').appendChild(cards[i]);
        return;
      }
    }
  }

  document.head.insertAdjacentHTML('beforeend','<style>.s4{background:rgba(155,89,182,.2)!important;color:#c39bd3!important;border:1px solid rgba(155,89,182,.35)!important}.s5{background:rgba(236,64,122,.2)!important;color:#ff80ab!important;border:1px solid rgba(236,64,122,.35)!important}.badge.sss{background:rgba(236,64,122,.28);color:#ff80ab}.tier-label.sss{background:rgba(236,64,122,.18);color:#ff80ab;border-right:3px solid #ff4081}</style>');

  var headerSeason=document.querySelector('header p');
  if(headerSeason&&headerSeason.textContent.indexOf('FULL STRATEGY COMMAND CENTER')!==-1){
    headerSeason.textContent='FULL STRATEGY COMMAND CENTER — S1 · S2 · S3 · S4 · S5';
  }
  var updated=document.querySelector('header .header-sub');
  if(updated)updated.textContent='// UPDATED AUGUST 2026 //';

  var tierPage=document.getElementById('heroes-tierlist');
  if(tierPage){
    var sub=tierPage.querySelector('.section-sub');
    if(sub)sub.textContent='// ALL SEASONS · S1 · S2 · S3 · S4 · S5 //';
    var callout=tierPage.querySelector('.callout.gold');
    if(callout)callout.innerHTML='<strong>Stat ceilings:</strong> S5 = 444% · S4 = 370% · S3 = 290% · S1 Leon = 260% · All S2 = 240% · Other S1 = 200%. Skills &amp; weapon synergy matter as much as raw stats.';

    var ss=tierRow('SS');
    if(ss&&!tierRow('SSS')){
      ss.insertAdjacentHTML('beforebegin','<div class="tier-row"><div class="tier-label sss">SSS</div><div class="tier-cards">'+heroCard('assets/heroes/s5-excella.jpg','EXCELLA GIONNE','S5','s5',444,'Season 5 powerhouse — SSS tier.')+'</div></div>');
    }

    ss=tierRow('SS');
    if(ss){
      ss.querySelector('.tier-cards').insertAdjacentHTML('afterbegin',
        heroCard('assets/heroes/s5-sheva.jpg','SHEVA ALOMAR','S5','s5',444,'SS-tier Season 5 hero.')+
        heroCard('assets/heroes/s5-chris.jpg','BSAA CHRIS','S5','s5',444,'SS-tier Season 5 hero.')
      );
    }

    var s=tierRow('S');
    if(s)s.querySelector('.tier-cards').insertAdjacentHTML('afterbegin',heroCard('assets/heroes/s4-jake.jpg','JAKE MULLER','S4','s4',370,'S-tier Season 4 hero.'));

    var a=tierRow('A');
    if(a)a.querySelector('.tier-cards').insertAdjacentHTML('afterbegin',
      heroCard('assets/heroes/s4-sherry.jpg','SHERRY BIRKIN','S4','s4',370,'A-tier Season 4 hero.')+
      heroCard('assets/heroes/s4-piers.jpg','PIERS NIVANS','S4','s4',370,'A-tier Season 4 hero.')
    );

    moveHero('CARLOS','A');
    moveHero('BILLY','B');
  }

  var comparison=document.getElementById('heroes-comparison');
  if(comparison){
    var compSub=comparison.querySelector('.section-sub');
    if(compSub)compSub.textContent='// S1 vs S2 vs S3 vs S4 vs S5 HEAD-TO-HEAD //';
    function statRow(name){
      var names=comparison.querySelectorAll('.stat-ov-name');
      for(var i=0;i<names.length;i++)if(names[i].textContent.trim()===name)return names[i].closest('.stat-overview-row');
      return null;
    }
    function setWidth(name,width){var row=statRow(name);if(row){var bar=row.querySelector('.stat-bar-fill');if(bar)bar.style.width=width+'%';}}
    setWidth('LEON',59);setWidth('S1 OTHER',45);setWidth('ALL S2',54);setWidth('ALL S3',65);
    var s3=statRow('ALL S3');
    if(s3&&!statRow('ALL S4')){
      s3.insertAdjacentHTML('afterend',
        '<div class="stat-overview-row"><img class="stat-ov-img" src="assets/heroes/s4-piers.jpg" alt="Piers Nivans"><span class="stat-ov-name">ALL S4</span><span class="season-badge s4">S4</span><div style="flex:1;margin:0 10px"><div class="stat-bar"><div class="stat-bar-fill" style="width:83%"></div></div></div><span style="font-family:Share Tech Mono,monospace;color:var(--pale-gold);font-size:12px;flex-shrink:0">370%</span></div>'+
        '<div class="stat-overview-row"><img class="stat-ov-img" src="assets/heroes/s5-excella.jpg" alt="Excella Gionne"><span class="stat-ov-name">ALL S5</span><span class="season-badge s5">S5</span><div style="flex:1;margin:0 10px"><div class="stat-bar"><div class="stat-bar-fill" style="width:100%"></div></div></div><span style="font-family:Share Tech Mono,monospace;color:var(--pale-gold);font-size:12px;flex-shrink:0">444%</span></div>'
      );
    }
  }

  var ashleyImg='https://i.ibb.co/TBtDtM1w/Screenshot-20260329-085345-Resident-Evil-Survival-Unit.jpg';
  var arenaHeroes=[
    {name:'JAKE MULLER',pos:'FRONT LEFT',img:'assets/heroes/s4-jake.jpg',season:'S4',cls:'s4',stat:'370%',role:'Frontline'},
    {name:'SHEVA ALOMAR',pos:'FRONT RIGHT',img:'assets/heroes/s5-sheva.jpg',season:'S5',cls:'s5',stat:'444%',role:'Frontline'},
    {name:'PIERS NIVANS',pos:'BACK LEFT',img:'assets/heroes/s4-piers.jpg',season:'S4',cls:'s4',stat:'370%',role:'Backline'},
    {name:'ASHLEY GRAHAM',pos:'BACK CENTER',img:ashleyImg,season:'S3',cls:'s3',stat:'290%',role:'Support'},
    {name:'EXCELLA GIONNE',pos:'BACK RIGHT',img:'assets/heroes/s5-excella.jpg',season:'S5',cls:'s5',stat:'444%',role:'Backline'}
  ];

  function arenaSlot(h){
    return '<div class="team-slot"><img class="team-slot-img" src="'+h.img+'" alt="'+h.name+'"><div class="team-slot-body"><div class="pos-label">'+h.pos+'</div><div class="slot-name">'+h.name+' <span class="season-badge '+h.cls+'">'+h.season+'</span></div><div class="slot-role">'+h.role+'</div><div class="slot-desc">'+h.stat+' max stats</div></div></div>';
  }
  function arenaFormation(){
    return '<div style="background:var(--panel2);border:1px solid var(--border);border-radius:10px;padding:20px;margin:16px 0">'+
      '<div style="font-family:Share Tech Mono,monospace;font-size:10px;letter-spacing:3px;color:var(--dim);text-align:center;margin-bottom:16px">ENEMY ▲ ▲ ▲</div>'+
      '<div style="font-family:Share Tech Mono,monospace;font-size:10px;letter-spacing:2px;color:var(--crimson);text-align:center;margin-bottom:8px">— FRONT ROW —</div>'+
      '<div class="formation-bar"><div class="formation-pos">JAKE<span class="fp-sub">FRONT LEFT</span></div><div class="formation-pos">SHEVA<span class="fp-sub">FRONT RIGHT</span></div></div>'+
      '<div style="font-family:Share Tech Mono,monospace;font-size:10px;letter-spacing:2px;color:var(--gold);text-align:center;margin:12px 0 8px">— BACK ROW —</div>'+
      '<div class="formation-bar"><div class="formation-pos">PIERS<span class="fp-sub">BACK LEFT</span></div><div class="formation-pos">ASHLEY<span class="fp-sub">BACK CENTER</span></div><div class="formation-pos">EXCELLA<span class="fp-sub">BACK RIGHT</span></div></div>'+
      '<div style="font-family:Share Tech Mono,monospace;font-size:10px;letter-spacing:3px;color:var(--dim);text-align:center;margin-top:16px">▼ YOUR BASE</div></div>';
  }
  function arenaPage(title,subtitle){
    var cards='';for(var i=0;i<arenaHeroes.length;i++)cards+=arenaSlot(arenaHeroes[i]);
    return '<div class="page-inner"><div class="section-title">'+title+'</div><div class="section-sub">'+subtitle+'</div>'+
      '<div class="callout gold"><strong>Current best Arena setup:</strong> F2P and P2W use the same five heroes. Front: <strong>Jake + Sheva</strong>. Back: <strong>Piers + Ashley + Excella</strong>.</div>'+
      '<h3 class="sub-header">FORMATION</h3>'+arenaFormation()+'<div class="team-grid">'+cards+'</div></div>';
  }

  var f2p=document.getElementById('arena-f2p');
  if(f2p)f2p.innerHTML=arenaPage('S5 F2P BEST SETUP','// SAME BEST ARENA TEAM AS P2W //');
  var p2w=document.getElementById('arena-p2w');
  if(p2w)p2w.innerHTML=arenaPage('S5 P2W BEST SETUP','// SAME BEST ARENA TEAM AS F2P //');
  var lineup=document.getElementById('arena-lineup');
  if(lineup)lineup.innerHTML='<div class="page-inner"><div class="section-title">LINEUP — BEST ARENA FORMATION</div><div class="section-sub">// F2P = P2W · 2 FRONT · 3 BACK //</div><div class="callout blue"><strong>Best formation:</strong> Jake + Sheva in front. Piers + Ashley + Excella in back. There is currently no separate F2P/P2W lineup.</div>'+arenaFormation()+'</div>';

  var footer=document.querySelector('footer');
  if(footer)footer.innerHTML=footer.innerHTML.replace('COMMUNITY FULL GUIDE · S1 / S2 / S3','COMMUNITY FULL GUIDE · S1 / S2 / S3 / S4 / S5');
})();
