import {render, replace, remove} from '../framework/render.js';
import FilterReasonView from '../view/filter-reason-view.js';
import FilterColorView from '../view/filter-color-view.js';
import {filterReason, filterColor} from '../utils/filter.js';
import {ReasonType, ReasonName, ColorType, UpdateType} from '../consts.js';

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

        // this.#cardsModel.addObserver(this.#handleModalEvent);
        // this.#filterModel.addObserver(this.#handleModalEvent);
    }

    get filtersReason() {
        const cards = this.#cardsModel;
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
      const cards = this.#cardsModel;
      return [
        {
        type: ColorType.ALL,
        name: ColorType.ALL,
        count: filterColor[ColorType.ALL](cards).length,
        },
        {
        type: ColorType.RED,
        name: ColorType.RED,
        count: filterColor[ColorType.RED](cards).length,
        },
        {
        type: ColorType.WHITE,
        name: ColorType.WHITE,
        count: filterColor[ColorType.WHITE](cards).length,
        },
        {
        type: ColorType.LILAC,
        name: ColorType.LILAC,
        count: filterColor[ColorType.LILAC](cards).length,
        },
        {
        type: ColorType.YELLOW,
        name: ColorType.YELLOW,
        count: filterColor[ColorType.YELLOW](cards).length,
        },
        {
        type: ColorType.PINK,
        name: ColorType.PINK,
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

        if (prevFilterReasonComponent === null ||  prevFilterColorComponent === null) {
            render(this.#filterReasonComponent, this.#filterContainer);
            render(this.#filterColorComponent, this.#filterContainer);
          } else {
            replace(this.#filterReasonComponent, prevFilterReasonComponent);
            replace(this.#filterColorComponent, prevFilterColorComponent);

            remove(prevFilterReasonComponent);
            remove(prevFilterColorComponent);
          }
      }

    #handleFilterTypeChange = (filterType) => {
        if (this.#filterModel.filterReason === filterType) {
          return;
        }
    
        this.#filterModel.setFilterReason(UpdateType.MAJOR, filterType);
      };
}