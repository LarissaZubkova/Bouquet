import Observable from '../framework/observable.js';
import {UpdateType, ErrorMessage} from '../consts.js';

export default class CardsModel extends Observable {
  #cardsApiService = null;
  #cards = [];
  #product = {};
  #cart = [];

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

  async addCard(updateType, update) {
    const index = this.#cards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error(ErrorMessage.ADD_CARD);
    }

    try {
      await this.#cardsApiService.addCard(update);
      this._notify(updateType, update);
    } catch(err) {
      throw new Error(ErrorMessage.ADD_CARD);
    }
  }

  async deleteCard(updateType, update) {
    const index = this.#cards.findIndex((card) => card.id === update.id);
    if (index === -1) {
      throw new Error(ErrorMessage.ADD_CARD);
    }

    try {
      await this.#cardsApiService.deleteCard(update);
      this._notify(updateType, update);
    } catch(err) {
      throw new Error(ErrorMessage.DELETE_CARD);
    }
  }

  async getCart() {
    try {
      this.#cart = await this.#cardsApiService.cart;
    } catch(err) {
      this.#cart = {};
    }

    return this.#cart;
  }
}
