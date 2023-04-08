import {render, remove, replace} from '../framework/render.js';
import CardView from '../view/card-view.js';
import CardModalView from '../view/card-modal-view.js';
import ModalDescriptionView from '../view/modal-description-view.js';
import {Mode, UserAction, UpdateType} from '../consts.js';

export default class CardPresenter {
  #cardListContainer = null;
  #modalProdactElement = null;
  #cardComponent = null;
  #cardModalComponent = null;
  #modalDescriptionComponent = null;
  #handleModeChange = null;
  #handleDataChange = null;

  #card = null;
  #cardModel = null;
  #mode = Mode.DEFAULT;

  constructor({cardListContainer, modalProdactElement, onModeChange, onDataChange}) {
    this.#cardListContainer = cardListContainer;
    this.#modalProdactElement = modalProdactElement;
    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  init(card, cardModel) {
    this.#card = card;
    this.#cardModel = cardModel;

    const prevCardComponent = this.#cardComponent;
    const prevCardModalComponent = this.#modalDescriptionComponent;

    this.#cardComponent = new CardView({
      card: this.#card,
      onOpenBtnClick: this.#handleOpenBtnClick,
      onHeartClick: this.#handleHeartClick,
    });

    this.#cardModalComponent = new CardModalView({
      product: this.#cardModel.product,
      onModalClose: this.#handleModelClose,
    });

    this.#modalDescriptionComponent = new ModalDescriptionView({
      card: this.#card,
      onClick: this.#handleHeartClick,
    });

    if (prevCardComponent === null || prevCardModalComponent === null) {
      render(this.#cardComponent, this.#cardListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#cardComponent, prevCardComponent);
    }

    if (this.#mode === Mode.MODAL) {
      replace(this.#modalDescriptionComponent, prevCardModalComponent);
      replace(this.#cardComponent, prevCardComponent);
    }

    if (prevCardComponent) {
      remove(prevCardComponent);
    }
    if (prevCardModalComponent) {
      remove(prevCardModalComponent);
    }
  }

  destroy() {
    remove(this.#cardComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceModalToCard();
    }
  }

  async #replaceCardToModal() {
    const product = await this.#cardModel.getProduct(this.#card.id);
    this.#cardModalComponent.setProduct(product);

    render(this.#cardModalComponent, this.#modalProdactElement);
    render(this.#modalDescriptionComponent, this.#modalProdactElement);
    document.addEventListener('keydown', this.#escKeyDownHandler);

    this.#handleModeChange();
    this.#mode = Mode.MODAL;
  }

  async #replaceModalToCard() {
    if (this.#mode === Mode.MODAL) {
      remove(this.#cardModalComponent);
      remove(this.#modalDescriptionComponent);
    }
    document.querySelector('.modal').classList.remove('product-card-active', 'is-active');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceModalToCard();
    }
  };

  #handleOpenBtnClick = () => {
    this.#replaceCardToModal();
  };

  #handleModelClose = () => {
    // this.#handleDataChange(
    //   UserAction.UPDATE_TASK,
    //   UpdateType.MINOR,
    //   {
    //     film: update,
    //   }
    // );
    this.#replaceModalToCard();
  };

  #handleHeartClick = () => {
    this.#handleDataChange(
      UserAction.ADD_CARD,
      UpdateType.PATCH,
      this.#card,
    );
  };
}
