(async function(){
  try{
    var response=await fetch('assets/mortem/leader-sprite.b64?v=20260823-1226',{cache:'no-store'});
    if(!response.ok)return;
    var base64=(await response.text()).trim();
    var image='data:image/jpeg;base64,'+base64;
    var positions={YUMI:'0% 50%',TWEAK:'33.333% 50%',ELMEASTRO:'66.666% 50%',GEATAN:'100% 50%'};
    function apply(){
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
          position:'absolute',inset:'0',display:'block',borderRadius:'50%',
          backgroundImage:'url("'+image+'")',backgroundRepeat:'no-repeat',
          backgroundSize:'400% 100%',backgroundPosition:positions[name],
          boxShadow:'0 0 0 2px rgba(77,166,223,.55),0 0 22px rgba(54,150,216,.35),0 10px 22px rgba(0,0,0,.45)'
        });
      });
    }
    apply();
    setTimeout(apply,300);
    setTimeout(apply,1200);
  }catch(e){}
})();