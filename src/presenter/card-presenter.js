import {render, remove, replace} from '../framework/render.js';
import CardView from '../view/card-view.js';
import CardModalView from '../view/card-modal-view.js';

export default class CardPresenter {
    #cardListContainer = null;
    #bodyElement = null;
    #cardComponent = null;
    #cardModalComponent = null;
    
    constructor({cardListContainer, bodyElement}) {
        this.#cardListContainer = cardListContainer;
        this.#bodyElement = bodyElement;
    }

    init() {
    const prevCardComponent = this.#cardComponent;
    const prevCardModalComponent = this.#cardModalComponent;

    this.#cardComponent = new CardView();
    this.#cardModalComponent = new CardModalView();

    if (prevCardComponent === null || prevCardModalComponent === null) {
        render(this.#cardComponent, this.#cardListContainer);
        return;
    }

    remove(prevCardComponent);
    remove(prevCardModalComponent);
    }

    
}