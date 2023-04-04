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
import {CARD_COUNT_PER_STEP, UpdateType} from '../consts.js';

export default class MainPresenter {
    #mainContainer = null;
    #bodyElement = null;
    #cardsModel = null;

    #catalogeComponent = new CatalogeView();
    #catalogueListComponent = new CatalogueListView();
    #loadMoreButtonComponent = null;

    #renderedCardCount = CARD_COUNT_PER_STEP;
    #isLoading = true;

    constructor({mainContainer, bodyElement, cardsModel}) {
        this.#mainContainer = mainContainer;
        this.#bodyElement = bodyElement;
        this.#cardsModel = cardsModel;

        this.#cardsModel.addObserver(this.#handleModelEvent);
    }

    get cards() {
      return this.#cardsModel.cards;
    }

    init() {
        this.#renderMainComponent();
    }

    #renderCard(card) {
        const cardPresenter = new CardPresenter({
            cardListContainer: this.#catalogueListComponent.element,
            bodyElement: this.#bodyElement,
        })
        cardPresenter.init(card);
    }

    #renderCards(cards) {
      cards.forEach((card) => this.#renderCard(card));
    }

    #handleModelEvent = async (updateType) => {
      switch (updateType) {
        case UpdateType.INIT:
        this.#isLoading = false;
        //remove(this.#loadingComponent);
        this.#renderMainComponent();
        break;
    }
    }

    #renderLoadMoreButton() {
      this.#loadMoreButtonComponent = new LoadMoreButtonView();

      render(this.#loadMoreButtonComponent, this.#catalogeComponent.element.querySelector('.container'));
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

        const cards = this.cards;
        const cardCount = cards.length;

        this.#renderCards(cards.slice(0, Math.min(cardCount, this.#renderedCardCount)));

        if (cardCount > this.#renderedCardCount) {
          this.#renderLoadMoreButton();
        }
    }
}
