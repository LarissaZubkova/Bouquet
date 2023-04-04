import Observable from '../framework/observable.js';

export default class CardsModel extends Observable {
  #cardsApiService = null;
  #cards = [];

  constructor({cardsApiService}) {
    super();
    this.#cardsApiService = cardsApiService;
  }

  get cards() {
    return this.#cards;
  }

  async init() {
    try {
      this.#cards = await this.#cardsApiService.cards;
    } catch(err) {
      this.#films = [];
    }
  }
}
