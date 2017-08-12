'use strict';
// БАГ. Пройти с первого на второй, и обратно - нет первого слайда
// Cannot read property 'style' of undefined   line 90
var currentSlide     = 0;
var prevSlideItem    = 0;
var sliderWidth      = getComputedStyle(document.getElementsByClassName('slider')[0]).width;
var slides           = document.getElementsByClassName('slide');
var computedSlides   = getComputedStyle(slides[0]);
var slidesTransition = computedSlides.transitionDuration;
var animateDuration  = parseFloat(slidesTransition) * 1000;
var slidesNumber     = slides.length;
var inners           = document.querySelectorAll('.slider .navigation .inner');
var isActiveItem;
var goToProcess = 0;
var status = 1;
// Что-то неизведанное для меня, но работает
// var divs = Array.prototype.slice.call(document.querySelectorAll('.slider .navigation .out-box'));
// divs.forEach((div, i)=>div.addEventListener('click', function(){
//   goToNavItem(i);
// }))

function goToNavItem(n) { // (2) - 3 слайд
  console.log(prevSlideItem);

  currentSlide = n; // 3

  if (goToProcess) return false;
  goToProcess = 1;

  if (currentSlide == prevSlideItem) {
    goToProcess = 0;
    return false;
  }

  slides[prevSlideItem].style.left = sliderWidth;
  slides[currentSlide].style.opacity = '1';

  setTimeout(function() {
    slides[prevSlideItem].style.opacity = '0';
  },animateDuration + 50); // + 50 

  setTimeout(function() {
    slides[prevSlideItem].style.left = '0px';
    prevSlideItem = currentSlide;
    goToProcess   = 0;
  },animateDuration * 2); // * 2

  setActiveItem();
} // END goToNavItem()

initialSlides();
nextSlide();
prevSlide();
setSliderNavPosition();

function initialSlides() {
  var slides = document.getElementsByClassName('slide');
  var slidesNumber = slides.length;

  var i = 0;
  for (; i < slidesNumber; i++) {
    if (i != 0) {
      slides[i].style.zIndex = '' + (400 - i);
      slides[i].style.opacity = '0';
    }
  }

  slides[0].style.zIndex = '500'
}

function nextSlide() {
  var nextSlideButton  = document.getElementsByClassName('next-slide')[0];
  inners[currentSlide].className += ' ' + 'active-inner';

  nextSlideButton.onclick = function () {
    // Проверяем, происходит ли обработка события, чтобы не было наложения анимаций.
    if (this.proc) return false;
    this.proc = 1

    currentSlide++;

    if (currentSlide > slidesNumber - 1)
      currentSlide = 0;

    if (currentSlide !== 0) {
      slides[currentSlide - 1].style.left = sliderWidth;
      slides[currentSlide].style.opacity = '1';

      setTimeout(function() {
        slides[currentSlide - 1].style.opacity = '0';
      },animateDuration + 50); // + 50 

      setTimeout(function() {
        slides[currentSlide - 1].style.left = '0px';
        nextSlideButton.proc = 0;
      },animateDuration * 2); // * 2

      prevSlideItem = currentSlide - 1;

    } else {
        slides[slidesNumber - 1].style.left = sliderWidth;
        slides[currentSlide].style.opacity = '1';

        setTimeout(function() {
        slides[slidesNumber - 1].style.opacity = '0';
      },animateDuration + 50); // + 50

      setTimeout(function() {
        slides[slidesNumber - 1].style.left = '0px';
        currentSlide
        nextSlideButton.proc = 0;
      },animateDuration * 2); // * 2

      prevSlideItem = slidesNumber - 1;
    }

    setActiveItem()
  };
}

function prevSlide() {
  var prevSlideButton  = document.getElementsByClassName('prev-slide')[0];

  prevSlideButton.onclick = function () {
    // Проверяем, происходит ли обработка события, чтобы не было наложения анимаций.
    if (this.proc) return false;
    this.proc = 1;

    currentSlide--;

    if (currentSlide < 0) {
      currentSlide = slidesNumber - 1; // последний слайд (3)
      slides[0].style.left = '-' + sliderWidth;
      slides[currentSlide].style.opacity = '1';

      setTimeout(function() {
        slides[0].style.opacity = '0';
      },animateDuration);

      setTimeout(function() {
        slides[0].style.left = '0px';
        prevSlideButton.proc = 0;
      },animateDuration * 2);

      prevSlideItem = 0;

    } else {
        slides[currentSlide + 1].style.left = '-' + sliderWidth;
        slides[currentSlide].style.opacity = '1';

        setTimeout(function() {
          slides[currentSlide + 1].style.opacity = '0';
        },animateDuration);

        setTimeout(function() {
          slides[currentSlide + 1].style.left = '0px';
          prevSlideButton.proc = 0;
        },animateDuration * 2);

        prevSlideItem = currentSlide + 1;
    }

    setActiveItem();
  };
}

function setSliderNavPosition() {
  var nav = document.querySelector('.slider .navigation');
  var navWidth = parseFloat(getComputedStyle(nav).width);
  var slidersWidth = parseFloat(sliderWidth);

  nav.style.left = ( (slidersWidth / 2) - (navWidth / 2) ) + 'px';
}

function setActiveItem() {
      if ( inners[currentSlide].className.indexOf('active') != -1)
        isActiveItem = true;
      else
        isActiveItem = false;

      if (!isActiveItem) { // когда нет класса актив
        inners[currentSlide].className += ' ' + 'active-inner';
        inners[prevSlideItem].className = 'inner';
      }
}