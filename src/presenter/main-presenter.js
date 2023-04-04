import {render, remove, RenderPosition} from '../framework/render.js';
import HeroView from '../view/hero-view.js';
import MissionView from '../view/mission-view.js';
import AdvantagesView from '../view/advantages-view.js';
import FilterReasonView from '../view/filter-reason-view.js';
import FilterColorView from '../view/filter-color-view.js';
import CatalogeView from '../view/catalogue-view.js';
import SortView from '../view/sort-view.js';
import CatalogueListView from '../view/catalogue-list-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import CardPresenter from './card-presenter.js';

export default class MainPresenter {
    #mainContainer = null;
    #bodyElement = null;

    #catalogeComponent = new CatalogeView();
    #catalogueListComponent = new CatalogueListView();

    constructor({mainContainer, bodyElement}) {
        this.#mainContainer = mainContainer;
        this.#bodyElement = bodyElement;
    }

    init() {
        this.#renderMainComponent();
    }

    #renderCard() {
        const cardPresenter = new CardPresenter({
            cardListContainer: this.#catalogueListComponent.element,
            bodyElement: this.#bodyElement,
        })
        cardPresenter.init();
    }

    #renderMainComponent() {
        const catalogueElement = this.#catalogeComponent.element.querySelector('.container');

        render(new HeroView(), this.#mainContainer);
        render(new MissionView(), this.#mainContainer);
        render(new AdvantagesView(), this.#mainContainer);
        render(new FilterReasonView(), this.#mainContainer);
        render(new FilterColorView(), this.#mainContainer);
        render(this.#catalogeComponent, this.#mainContainer);
        render(new SortView(), catalogueElement);
        render(this.#catalogueListComponent, catalogueElement);
        render(new LoadMoreButtonView, catalogueElement);

        this.#renderCard();
    }
}