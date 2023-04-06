import {render, replace, remove} from '../framework/render.js';
import FilterReasonView from '../view/filter-reason-view.js';
import FilterColorView from '../view/filter-color-view.js';
import {filterReason, filterColor} from '../utils/filter.js';
import {ReasonType, ReasonName, ColorType, ColorName, UpdateType} from '../consts.js';

export default class FiltersPresenter {
    #filterContainer = null;
    #filterModel = null;
    #cardsModel = null;

    #filterReasonComponent = null;
    #filterColorComponent = null;

    constructor({filterContainer, filterModel, cardsModel}) {
        this.#filterContainer = filterContainer;
        this.#filterModel = filterModel;
        this.#cardsModel = cardsModel;

        this.#cardsModel.addObserver(this.#handleModelEvent);
        this.#filterModel.addObserver(this.#handleModelEvent);
    }

    get filtersReason() {
        const cards = this.#cardsModel.cards;
        return [
            {
            type: ReasonType.ALL,
            name: ReasonName.ALL,
            count: filterReason[ReasonType.ALL](cards).length,
            },
            {
            type: ReasonType.BIRTHDAYBOY,
            name: ReasonName.BIRTHDAYBOY,
            count: filterReason[ReasonType.BIRTHDAYBOY](cards).length,
            },
            {
            type: ReasonType.FORLOVE,
            name: ReasonName.FORLOVE,
            count: filterReason[ReasonType.FORLOVE](cards).length,
            },
            {
            type: ReasonType.BRIDGE,
            name: ReasonName.BRIDGE,
            count: filterReason[ReasonType.BRIDGE](cards).length,
            },
            {
            type: ReasonType.COLLEAGUES,
            name: ReasonName.COLLEAGUES,
            count: filterReason[ReasonType.COLLEAGUES](cards).length,
            },
            {
            type: ReasonType.MOTHERDAY,
            name: ReasonName.MOTHERDAY,
            count: filterReason[ReasonType.MOTHERDAY](cards).length,
            },
        ]
    }

    get filterColor() {
      const cards = this.#cardsModel.cards;
      return [
        {
        type: ColorType.ALL,
        name: ColorName.ALL,
        count: filterColor[ColorType.ALL](cards).length,
        },
        {
        type: ColorType.RED,
        name: ColorName.RED,
        count: filterColor[ColorType.RED](cards).length,
        },
        {
        type: ColorType.WHITE,
        name: ColorName.WHITE,
        count: filterColor[ColorType.WHITE](cards).length,
        },
        {
        type: ColorType.LILAC,
        name: ColorName.LILAC,
        count: filterColor[ColorType.LILAC](cards).length,
        },
        {
        type: ColorType.YELLOW,
        name: ColorName.YELLOW,
        count: filterColor[ColorType.YELLOW](cards).length,
        },
        {
        type: ColorType.PINK,
        name: ColorName.PINK,
        count: filterColor[ColorType.PINK](cards).length,
        },
    ]
    }

    init() {
        const filtersReason = this.filtersReason;
        const filtersColor = this.filterColor;
        const prevFilterReasonComponent = this.#filterReasonComponent;
        const prevFilterColorComponent = this.#filterColorComponent;

        this.#filterReasonComponent = new FilterReasonView({
            filtersReason,
            currentFilterType: this.#filterModel.filterReason,
            onFilterTypeChange: this.#handleFilterTypeChange,
        })

        this.#filterColorComponent = new FilterColorView({
          filtersColor,
          currentFilterType: this.#filterModel.filterColor,
          onFilterTypeChange: this.#handleFilterTypeChange,
      })

        if (prevFilterReasonComponent === null) {
            render(this.#filterReasonComponent, this.#filterContainer);
          } else {
            replace(this.#filterReasonComponent, prevFilterReasonComponent);
            remove(prevFilterReasonComponent);
          }

          if (prevFilterColorComponent === null) {
            render(this.#filterColorComponent, this.#filterContainer);
          } else {
            replace(this.#filterColorComponent, prevFilterColorComponent);
            remove(prevFilterColorComponent);
          }
      }

    #handleModelEvent = () => {
      this.init();
    };

    #handleFilterTypeChange = (filterType) => {
        if (this.#filterModel.filterReason === filterType) {
          return;
        }

        this.#filterModel.setFilterReason(UpdateType.MAJOR, filterType);
      };
}
