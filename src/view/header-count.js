import AbstractView from '../framework/view/abstract-view.js';
import {modals} from '../modals/init-modals';

function createHeaderCountTemplate() {
  return `<div class="header__container">
  <div class="header-count">
    <button class="header-count__btn" type="button">
      <svg width="60" height="47" aria-hidden="true">
        <use xlink:href="#icon-heart-header"></use>
      </svg>
      <span class="visually-hidden">закрыть</span>
    </button>
    <div class="header-count__count">
      <p class="text text--size-20 header-count__counter">4</p>
    </div>
    <div class="header-count__block">
      <p class="text text--size-20 header-count__text">сумма</p>
      <b class="price price--size-min header-count__price">
        15 700
        <span>Р</span>
      </b>
    </div>
  </div>
  </div>`;
}

export default class HeaderCountView extends AbstractView {
  #handleClick = null;

  constructor() {
    super();

    this.element.querySelector('.header-count__btn').addEventListener('click', () => modals.open('popup-data-attr'));
    this.element.querySelector('.header-count__btn').addEventListener('click', this.#handleHeaderBtnClick);
  }

  get template() {
    return createHeaderCountTemplate();
  }

  #handleHeaderBtnClick = (evt) => {
    evt.preventDefault();
    document.querySelector('main').style.display = 'none';
  };
}
