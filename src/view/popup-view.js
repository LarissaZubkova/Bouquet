import {UserAction, ActionType} from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import {getPrice} from '../utils/card.js';

function createCardTemplate(cards, cart) {
  return cards.map((card) => {
    const {previewImage, title, description, price, id} = card;
    const count = cart.products[card.id];

    return `<li class="popup-deferred__item" id="${id}">
  <div class="deferred-card">
    <div class="deferred-card__img">
      <picture>
        <source type="image/webp" srcset="${previewImage}"><img src="${previewImage}" srcset="${previewImage} 2x" width="233" height="393" alt="букет">
      </picture>
    </div>
    <div class="deferred-card__content">
      <h2 class="title title--h2">${title}</h2>
      <p class="text text--size-40">${description}</p>
    </div>
    <div class="deferred-card__count">
      <button class="btn-calculate btn-minus" type="button">
        <svg width="30" height="27" aria-hidden="true">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button><span>${count}</span>
      <button class="btn-calculate btn-plus" type="button">
        <svg width="30" height="28" aria-hidden="true">
          <use xlink:href="#icon-cross"></use>
        </svg>
      </button>
    </div>
    <div class="deferred-card__price"><b class="price price--size-middle-p">${getPrice(count * price)}<span>Р</span></b>
    </div>
    <button class="btn-close deferred-card__close-btn" type="button">
      <svg width="55" height="56" aria-hidden="true">
        <use xlink:href="#icon-close-big"></use>
      </svg>
    </button>
    <svg class="deferred-card__close-btn deferred-card__loader" width="56" height="56" aria-hidden="true">
      <use xlink:href="#icon-loader"></use>
    </svg>
  </div>
</li>`;
  }).join('');
}
function createPopupTemplate(cards, cart) {
  const addedCardsId = Object.keys(cart.products);
  const addedCards = cards.filter((card) => addedCardsId.includes(card.id));
  return `<section class="popup-deferred" style="display:block;">
  <div class="popup-deferred__wrapper">
    <section class="hero hero--popup">
      <div class="hero__wrapper">
        <div class="hero__background">
          <picture>
            <source type="image/webp" srcset="img/content/hero-back-popup.webp, img/content/hero-back-popup@2x.webp 2x"><img src="img/content/hero-back-popup.jpg" srcset="img/content/hero-back-popup@2x.jpg 2x" width="1770" height="601" alt="фоновая картинка">
          </picture>
        </div>
        <div class="hero__content">
          <h2 class="title title--h1">Вас<br>заинтересовали</h2>
          <button class="btn-close btn-close--dark hero__popupclose" type="button" aria-label="Закрыть">
            <svg width="56" height="54" aria-hidden="true">
              <use xlink:href="#icon-union"></use>
            </svg>
          </button>
          <div class="btn-close btn-close--dark hero__loader">
            <svg class="hero__loader-icon" width="56" height="56" aria-hidden="true">
              <use xlink:href="#icon-loader"></use>
            </svg>
          </div>
        </div>
      </div>
    </section>
    <div class="popup-deferred__container">
      <a class="btn btn--with-icon popup-deferred__btn btn--light" href="#">в&nbsp;каталог
        <svg width="61" height="24" aria-hidden="true">
          <use xlink:href="#icon-arrow"></use>
        </svg>
      </a>
      <ul class="popup-deferred__catalog">
      ${createCardTemplate(addedCards, cart)}
      </ul>
      <div class="popup-deferred__btn-container">
        <button class="btn btn--with-icon popup-deferred__btn-clean" type="button">очистить
          <svg width="61" height="24" aria-hidden="true">
            <use xlink:href="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div class="popup-deferred__sum">
        <p class="text text--total">Итого вы выбрали:</p>
        <div class="popup-deferred__block-wrap">
          <div class="popup-deferred__block">
            <p class="text text--total">Букеты</p><span class="popup-deferred__count" data-atribut="count-defer">${cart.productCount}</span>
          </div>
          <div class="popup-deferred__block">
            <p class="text text--total">Сумма</p><b class="price price--size-middle-p">${getPrice(cart.sum)}<span>Р</span></b>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

export default class PopupView extends AbstractView {
  #handleBtnCloseClick = null;
  #handleBtnCalculateClick = null;
  #cards = null;
  #cart = null;

  constructor({cards, cart, onBtnCloseClick, onBtnCalculateClick}) {
    super();
    this.#cards = cards;
    this.#cart = cart;
    this.#handleBtnCloseClick = onBtnCloseClick;
    this.#handleBtnCalculateClick = onBtnCalculateClick;

    this.element.querySelector('.btn-close').addEventListener('click', this.#btnCloseClickHandler);
    this.element.querySelectorAll('.btn-plus').forEach((btn) => btn.addEventListener('click', this.#btnPlusClickHandler));
    this.element.querySelectorAll('.btn-minus').forEach((btn) => btn.addEventListener('click', this.#btnDeleteClickHandler));
    this.element.querySelectorAll('.deferred-card__close-btn').forEach((btn) => btn.addEventListener('click', this.#btnDeleteClickHandler));
    this.element.querySelector('.popup-deferred__btn').addEventListener('click', this.#btnCatalogueClickHandler);
    this.element.querySelector('.popup-deferred__btn-clean').addEventListener('click', this.#btnDeleteClickHandler);
  }

  get template() {
    return createPopupTemplate(this.#cards, this.#cart);
  }

  #btnCloseClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleBtnCloseClick();
    document.querySelector('.header-count__btn').removeAttribute('disabled');
  };

  #btnCatalogueClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleBtnCloseClick();
    document.querySelector('.header-count__btn').removeAttribute('disabled');
    window.scrollBy(0, 3450);
  };

  #btnPlusClickHandler = (evt) => {
    evt.preventDefault();
    const cardId = evt.target.closest('.popup-deferred__item').id;
    const addedCard = this.#cards.find((card) => card.id === cardId);
    this.#handleBtnCalculateClick(addedCard, UserAction.ADD_CARD);
  };

  #btnDeleteClickHandler = (evt) => {
    evt.preventDefault();
    let cardId;
    if (evt.target.closest('.popup-deferred__item')) {
      cardId = evt.target.closest('.popup-deferred__item').id;
    }
    const deletedCard = this.#cards.find((card) => card.id === cardId);
    if (evt.target.closest('.btn-calculate')) {
      this.#handleBtnCalculateClick(deletedCard, UserAction.DELETE_CARD, ActionType.DELETE);
    }
    if (evt.target.closest('.btn-close')) {
      this.#handleBtnCalculateClick(deletedCard, UserAction.DELETE_CARD, ActionType.DELETE_ALL);
    }
    if (evt.target.closest('.popup-deferred__btn-clean')) {
      this.#handleBtnCalculateClick(this.#cart, UserAction.DELETE_CARD, ActionType.CLEAN);
    }
  };
}
