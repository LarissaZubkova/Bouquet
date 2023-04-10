import AbstractView from '../framework/view/abstract-view.js';
import {getPrice} from '../utils/card.js';
import {UserAction, ActionType} from '../const.js';

function getAddedCard(addedCards, id) {
  return addedCards.find((card) => card === id);
}

function getProducts(products = {}) {
  return Object.keys(products);
}

function createModalDescriptionTemplate(card, cart) {
  const addedCards = getProducts(cart.products);
  const {title, price, description, id} = card;
  return `<div class="product-description">
        <div class="product-description__header">
          <h3 class="title title--h2">${title}</h3><b class="price price--size-big">${getPrice(price)}<span>Р</span></b>
        </div>
        <p class="text text--size-40">${description}</p>
        <button class="btn btn--outlined btn--full-width product-description__button" type="button" data-focus>${getAddedCard(addedCards, id) ? 'отложено' : 'отложить'}
        </button>
      </div>`;
}

export default class ModalDescriptionView extends AbstractView {
  #card = null;
  #cart = null;
  #handleBtnClick = null;

  constructor({card, cart, onClick}){
    super();
    this.#card = card;
    this.#cart = cart;
    this.#handleBtnClick = onClick;

    this.element.querySelector('.product-description__button').addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createModalDescriptionTemplate(this.#card, this.#cart);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    const addedCards = getProducts(this.#cart.products);
    const isCardEdded = addedCards.includes(this.#card.id);

    if (!isCardEdded) {
      this.#handleBtnClick(UserAction.ADD_CARD);
    } else {
      this.#handleBtnClick(UserAction.DELETE_CARD, ActionType.DELETE_ALL);
    }
  };
}
