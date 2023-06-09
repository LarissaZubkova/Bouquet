import AbstractView from '../framework/view/abstract-view.js';
import {getPrice} from '../utils/card.js';

function createHeaderCountTemplate(cart) {
  const {productCount, sum} = cart;

  return `<div class="header__container">
  <div class="header-count">
    <button class="header-count__btn" type="button">
      <svg width="60" height="47" aria-hidden="true">
        <use xlink:href="#icon-heart-header"></use>
      </svg>
      <span class="visually-hidden">закрыть</span>
    </button>
    <div class="header-count__count">
      <p class="text text--size-20 header-count__counter">${productCount ? productCount : 0}</p>
    </div>
    <div class="header-count__block">
      <p class="text text--size-20 header-count__text">сумма</p>
      <b class="price price--size-min header-count__price">
        ${getPrice(sum)}
        <span>Р</span>
      </b>
    </div>
  </div>
  </div>`;
}

export default class HeaderCountView extends AbstractView {
  #handleClick = null;
  #cart = null;
  #headerBtn = null;

  constructor({cart, onClick}) {
    super();
    this.#cart = cart;
    this.#handleClick = onClick;
    this.#headerBtn = this.element.querySelector('.header-count__btn');

    this.#headerBtn.addEventListener('click', this.#handleHeaderBtnClick);
  }

  get template() {
    return createHeaderCountTemplate(this.#cart);
  }

  #handleHeaderBtnClick = (evt) => {
    evt.preventDefault();
    this.#handleClick();
    this.#headerBtn.setAttribute('disabled', 'disabled');
  };
}
