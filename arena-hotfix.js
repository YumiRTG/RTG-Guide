(function(){
  var arena=document.getElementById('arena');
  if(arena){
    var tabBar=arena.querySelector('.section-tabs');
    if(tabBar){
      var buttons=Array.from(tabBar.querySelectorAll('.sec-tab-btn'));
      buttons.forEach(function(btn){
        var click=btn.getAttribute('onclick')||'';
        if(click.indexOf("'f2p'")!==-1){
          btn.remove();
        }else if(click.indexOf("'p2w'")!==-1){
          btn.innerHTML='🏆 BEST ARENA SETUP';
          btn.classList.add('active');
        }else{
          btn.classList.remove('active');
        }
      });
    }

    var f2p=document.getElementById('arena-f2p');
    if(f2p)f2p.remove();

    var best=document.getElementById('arena-p2w');
    if(best){
      best.classList.add('active');
      var title=best.querySelector('.section-title');
      if(title)title.textContent='S5 BEST ARENA SETUP';
      var sub=best.querySelector('.section-sub');
      if(sub)sub.textContent='// CURRENT BEST ARENA TEAM //';
      var callout=best.querySelector('.callout.gold');
      if(callout)callout.innerHTML='<strong>Current best Arena setup:</strong> Front: <strong>Jake + Sheva</strong>. Back: <strong>Piers + BSAA Chris + Excella</strong>.';
    }

    var lineup=document.getElementById('arena-lineup');
    if(lineup){
      var lineupSub=lineup.querySelector('.section-sub');
      if(lineupSub)lineupSub.textContent='// 2 FRONT · 3 BACK //';
      var lineupCallout=lineup.querySelector('.callout.blue');
      if(lineupCallout)lineupCallout.innerHTML='<strong>Best formation:</strong> Jake + Sheva in front. Piers + BSAA Chris + Excella in back.';
    }
  }

  var callouts=document.querySelectorAll('.callout.gold');
  for(var i=0;i<callouts.length;i++){
    if(callouts[i].textContent.indexOf('Best Rally Leaders')!==-1 || callouts[i].textContent.indexOf('Best Rally Leader')!==-1){
      callouts[i].innerHTML='<strong>🏆 Best Rally Leader — Sherry:</strong> Use Sherry as Rally Leader for offensive rallies.';
    }
  }
})();
