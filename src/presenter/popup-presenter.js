import {remove, replace} from '../framework/render.js';
import PopupView from '../view/popup-view.js';
import {UpdateType} from '../consts.js';

export default class PopupPresenter {
  #wrapperElement = null;
  #footerElement = null;
  #handleDestroy = null;
  #handleDataChange = null;

  #cardsModel = null;
  #popupComponent = null;
  #cart = null;

  constructor({wrapperElement, footerElement, onDestroy, onDataChange}) {
    this.#wrapperElement = wrapperElement;
    this.#footerElement = footerElement;
    this.#handleDestroy = onDestroy;
    this.#handleDataChange = onDataChange;
  }

  async init(cardsModel) {
    this.#cardsModel = cardsModel;
    this.#cart = await cardsModel.getCart();

    const prevPopupComponent = this.#popupComponent;

    this.#popupComponent = new PopupView({
      cards: this.#cardsModel.cards,
      cart: this.#cart,
      onBtnCloseClick: this.#handleCancelClick,
      onBtnCalculateClick: this.#handleBtnCalculateClick,
    });

    if (prevPopupComponent === null) {
      this.#wrapperElement.insertBefore(this.#popupComponent.element, this.#footerElement);
    } else {
      replace(this.#popupComponent, prevPopupComponent);
      remove(prevPopupComponent);
    }
  }

  destroy() {
    // if (this.#popupComponent === null) {
    //   return;
    // }
    remove(this.#popupComponent);
    this.#popupComponent = null;
  }

  #handleCancelClick = () => {
    this.destroy();
    this.#handleDestroy();
  };

  #handleBtnCalculateClick = (data, userAction, type) => {
    this.destroy();
    this.#handleDataChange(
      userAction,
      UpdateType.MINOR,
      data,
      type,
    );
  };
}
