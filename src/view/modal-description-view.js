import AbstractView from '../framework/view/abstract-view.js';

function getPrice(price) {
  return price.toLocaleString('ru');
}

function createModalDescriptionTemplate(card) {
  const {title, price, description} = card;
  return `<div class="product-description">
        <div class="product-description__header">
          <h3 class="title title--h2">${title}</h3><b class="price price--size-big">${getPrice(price)}<span>Р</span></b>
        </div>
        <p class="text text--size-40">${description}</p>
        <button class="btn btn--outlined btn--full-width product-description__button" type="button" data-focus>${card.heart ? 'отложено' : 'отложить'}
        </button>
      </div>`;
}

export default class ModalDescriptionView extends AbstractView {
  #card = null;
  #handleBtnClick = null;

  constructor({card, onClick}){
    super();
    this.#card = card;
    this.#handleBtnClick = onClick;

    this.element.querySelector('.product-description__button').addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createModalDescriptionTemplate(this.#card);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleBtnClick();

    if (!this.#card.heart) {
      this.#card.heart = true;
    } else {
      delete this.#card.heart;
    }
  };
}
