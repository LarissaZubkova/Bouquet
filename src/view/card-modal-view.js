import AbstractView from '../framework/view/abstract-view.js';

function createCardModalTemplate() {
  return `<div class="modal modal--preload modal--product" data-modal="product-card">
          <div class="modal__wrapper">
            <div class="modal__overlay" data-close-modal></div>
            <div class="modal__content">
              <div class="modal-product">
                <button class="btn-close modal-product__btn-close" type="button" data-close-modal aria-label="Закрыть">
                  <svg width="55" height="56" aria-hidden="true">
                    <use xlink:href="#icon-close-big"></use>
                  </svg>
                </button>
                <svg class="modal-product__btn-close modal-product__loader" width="56" height="56" aria-hidden="true">
                  <use xlink:href="#icon-loader"></use>
                </svg>
                <div class="image-slider swiper modal-product__slider">
                  <div class="image-slides-list swiper-wrapper">
                    <div class="image-slides-list__item swiper-slide">
                      <div class="image-slide">
                        <picture>
                          <source type="image/webp" srcset="img/slides/slide-01.webp, img/slides/slide-01@2x.webp 2x"><img src="img/slides/slide-01.jpg" srcset="img/slides/slide-01@2x.jpg 2x" width="1274" height="1789" alt="">
                        </picture><span class="image-author image-slide__author">Автор  фотографии:  «Christie Kim»</span>
                      </div>
                    </div>
                    <div class="image-slides-list__item swiper-slide">
                      <div class="image-slide">
                        <picture>
                          <source type="image/webp" srcset="img/slides/slide-02.webp, img/slides/slide-02@2x.webp 2x"><img src="img/slides/slide-02.jpg" srcset="img/slides/slide-02@2x.jpg 2x" width="1274" height="1789" alt="">
                        </picture>
                      </div>
                    </div>
                    <div class="image-slides-list__item swiper-slide">
                      <div class="image-slide">
                        <picture>
                          <source type="image/webp" srcset="img/slides/slide-03.webp, img/slides/slide-03@2x.webp 2x"><img src="img/slides/slide-03.jpg" srcset="img/slides/slide-03@2x.jpg 2x" width="1274" height="1789" alt="">
                        </picture>
                      </div>
                    </div>
                  </div>
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
                </div>
                <div class="product-description">
                  <div class="product-description__header">
                    <h3 class="title title--h2">Летнее настроение</h3><b class="price price--size-big">5&nbsp;800<span>Р</span></b>
                  </div>
                  <p class="text text--size-40">сочетание полевых и&nbsp;садовых цветов: розы, львиный зев, чертополох, тюльпаны и&nbsp;эустома</p>
                  <button class="btn btn--outlined btn--full-width product-description__button" type="button" data-focus>отложить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>`;
}

export default class CardModalView extends AbstractView {
  #card = null;

  constructor({card}){
    super();
    this.#card = card;
  }

  get template() {
    return createCardModalTemplate(this.#card);
  }
}
