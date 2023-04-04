import {render, remove, replace} from '../framework/render.js';
import CardView from '../view/card-view.js';
import CardModalView from '../view/card-modal-view.js';

export default class CardPresenter {
    #cardListContainer = null;
    #bodyElement = null;
    #cardComponent = null;
    #cardModalComponent = null;
    #card = null;

    constructor({cardListContainer, bodyElement}) {
        this.#cardListContainer = cardListContainer;
        this.#bodyElement = bodyElement;
    }

    init(card) {
      this.#card = card;

      const prevCardComponent = this.#cardComponent;
      const prevCardModalComponent = this.#cardModalComponent;

      this.#cardComponent = new CardView({
        card: this.#card,
      });
      this.#cardModalComponent = new CardModalView({
        card: this.#card,
      });

      if (prevCardComponent === null || prevCardModalComponent === null) {
        render(this.#cardComponent, this.#cardListContainer);
        return;
      }

      this.#bodyElement.appendChild(this.#cardModalComponent.element);
      remove(prevCardComponent);
      remove(prevCardModalComponent);
    }


}
