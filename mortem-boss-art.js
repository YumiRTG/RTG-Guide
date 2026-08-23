(function(){
  function applyMortemArt(){
    var boss=document.querySelector('#mortem .me-boss img');
    if(!boss)return;
    boss.src='assets/mortem/mortem-boss.svg?v=20260823-1417';
    boss.alt='Mortem — two-headed biohazard mutant';
    boss.style.objectFit='cover';
    boss.style.objectPosition='center';
    boss.style.background='#08100b';

    var wrap=boss.closest('.me-boss');
    if(wrap){
      wrap.style.background='radial-gradient(circle at 50% 45%,rgba(63,125,79,.28),rgba(8,12,9,.9) 72%)';
      wrap.style.boxShadow='0 0 0 1px rgba(111,231,139,.15),0 0 38px rgba(64,170,93,.28)';
    }
  }

  applyMortemArt();
  setTimeout(applyMortemArt,120);
  setTimeout(applyMortemArt,600);
  setTimeout(applyMortemArt,1500);
})();
