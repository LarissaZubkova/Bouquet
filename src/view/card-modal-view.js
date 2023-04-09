import AbstractView from '../framework/view/abstract-view.js';

function getAuthor(index, authorPhoto) {
  return (index === 0) ? `Автор  фотографии: ${authorPhoto}` : '';
}

function getSliderImages(images, authorPhoto) {
  return images.map((image, index) => `<div class="image-slides-list__item swiper-slide" id="${index}">
        <div class="image-slide">
          <picture>
            <source type="image/webp" srcset="${image} 2x">
            <img src="${image}" srcset="${image} 2x" width="1274" height="1789" alt="">
          </picture><span class="image-author image-slide__author"> ${getAuthor(index, authorPhoto)}</span>
        </div>
      </div>`
  ).join('');
}

function createCardModalTemplate(product) {
  if (product) {
    const {images, authorPhoto} = product;
    return `<div class="image-slider swiper modal-product__slider">
         <div class="image-slides-list swiper-wrapper" style="transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;">${getSliderImages(images, authorPhoto)}</div>
         <button class="btn-round btn-round--to-left image-slider__button image-slider__button--prev" type="button" disabled>
           <svg width="80" height="85" aria-hidden="true" focusable="false">
             <use xlink:href="#icon-round-button"></use>
           </svg>
         </button>
         <button class="btn-round btn-round--to-right image-slider__button image-slider__button--next" type="button">
           <svg width="80" height="85" aria-hidden="true" focusable="false">
             <use xlink:href="#icon-round-button"></use>
           </svg>
         </button>
       </div>`;
  }
}

export default class CardModalView extends AbstractView {
  #product = null;
  #btnLeft = null;
  #btnRight = null;
  #imageNamber = 1;
  #positin = 0;
  #sliderElement = null;
  #handleModalClose = null;

  constructor({product, onModalClose}){
    super();
    this.#product = product;
    this.#handleModalClose = onModalClose;

    this.#btnLeft = this.element.querySelector('.btn-round--to-left');
    this.#btnRight = this.element.querySelector('.btn-round--to-right');
    this.#sliderElement = this.element.querySelector('.image-slides-list');
    document.querySelector('.modal-product__btn-close').addEventListener('click', this.#modalCloseHandler);

    if (this.#btnLeft) {
      this.#btnLeft.addEventListener('click', this.#btnLeftClickHandler);
    }
    if (this.#btnRight) {
      this.#btnRight.addEventListener('click', this.#btnRightClickHandler);
    }
  }

  get template() {
    return createCardModalTemplate(this.#product);
  }

  setProduct(product) {
    this.#product = product;
  }

  #modalCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleModalClose();
    document.querySelector('body').classList.remove('scroll-lock');
  };

  #btnLeftClickHandler = (evt) => {
    evt.preventDefault();
    console.log(this.#imageNamber);
    this.#imageNamber -= 1;

    if (this.#imageNamber >= 1) {
      this.#btnRight.removeAttribute('disabled');
      this.#sliderElement.style.transform = `translate3d(${this.#positin += 1030}px, 0px, 0px)`;
      this.#sliderElement.style.transitionDuration = '700ms';
    }
    if (this.#imageNamber === 1) {
      this.#btnLeft.setAttribute('disabled', 'disabled');
    }
  };

  #btnRightClickHandler = (evt) => {
    evt.preventDefault();
    console.log(this.#imageNamber);
    this.#imageNamber += 1;

    if (this.#imageNamber <= this.#product.images.length) {
      this.#btnLeft.removeAttribute('disabled');
      this.#sliderElement.style.transform = `translate3d(${this.#positin -= 1030}px, 0px, 0px)`;
      this.#sliderElement.style.transitionDuration = '700ms';
    }
    if (this.#imageNamber === this.#product.images.length) {
      this.#btnRight.setAttribute('disabled', 'disabled');
    }
  };
}
