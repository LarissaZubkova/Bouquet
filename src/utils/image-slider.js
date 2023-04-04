class ImageSlider {
  constructor(sliderElement) {
    this.sliderElement = sliderElement;
  }

  init() {
    if (document.querySelector(this.sliderElement)) {
      this.slider = new Swiper(this.sliderElement, {//eslint-disable-line
        slidesPerView: 1,
        spaceBetween: 100,
        speed: 700,
        navigation: {
          nextEl: '.image-slider__button--next',
          prevEl: '.image-slider__button--prev',
        },
        a11y: {
          prevSlideMessage: 'Предыдущий слайд',
          nextSlideMessage: 'Следующий слайд',
        },
      });
    }
  }
}

export {ImageSlider};
