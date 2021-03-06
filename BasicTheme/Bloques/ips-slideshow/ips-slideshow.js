class Slider {
  constructor(slideshow){
    this.counter = 1;
    this.timer = setInterval(() => this.autoSlide(), 8000);
    this.slides = slideshow.querySelectorAll('.ips-slideshow .ips-slide');
    slideshow.querySelector('.ips-slideshow .ips-slide-control-prev')
      .onclick = () => this.changeSlide(-1);
    slideshow.querySelector('.ips-slideshow .ips-slide-control-next')
      .onclick = () => this.changeSlide(1);
    this.slideMove(this.counter);
  }

  autoSlide(){
    this.counter += 1;
    this.slideMove(this.counter);
  }

  resetTimer(){
    clearInterval(this.timer);
    this.timer = setInterval(() => this.autoSlide(), 8000);
  }

  changeSlide(n){
    this.counter += n;
    this.slideMove(this.counter);
    this.resetTimer();
  }

  slideMove(n){
    for(let i = 0; i < this.slides.length; i++){
      this.slides[i].style.display = "none";
    }
    if(n > this.slides.length){
      this.counter = 1;
    }
    if(n < 1){
      this.counter = this.slides.length;
    }
    this.slides[this.counter-1].style.display = "block";
  }

};

function loadSliders() {
  const slideshow = document.querySelectorAll('.ips-slideshow');
  slideshow.forEach((sItem) => {
    sItem.setAttribute("slideAction",new Slider(sItem));
  });
}

loadSliders();