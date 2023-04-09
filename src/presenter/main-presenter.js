import {render, remove, RenderPosition} from '../framework/render.js';
import HeaderCountView from '../view/header-count.js';
import HeroView from '../view/hero-view.js';
import MissionView from '../view/mission-view.js';
import AdvantagesView from '../view/advantages-view.js';
import CatalogueView from '../view/catalogue-view.js';
import SortView from '../view/sort-view.js';
import CatalogueListView from '../view/catalogue-list-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import NotFoundView from '../view/not-found-view.js';
import ErrorView from '../view/error-view.js';
import CardPresenter from './card-presenter.js';
import FiltersPresenter from './filters-presenter.js';
import PopupPresenter from './popup-presenter.js';
import {CARD_COUNT_PER_STEP, UpdateType, UserAction, SortType} from '../consts.js';
import {filterReason, filterColor} from '../utils/filter.js';
import {sortIncrease, sortDescending} from '../utils/card.js';

export default class MainPresenter {
  #mainContainer = null;
  #modalProdactElement = null;
  #wrapperElement = null;
  #footerElement = null;
  #cardsModel = null;
  #filterModel = null;

  #heroComponent = new HeroView();
  #catalogueComponent = new CatalogueView();
  #catalogueListComponent = new CatalogueListView();
  #missionComponent = new MissionView();
  #advantagesComponent = new AdvantagesView();
  #notFoundComponent = new NotFoundView();
  #headerCountComponent = null;
  #loadMoreButtonComponent = null;
  #sortComponent = null;
  #errorMessageComponent = null;

  #renderedCardCount = CARD_COUNT_PER_STEP;
  #cardsPresenter = new Map();
  #filtersPresenter = null;
  #popupPresenter = null;

  #currentSortType = SortType.INCREASE;
  #isLoading = true;
  #catalogueElement = this.#catalogueComponent.element.querySelector('.container');
  #headerWrapperElement = document.querySelector('.header__wrapper');

  constructor({mainContainer, modalProdactElement, wrapperElement, footerElement, cardsModel, filterModel}) {
    this.#mainContainer = mainContainer;
    this.#modalProdactElement = modalProdactElement;
    this.#wrapperElement = wrapperElement;
    this.#footerElement = footerElement;
    this.#cardsModel = cardsModel;
    this.#filterModel = filterModel;

    this.#cardsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderHeaderCount();
    render(this.#heroComponent, this.#mainContainer);
    render(this.#missionComponent, this.#mainContainer);
    render(this.#advantagesComponent, this.#mainContainer);
    this.#renderFilters();
  }

  get cards() {
    const filterReasonType = this.#filterModel.filterReason;
    const filterColorType = this.#filterModel.filterColor;
    const cards = this.#cardsModel.cards;
    const filteredReasonCards = filterReason[filterReasonType](cards);
    const filteredColorCards = filterColor(filterColorType, cards);
    const filteredCards = filteredReasonCards.filter((card) => filteredColorCards.includes(card));

    switch (this.#currentSortType) {
      case SortType.INCREASE:
        return filteredCards.sort(sortIncrease);
      case SortType.DESCENDING:
        return filteredCards.sort(sortDescending);
    }

    return filteredCards;
  }

  #renderCard(card) {
    const cardPresenter = new CardPresenter({
      cardListContainer: this.#catalogueListComponent.element,
      modalProdactElement: this.#modalProdactElement,
      onModeChange: this.#handleModeChange,
      onDataChange: this.#handleViewAction,
    });

    cardPresenter.init(card, this.#cardsModel);
    this.#cardsPresenter.set(card.id, cardPresenter);
  }

  #renderCards(cards) {
    cards.forEach((card) => this.#renderCard(card));
  }

  async #renderHeaderCount() {
    const cart = await this.#cardsModel.getCart();
    this.#headerCountComponent = new HeaderCountView({
      cart,
      onClick: this.#handelHeaderCountClick,
    });

    render(this.#headerCountComponent, this.#headerWrapperElement);
  }

  #renderPopup() {
    this.#mainContainer.style.display = 'none';
    this.#filtersPresenter.destroy();

    remove(this.#catalogueComponent);
    remove(this.#catalogueListComponent);

    this.#clearMainComponent();

    this.#popupPresenter = new PopupPresenter({
      wrapperElement: this.#wrapperElement,
      footerElement: this.#footerElement,
      onDestroy: this.#onPopupDestroy,
      onDataChange: this.#handleViewAction,
    });

    this.#popupPresenter.init(this.#cardsModel);
  }

  #renderFilters() {
    this.#filtersPresenter = new FiltersPresenter({
      filterContainer: this.#mainContainer,
      filterModel: this.#filterModel,
      cardsModel: this.#cardsModel,
    });

    this.#filtersPresenter.init();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#catalogueElement, RenderPosition.AFTERBEGIN);
  }

  #onPopupDestroy = () => {
    this.#mainContainer.removeAttribute('style');
    this.#renderFilters();

    this.#renderMainComponent();
  };

  #clearMainComponent({resetRenderedCardCount = false, resetSortType = false} = {}) {
    const cardCount = this.cards.length;

    this.#cardsPresenter.forEach((presenter) => presenter.destroy());
    this.#cardsPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadMoreButtonComponent);

    if (this.#errorMessageComponent) {
      remove(this.#errorMessageComponent);
    }

    if (this.#notFoundComponent) {
      remove(this.#notFoundComponent);
    }

    if (resetRenderedCardCount) {
      this.#renderedCardCount = CARD_COUNT_PER_STEP;
    } else {
      this.#renderedCardCount = Math.min(cardCount, this.#renderedCardCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.INCREASE;
    }
  }

  #handelHeaderCountClick = () => {
    this.#renderPopup();
  };

  #handleErrorBtnClick = () => {
    //remove(this.#errorMessageComponent)
    this.#clearMainComponent({resetRenderedCardCount:true, resetSortType: true});
    this.#renderMainComponent();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch(actionType) {
      case UserAction.ADD_CARD:
        this.#cardsModel.addCard(updateType, update);
        break;
      case UserAction.DELETE_CARD:
        this.#cardsModel.deleteCard(updateType, update);
        break;
    }
  };

  #handleModelEvent = async (updateType,data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#cardsPresenter.get(data.id).init(data, this.#cardsModel);
        remove(this.#headerCountComponent);
        this.#renderHeaderCount();
        break;
      case UpdateType.MINOR:
        this.#clearMainComponent();
        this.#renderMainComponent();
        this.#renderPopup();
        break;
      case UpdateType.MAJOR:
        this.#clearMainComponent({resetRenderedCardCount:true, resetSortType: true});
        this.#renderMainComponent();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        //remove(this.#loadingComponent);
        this.#renderMainComponent();
        break;
    }
  };

  #handleModeChange = () => {
    this.#cardsPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#renderedCardCount = CARD_COUNT_PER_STEP;
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
  };

  #renderErrorMessage() {
    remove(this.#missionComponent);
    remove(this.#advantagesComponent);
    this.#filtersPresenter.destroy();

    this.#errorMessageComponent = new ErrorView({
      onErrorBtnClick: this.#handleErrorBtnClick,
    });

    render(this.#errorMessageComponent, this.#mainContainer);
  }

  #renderLoadMoreButton() {
    this.#loadMoreButtonComponent = new LoadMoreButtonView({
      onClick: this.#handleLoadMoreButtonClick,
    });

    render(this.#loadMoreButtonComponent, this.#catalogueElement);
  }

  #renderMainComponent() {
    const cards = this.cards;
    const cardCount = cards.length;

    // if (cardCount === 0) {
    //   this.#renderErrorMessage();
    //   return;
    // }

    render(this.#catalogueComponent, this.#mainContainer);
    render(this.#catalogueListComponent, this.#catalogueElement);

    this.#renderSort();

    if(cardCount === 0) {
      render(this.#notFoundComponent, this.#catalogueElement);
      this.#renderLoadMoreButton();
      return;
    }

    this.#renderCards(cards.slice(0, Math.min(cardCount, this.#renderedCardCount)));

    if (cardCount > this.#renderedCardCount) {
      this.#renderLoadMoreButton();
    }
  }
}
