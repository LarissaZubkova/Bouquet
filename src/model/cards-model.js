import Observable from '../framework/observable.js';
import { UpdateType } from '../consts.js';

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
}
