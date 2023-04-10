import {render, remove, replace} from '../framework/render.js';
import CardView from '../view/card-view.js';
import CardModalView from '../view/card-modal-view.js';
import ModalDescriptionView from '../view/modal-description-view.js';
import {Mode, UpdateType} from '../const.js';
import LoadingView from '../view/loading-view.js';

export default class CardPresenter {
  #cardListContainer = null;
  #modalProductElement = null;
  #cardComponent = null;
  #cardModalComponent = null;
  #modalDescriptionComponent = null;
  #handleModeChange = null;
  #handleDataChange = null;
  #loadingComponent = new LoadingView();

  #card = null;
  #cardsModel = null;
  #mode = Mode.DEFAULT;
  #isLoading = true;


  constructor({cardListContainer, modalProductElement, onModeChange, onDataChange}) {
    this.#cardListContainer = cardListContainer;
    this.#modalProductElement = modalProductElement;
    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  async init(card, cardsModel) {
    this.#card = card;
    this.#cardsModel = cardsModel;
    const cart = await this.#cardsModel.getCart();
    const product = await this.#cardsModel.getProduct(this.#card.id);

    const prevCardComponent = this.#cardComponent;
    const prevCardModalComponent = this.#cardModalComponent;
    const prevCardModalDescriptionComponent = this.#modalDescriptionComponent;

    this.#cardComponent = new CardView({
      card: this.#card,
      cart,
      onOpenBtnClick: this.#handleOpenBtnClick,
      onHeartClick: this.#handleHeartClick,
    });

    this.#cardModalComponent = new CardModalView({
      product,
      onModalClose: this.#handleModelClose,
    });

    this.#modalDescriptionComponent = new ModalDescriptionView({
      card: this.#card,
      cart,
      onClick: this.#handleHeartClick,
    });

    if (prevCardComponent === null || prevCardModalDescriptionComponent === null) {
      if (this.#isLoading) {
        this.#renderLoading();
      }
      render(this.#cardComponent, this.#cardListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#cardComponent, prevCardComponent);
    }

    if (this.#mode === Mode.MODAL) {
      replace(this.#cardModalComponent, prevCardModalComponent);
      replace(this.#modalDescriptionComponent, prevCardModalDescriptionComponent);
      replace(this.#cardComponent, prevCardComponent);
    }

    remove(prevCardComponent);
    remove(prevCardModalComponent);
    remove(prevCardModalDescriptionComponent);
  }

  destroy() {
    remove(this.#cardComponent);
    remove(this.#cardModalComponent);
    remove(this.#modalDescriptionComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceModalToCard();
    }
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#cardListContainer);
  }

  removeLoading() {
    console.log(1);
    remove(this.#loadingComponent);
  }

  async #replaceCardToModal() {
    render(this.#cardModalComponent, this.#modalProductElement);
    render(this.#modalDescriptionComponent, this.#modalProductElement);

    document.addEventListener('keydown', this.#escKeyDownHandler);

    this.#handleModeChange();
    this.#mode = Mode.MODAL;
  }

  #replaceModalToCard() {
    if (this.#mode === Mode.MODAL) {
      remove(this.#cardModalComponent);
      remove(this.#modalDescriptionComponent);
    }

    document.querySelector('.modal').classList.remove('product-card-active', 'is-active');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#cardComponent.shake();
      return;
    }

    this.#modalDescriptionComponent.shake();
  }

  // setDeleting() {
  //   if (this.#mode === Mode.MODAL) {
  //     this.#modalDescriptionComponent.updateElement({
  //       isDisabled: true,
  //       isDeleting: true,
  //     });
  //   }
  // }

  // setSaving() {
  //   if (this.#mode === Mode.MODAL) {
  //     this.#modalDescriptionComponent.updateElement({
  //       isDisabled: true,
  //       isSaving: true,
  //     });
  //   }
  // }

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
    this.#replaceModalToCard();
  };

  #handleHeartClick = (userAction, type) => {
    this.#handleDataChange(
      userAction,
      UpdateType.PATCH,
      this.#card,
      type,
    );
  };
}

