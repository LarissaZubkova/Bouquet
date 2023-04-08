import AbstractView from '../framework/view/abstract-view.js';

function getAuthor(index, authorPhoto) {
  return (index === 0) ? `Автор  фотографии: ${authorPhoto}` : '';
}

function getSliderImages(images, authorPhoto) {
  return images.map((image, index) => `<div class="image-slides-list__item swiper-slide">
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
         <div class="image-slides-list swiper-wrapper">${getSliderImages(images, authorPhoto)}</div>
         <button class="btn-round btn-round--to-left image-slider__button image-slider__button--prev" type="button">
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
  #handleModalClose = null;

  constructor({product, onModalClose}){
    super();
    this.#product = product;
    this.#handleModalClose = onModalClose;
    document.querySelector('.modal-product__btn-close').addEventListener('click', this.#modalCloseHandler);
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
  }
}
