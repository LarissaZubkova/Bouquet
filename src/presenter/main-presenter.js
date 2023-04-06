import {render, remove, RenderPosition} from '../framework/render.js';
import HeroView from '../view/hero-view.js';
import MissionView from '../view/mission-view.js';
import AdvantagesView from '../view/advantages-view.js';
import CatalogeView from '../view/catalogue-view.js';
import SortView from '../view/sort-view.js';
import CatalogueListView from '../view/catalogue-list-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import CardPresenter from './card-presenter.js';
import FiltersPresenter from './filters-presenter.js';
import {CARD_COUNT_PER_STEP, UpdateType, ReasonType, ColorType, UserAction, SortType} from '../consts.js';
import {filterReason, filterColor} from '../utils/filter.js';

export default class MainPresenter {
    #mainContainer = null;
    #modalProdactElement = null;
    #cardsModel = null;
    #filterModel = null;

    #catalogeComponent = new CatalogeView();
    #catalogueListComponent = new CatalogueListView();
    #loadMoreButtonComponent = null;
    #sortComponent = null;

    #renderedCardCount = CARD_COUNT_PER_STEP;
    #cardsPresenter = new Map();
    #filterReasonType = ReasonType.ALL;
    #filterColorType = ColorType.ALL;
    #currentSortType = SortType.INCREASE;
    #isLoading = true;
    #catalogueElement = this.#catalogeComponent.element.querySelector('.container');

    constructor({mainContainer, modalProdactElement, cardsModel, filterModel}) {
        this.#mainContainer = mainContainer;
        this.#modalProdactElement = modalProdactElement;
        this.#cardsModel = cardsModel;
        this.#filterModel = filterModel;

        this.#cardsModel.addObserver(this.#handleModelEvent);
        this.#filterModel.addObserver(this.#handleModelEvent);
    }

    get cards() {
      const filterReasonType = this.#filterModel.filterReason;
      console.log(filterReasonType)
      this.#filterColorType = this.#filterModel.filterColor;
      const cards = this.#cardsModel.cards;
      const filteredCards = filterReason[filterReasonType](cards);
      console.log(filteredCards)
      return filteredCards;
    }

    #renderCard(card) {
        const cardPresenter = new CardPresenter({
            cardListContainer: this.#catalogueListComponent.element,
            modalProdactElement: this.#modalProdactElement,
            onModeChange: this.#handleModeChange,
            onDataChange: this.#handleViewAction,
        })

        cardPresenter.init(card, this.#cardsModel);
        this.#cardsPresenter.set(card.id, cardPresenter);
    }

    #renderCards(cards) {
      cards.forEach((card) => this.#renderCard(card));
    }

    #renderFilters() {
      const filtersPresenter = new FiltersPresenter({
        filterContainer: this.#mainContainer,
        filterModel: this.#filterModel,
        cardsModel: this.#cardsModel,
      })

      filtersPresenter.init();
    }

    #renderSort() {
      this.#sortComponent = new SortView();
      render(this.#sortComponent, this.#catalogueElement, RenderPosition.AFTERBEGIN);
    }

    #clearMainComponent({resetRenderedCardCount = false, resetSortType = false} = {}()) {
      const cardCount = this.cards.length;

      this.#cardsPresenter.forEach((presenter) => presenter.destroy());
      this.#cardsPresenter.clear();

      remove(this.#loadMoreButtonComponent);

      if (resetRenderedCardCount) {
        this.#renderedCardCount = CARD_COUNT_PER_STEP;
      } else {
        this.#renderedCardCount = Math.min(cardCount, this.#renderedCardCount);
      }

    }

    #handleViewAction = (actionType, updateType, update) => {
      switch(actionType) {
        case UserAction.UPDATE_CARD:
          this.#cardsModel.updateCard(updateType, update);
          break;
      }
    }

    #handleModelEvent = async (updateType,data) => {
      switch (updateType) {
        case UpdateType.PATCH:
          this.#cardsPresenter.get(data.id).init(data);
          break;
        case UpdateType.MINOR:
          this.#clearMainComponent();
          this.#renderMainComponent();
          break;
        case UpdateType.MAJOR:
          this.#clearMainComponent({resetRenderedCardCount:true, resetSortType: true})
          break;
        case UpdateType.INIT:
        this.#isLoading = false;
        //remove(this.#loadingComponent);
        this.#renderMainComponent();
        break;
    }
    }

    #handleModeChange = () => {
      this.#cardsPresenter.forEach((presenter) => presenter.resetView());
    }

    #handleSortTypeChange = (sortType) => {
      if (this.#currentSortType === sortType) {
        return;
      }

      this.#currentSortType = sortType;
      this.#clearMainComponent({resetRenderedCardCount: true});
      this.#renderMainComponent();
    };

    #handleLoadMoreButtonClick = () => {
      const cardCount = this.cards.length;

      const newRenderedCardCount = Math.min(cardCount, this.#renderedCardCount + CARD_COUNT_PER_STEP);
      const cards = this.cards.slice(this.#renderedCardCount, newRenderedCardCount);

      this.#renderCards(cards);
      this.#renderedCardCount = newRenderedCardCount;

      if(this.#renderedCardCount >= cardCount) {
        remove(this.#loadMoreButtonComponent);
      }
    }

    #renderLoadMoreButton() {
      this.#loadMoreButtonComponent = new LoadMoreButtonView({
        onClick: this.#handleLoadMoreButtonClick,
      });

      render(this.#loadMoreButtonComponent, this.#catalogueElement);
    }

    #renderMainComponent() {
        render(new HeroView(), this.#mainContainer);
        render(new MissionView(), this.#mainContainer);
        render(new AdvantagesView(), this.#mainContainer);

        this.#renderFilters();

        render(this.#catalogeComponent, this.#mainContainer);
        render(this.#catalogueListComponent, this.#catalogueElement);

        const cards = this.cards;
        const cardCount = cards.length;

        this.#renderSort();
        this.#renderCards(cards.slice(0, Math.min(cardCount, this.#renderedCardCount)));

        if (cardCount > this.#renderedCardCount) {
          this.#renderLoadMoreButton();
        }
    }
}
