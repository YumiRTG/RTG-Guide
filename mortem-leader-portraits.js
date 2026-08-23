(function(){
  var sprite='assets/mortem/leader-sprite.jpg?v=20260823-1256';
  var positions={YUMI:'0% 50%',TWEAK:'33.333% 50%',ELMEASTRO:'66.666% 50%',GEATAN:'100% 50%'};

  function applyPortraits(){
    document.querySelectorAll('.me-leader').forEach(function(leader){
      var label=leader.querySelector('label');
      if(!label)return;
      var name=(label.textContent||'').trim().toUpperCase();
      if(!positions[name])return;

      var old=leader.querySelector('img');
      if(old)old.style.display='none';

      var pic=leader.querySelector('.me-custom-pic');
      if(!pic){
        pic=document.createElement('span');
        pic.className='me-custom-pic';
        leader.insertBefore(pic,label);
      }

      Object.assign(pic.style,{
        position:'absolute',
        inset:'0',
        width:'100%',
        height:'100%',
        display:'block',
        borderRadius:'50%',
        backgroundImage:'url("'+sprite+'")',
        backgroundRepeat:'no-repeat',
        backgroundSize:'400% 100%',
        backgroundPosition:positions[name],
        backgroundColor:'#111',
        boxShadow:'0 0 0 2px rgba(77,166,223,.65),0 0 22px rgba(54,150,216,.42),0 10px 22px rgba(0,0,0,.45)'
      });
    });
  }

  function selectMortem(){
    var page=document.getElementById('mortem');
    var tabs=document.querySelector('.top-tabs');
    if(!page||!tabs)return;
    var mortemTab=Array.from(tabs.querySelectorAll('.top-tab-btn')).find(function(btn){
      return (btn.getAttribute('onclick')||'').indexOf("'mortem'")!==-1;
    });
    if(!mortemTab)return;

    document.querySelectorAll('.top-page').forEach(function(p){p.classList.remove('active');});
    document.querySelectorAll('.top-tab-btn').forEach(function(b){b.classList.remove('active');});
    page.classList.add('active');
    mortemTab.classList.add('active');
    tabs.insertBefore(mortemTab,tabs.firstElementChild);
  }

  function boot(){
    applyPortraits();
    selectMortem();
  }

  boot();
  setTimeout(boot,100);
  setTimeout(boot,500);
  setTimeout(applyPortraits,1500);
})();
