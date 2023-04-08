//import {render, remove, replace} from '../framework/render.js';
import PopupView from '../view/popup-view.js';

export default class PopupPresenter {
  #mainContainer = null;

  #cards = null;
  #popupComponent = null;

  constructor({mainContainer}) {
    this.#mainContainer = mainContainer;
  }

  init(cards) {
    this.#cards = cards;
    if (this.#popupComponent !== 0) {
      return;
    }

    this.#popupComponent = new PopupView();
  }


}
