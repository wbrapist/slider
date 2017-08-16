window.addEventListener('load', function(){
  'use strict';

  var focusOnSlider     = false;
  var goToNavItemStatus = -1;
  var currentSlide      = 0;
  var prevSlideItem     = 0;
  var slider            = document.getElementsByClassName('slider')[0];
  var sliderWidth       = window.getComputedStyle(document.getElementsByClassName('slider')[0]).width;
  var slides            = document.getElementsByClassName('slide');
  var nextSlideButton   = document.getElementsByClassName('next-slide')[0];
  var prevSlideButton   = document.getElementsByClassName('prev-slide')[0];
  var computedSlides    = getComputedStyle(slides[0]);
  var slidesTransition  = computedSlides.transitionDuration;
  var animateDuration   = parseFloat(slidesTransition) * 1000;
  var slidesNumber      = slides.length;
  var nav               = document.querySelector('.slider .navigation');
  

  addNavigation();
  var inners            = document.querySelectorAll('.slider .navigation .inner');
  initialSliderSets();
  setSliderNavPosition();

  function addNavigation() {
    var content = '';

    for (var i = 0; i < slidesNumber; i++)
      content += '<div class="out-box"><div class="inner"></div></div>';

    nav.innerHTML = content;
  }

  setInterval(function() {
    if (focusOnSlider) return false;

    currentSlide++;

    nextSlide();
    setActiveItem();
  }, 5000);

  var divs = Array.prototype.slice.call(document.querySelectorAll('.slider .navigation .out-box'));
  divs.forEach((div, i)=>div.addEventListener('click', function(){
    goToNavItemStatus++;

    if (goToNavItemStatus == 0)
      goToNavItemStatus = -1;
    else
      return false;

    goToNavItem(i);
    setActiveItem();
  }));

  function goToNavItem(slideNumber) {  
    prevSlideItem = currentSlide;
    currentSlide = slideNumber;

    if (prevSlideItem == currentSlide)
      return false;

    slides[prevSlideItem].style.opacity = '0';
    slides[currentSlide].style.opacity = '1';

    setTimeout(function() {
      goToNavItemStatus = -1;
    },animateDuration + 50);
  }

  slider.addEventListener('mouseover', function() {
    focusOnSlider = true;
  });

  slider.addEventListener('mouseout', function() {
    focusOnSlider = false;
  });

  nextSlideButton.onclick = function () {
    if (this.proc) return false;
    this.proc = 1;

    currentSlide++;

    nextSlide();
    setActiveItem();
  };

  prevSlideButton.onclick = function () {
    if (this.proc) return false;
    this.proc = 1;

    currentSlide--;

    prevSlide();
    setActiveItem();
  };

  function initialSliderSets() {
    var slides = document.getElementsByClassName('slide');
    var slidesNumber = slides.length;

    for (var i = 0; i < slidesNumber; i++) {
      if (i != 0) {
        slides[i].style.zIndex = '' + (400 - i);
        slides[i].style.opacity = '0';
      }
    }

    slides[0].style.zIndex = '500'
    inners[currentSlide].className += ' ' + 'active-inner';
    slider.style.display = "block";
  }

  function nextSlide() {
    if (currentSlide > slidesNumber - 1)
      currentSlide = 0;

    if (currentSlide !== 0) {
      slides[currentSlide - 1].style.left = sliderWidth;
      slides[currentSlide - 1].style.opacity = '0';
      slides[currentSlide].style.opacity = '1';

      setTimeout(function() {
        slides[currentSlide - 1].style.opacity = '0';
      },animateDuration + 50);

      setTimeout(function() {
        slides[currentSlide - 1].style.left = '0px';
        nextSlideButton.proc = 0;
      },animateDuration * 2);

      prevSlideItem = currentSlide - 1;

    } else {
        slides[slidesNumber - 1].style.left = sliderWidth;
        slides[currentSlide].style.opacity = '1';

      setTimeout(function() {
        slides[slidesNumber - 1].style.opacity = '0';
      },animateDuration + 50);

      setTimeout(function() {
        slides[slidesNumber - 1].style.left = '0px';
        currentSlide
        nextSlideButton.proc = 0;
      },animateDuration * 2);

      prevSlideItem = slidesNumber - 1;
    }
  }

  function prevSlide() {
    if (currentSlide < 0) {
      currentSlide = slidesNumber - 1;
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
  }

  function setSliderNavPosition() {
    var navWidth = parseFloat(getComputedStyle(nav).width);
    var slidersWidth = parseFloat(sliderWidth);

    nav.style.left = ( (slidersWidth / 2) - (navWidth / 2) ) + 'px';

    var slider = document.getElementsByClassName('slider')[0];
    slider.style.display = "block";
  }

  function setActiveItem() {
      var isActiveItem;

      if ( inners[currentSlide].className.indexOf('active') != -1 )
        isActiveItem = true;
      else
        isActiveItem = false;

      if (!isActiveItem) {
        inners[currentSlide].className += ' ' + 'active-inner';
        inners[prevSlideItem].className = 'inner';
      }
  }
}); // END of LOAD-event
