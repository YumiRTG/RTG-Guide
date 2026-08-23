(function(){
  var source=null;
  var positions={YUMI:'0% 50%',TWEAK:'33.333% 50%',ELMEASTRO:'66.666% 50%',GEATAN:'100% 50%'};

  function applyPortraits(){
    if(!source)return;
    document.querySelectorAll('.me-leader').forEach(function(leader){
      var label=leader.querySelector('label');
      if(!label)return;
      var name=(label.textContent||'').trim().toUpperCase();
      if(!(name in positions))return;

      var custom=leader.querySelector('.me-custom-pic');
      if(custom)custom.remove();

      var img=leader.querySelector(':scope > img') || leader.querySelector('img');
      if(!img)return;

      img.removeAttribute('alt');
      if(img.getAttribute('src')!==source)img.setAttribute('src',source);
      Object.assign(img.style,{
        position:'absolute',
        inset:'0',
        width:'100%',
        height:'100%',
        maxWidth:'none',
        display:'block',
        opacity:'1',
        visibility:'visible',
        objectFit:'cover',
        objectPosition:positions[name],
        borderRadius:'50%',
        background:'#111',
        zIndex:'2',
        boxShadow:'0 0 0 2px rgba(77,166,223,.70),0 0 22px rgba(54,150,216,.44),0 10px 22px rgba(0,0,0,.45)'
      });
      label.style.zIndex='4';
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

  function loadPortraits(){
    fetch('assets/mortem/leader-sprite.b64?v=20260823-1911',{cache:'no-store'})
      .then(function(r){if(!r.ok)throw new Error('portrait data');return r.text();})
      .then(function(b64){
        b64=(b64||'').trim();
        if(b64.length<10000 || b64.indexOf('/9j/')!==0)throw new Error('invalid portrait data');
        source='data:image/jpeg;base64,'+b64;
        applyPortraits();
        [100,300,700,1500,3000].forEach(function(ms){setTimeout(applyPortraits,ms);});
      })
      .catch(function(){/* keep original hero images instead of broken alt text */});
  }

  selectMortem();
  loadPortraits();

  var observer=new MutationObserver(function(){applyPortraits();});
  observer.observe(document.documentElement,{childList:true,subtree:true});
})();
