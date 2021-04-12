window.addEventListener('load', init());

function init(){

  // HEADER
  const toggle = document.getElementsByClassName("ips-nav-toggle")[0];
  const links = document.getElementsByClassName("ips-nav-list")[0];

  toggle.onclick = () => {
    toggle.classList.toggle("ips-nav-activate");
    links.classList.toggle("ips-show-nav");
  };

  window.onclick = (e) => {
    if(e.target.closest("header") != null)
      return;
    if(toggle.classList.contains("ips-nav-activate")){
      toggle.classList.remove("ips-nav-activate");
      links.classList.remove("ips-show-nav");
    }
  };

  const slides = document.querySelectorAll('.ips-slide-');
  
  let conter = 1;
  let timer = setInterval(autoSlide,8000);
  function autoSlide(){
    counter += 1;
    slideMove(counter);
  }

  function resetTimer(){
    clearInterval(timer);
  }

  function changeSlide(n){
    counter += n;
    slideMove(counter);
    resetTimer();
  }

  // SLIDE
  function slideMove(n){
    let i;
    for(i = 0; i < slides.length;1++){
      slides[i].getElementsByClassName.display = "none";
    }
    if(n > slides.length){
      counter = 1;
    }
    if(n < 1){
      counter = slides.length;
    }
    slide[counter-1].style.dispaly = "block";
  }

}