import {render, remove, replace} from '../framework/render.js';
import CardView from '../view/card-view.js';
import CardModalView from '../view/card-modal-view.js';
import ModalDescriptionView from '../view/modal-description-view.js';

export default class CardPresenter {
    #cardListContainer = null;
    #modalProdactElement = null;
    #cardComponent = null;
    #cardModalComponent = null;
    #modalDescriptionComponent = null;

    #card = null;
    #cardModel = null;

    constructor({cardListContainer, modalProdactElement}) {
        this.#cardListContainer = cardListContainer;
        this.#modalProdactElement = modalProdactElement;
    }

    init(card, cardModel) {
      this.#card = card;
      this.#cardModel = cardModel;

      const prevCardComponent = this.#cardComponent;
      const prevCardModalComponent = this.#cardModalComponent;

      this.#cardComponent = new CardView({
        card: this.#card,
        onOpenBtnClick: this.#handleOpenBtnClick,
      });

      this.#cardModalComponent = new CardModalView({
        product: this.#cardModel.product,
      });

      this.#modalDescriptionComponent = new ModalDescriptionView({
        card: this.#card,
      })
      
      if (prevCardComponent === null || prevCardModalComponent === null) {
        render(this.#cardComponent, this.#cardListContainer);
        return;
      }

      remove(prevCardComponent);
      remove(prevCardModalComponent);
    }

    async #replaceCardToModal() {
      const product = await this.#cardModel.getProduct(this.#card.id)
      this.#cardModalComponent.setProduct(product);
      render(this.#cardModalComponent, this.#modalProdactElement)
      render(this.#modalDescriptionComponent, this.#modalProdactElement)
    }

    #handleOpenBtnClick = () => {
      this.#replaceCardToModal();
    }


}
