import Observable from '../framework/observable.js';
import {UpdateType, ErrorMessage} from '../consts.js';

export default class CardsModel extends Observable {
  #cardsApiService = null;
  #cards = [];
  #product = {};

  constructor({cardsApiService}) {
    super();
    this.#cardsApiService = cardsApiService;
  }

  get cards() {
    return this.#cards;
  }

  async getProduct(productId) {
    try {
      this.#product = await this.#cardsApiService.getProduct(productId);
    } catch(err) {
      this.#product = {};
    }
    return this.#product;
  }

  async init() {
    try {
      this.#cards = await this.#cardsApiService.cards;
    } catch(err) {
      this.#cards = [];
    }
    this._notify(UpdateType.INIT);
  }

  async updateCard(updateType, update) {
    const index = this.#cards.findIndex((card) => card.id === update.card.id);

    if (index === -1) {
      throw new Error(ErrorMessage.UPDATE_CURD);
    }

    try {
      const updatedCard = await this.#cardsApiService.updateCard(update.card);
      this.#cards = [
        ...this.#cards.slice(0, index),
        update.card,
        ...this.#cards.slice(index + 1),
      ];
      this._notify(updateType, updatedCard);
    } catch(err) {
      throw new Error(ErrorMessage.UPDATE_CARD);
    }
  }
}
