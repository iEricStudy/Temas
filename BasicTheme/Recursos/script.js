window.addEventListener('load', init());

function init() {
  window.onresize = setScreenHeight;
  setScreenHeight();
  loadSliders();
}

  //GET HEIGHT
  function setScreenHeight() {
    let screenHeight = document.querySelector("header") ?
    window.innerHeight - document.querySelector("header").clientHeight :
    window.innerHeight;
    
    document.documentElement.style.setProperty("--screenHeight",screenHeight+'px');
  }

  // HEADER
  if(document.querySelector("header")) {
    const toggle = document.querySelector(".ips-nav-toggle");
    const links = document.querySelector(".ips-nav-list");

    toggle.onclick = () => {
      toggle.classList.toggle("ips-nav-activate");
      links.classList.toggle("ips-show-nav");
    };

    window.onclick = (e) => {
      if(e.target.closest("header") != null) return;

      if(toggle && toggle.classList.contains("ips-nav-activate")){
        toggle.classList.remove("ips-nav-activate");
        links.classList.remove("ips-show-nav");
      }
    };
  }

  function loadSliders() {
    const slideshow = document.querySelectorAll('.ips-slideshow');
    slideshow.forEach((sItem) => sItem.setAttribute("slideAction",new Slider(sItem)));
  }


// SLIDESHOW
class Slider {
  constructor(slideshow) {

    this.counter = 1;
    this.slides = slideshow.querySelectorAll('.ips-slideshow .ips-slide');

    if(this.slides.length > 1) {
      this.timer = setInterval(() => this.autoSlide(), 8000);
      slideshow.querySelector('.ips-slide-control-prev').onclick = () => this.changeSlide(-1);
      slideshow.querySelector('.ips-slide-control-next').onclick = () => this.changeSlide(1);
      this.slideMove(this.counter);
    }
    else {
      slideshow.querySelector('.ips-slide-control-prev').style.display = "none";
      slideshow.querySelector('.ips-slide-control-next').style.display = "none";
      slideshow.querySelector(".ips-slide-picture").style.animation = "none";
    }
  }

  autoSlide() {
    this.counter += 1;
    this.slideMove(this.counter);
  }

  resetTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.autoSlide(), 8000);
  }

  changeSlide(n) {
    this.counter += n;
    this.slideMove(this.counter);
    this.resetTimer();
  }

  slideMove(n) {
    for(let i = 0; i < this.slides.length; i++)
      this.slides[i].style.display = "none";

    this.counter = (n > this.slides.length) ? this.counter = 1 : void(0);
    this.counter= (n < 1) ? this.slides.length : void(0);
      
    this.slides[this.counter-1].style.display = "block";
  }

};