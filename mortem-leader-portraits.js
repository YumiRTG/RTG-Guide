(function(){
  var sprite='assets/mortem/leader-sprite.jpg?v=20260823-1852';
  var offsets={YUMI:'0%',TWEAK:'-25%',ELMEASTRO:'-50%',GEATAN:'-75%'};

  function applyPortraits(){
    document.querySelectorAll('.me-leader').forEach(function(leader){
      var label=leader.querySelector('label');
      if(!label)return;
      var name=(label.textContent||'').trim().toUpperCase();
      if(!(name in offsets))return;

      var old=leader.querySelector(':scope > img');
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
        overflow:'hidden',
        borderRadius:'50%',
        background:'#111',
        boxShadow:'0 0 0 2px rgba(77,166,223,.65),0 0 22px rgba(54,150,216,.42),0 10px 22px rgba(0,0,0,.45)',
        zIndex:'1'
      });

      var img=pic.querySelector('img');
      if(!img){
        img=document.createElement('img');
        pic.appendChild(img);
      }
      if(img.getAttribute('src')!==sprite)img.setAttribute('src',sprite);
      img.setAttribute('alt',name+' profile');
      Object.assign(img.style,{
        position:'absolute',
        top:'0',
        left:'0',
        width:'400%',
        maxWidth:'none',
        height:'100%',
        display:'block',
        objectFit:'fill',
        borderRadius:'0',
        transform:'translateX('+offsets[name]+')',
        transformOrigin:'left top',
        boxShadow:'none'
      });

      label.style.zIndex='3';
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
  [100,300,700,1500,3000].forEach(function(ms){setTimeout(applyPortraits,ms);});

  var observer=new MutationObserver(function(){applyPortraits();});
  observer.observe(document.documentElement,{childList:true,subtree:true});
})();
