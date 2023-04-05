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
    #modalProdactElement = null;
    #cardsModel = null;

    #catalogeComponent = new CatalogeView();
    #catalogueListComponent = new CatalogueListView();
    #loadMoreButtonComponent = null;
    #sortComponent = null;

    #renderedCardCount = CARD_COUNT_PER_STEP;
    #isLoading = true;
    #catalogueElement = this.#catalogeComponent.element.querySelector('.container');

    constructor({mainContainer, modalProdactElement, cardsModel}) {
        this.#mainContainer = mainContainer;
        this.#modalProdactElement = modalProdactElement;
        this.#cardsModel = cardsModel;

        this.#cardsModel.addObserver(this.#handleModelEvent);
    }

    get cards() {
      return this.#cardsModel.cards;
    }

    #renderCard(card) {
        const cardPresenter = new CardPresenter({
            cardListContainer: this.#catalogueListComponent.element,
            modalProdactElement: this.#modalProdactElement,
        })
        cardPresenter.init(card, this.#cardsModel);
    }

    #renderCards(cards) {
      cards.forEach((card) => this.#renderCard(card));
    }

    #renderSort() {
      this.#sortComponent = new SortView();
      render(this.#sortComponent, this.#catalogueElement, RenderPosition.AFTERBEGIN);
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

      render(this.#loadMoreButtonComponent, this.#catalogueElement);
    }

    #renderMainComponent() {
        render(new HeroView(), this.#mainContainer);
        render(new MissionView(), this.#mainContainer);
        render(new AdvantagesView(), this.#mainContainer);
        render(new FilterReasonView(), this.#mainContainer);
        render(new FilterColorView(), this.#mainContainer);
        render(this.#catalogeComponent, this.#mainContainer);
        render(this.#catalogueListComponent, this.#catalogueElement);

        console.log(this.#cardsModel)
        const cards = this.cards;
        const cardCount = cards.length;

        this.#renderSort();
        this.#renderCards(cards.slice(0, Math.min(cardCount, this.#renderedCardCount)));

        if (cardCount > this.#renderedCardCount) {
          this.#renderLoadMoreButton();
        }
    }
}