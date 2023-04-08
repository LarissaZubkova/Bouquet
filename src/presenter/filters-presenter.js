import {render, replace, remove} from '../framework/render.js';
import FilterReasonView from '../view/filter-reason-view.js';
import FilterColorView from '../view/filter-color-view.js';
import {filterReason, filterColor} from '../utils/filter.js';
import {ReasonFilter, ColorFilter, ColorName, UpdateType} from '../consts.js';

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
          type: ReasonFilter.ALL.REASON_TYPE,
          name: ReasonFilter.ALL.REASUN_NAME,
          count: filterReason[ReasonFilter.ALL.REASON_TYPE](cards).length,
          },
          {
          type: ReasonFilter.BIRTHDAYBOY.REASON_TYPE,
          name: ReasonFilter.BIRTHDAYBOY.REASUN_NAME,
          count: filterReason[ReasonFilter.BIRTHDAYBOY.REASON_TYPE](cards).length,
          },
          {
          type: ReasonFilter.FORLOVE.REASON_TYPE,
          name: ReasonFilter.FORLOVE.REASUN_NAME,
          count: filterReason[ReasonFilter.FORLOVE.REASON_TYPE](cards).length,
          },
          {
          type: ReasonFilter.BRIDGE.REASON_TYPE,
          name: ReasonFilter.BRIDGE.REASUN_NAME,
          count: filterReason[ReasonFilter.BRIDGE.REASON_TYPE](cards).length,
          },
          {
          type: ReasonFilter.COLLEAGUES.REASON_TYPE,
          name: ReasonFilter.COLLEAGUES.REASUN_NAME,
          count: filterReason[ReasonFilter.COLLEAGUES.REASON_TYPE](cards).length,
          },
          {
          type: ReasonFilter.MOTHERDAY.REASON_TYPE,
          name: ReasonFilter.MOTHERDAY.REASUN_NAME,
          count: filterReason[ReasonFilter.MOTHERDAY.REASON_TYPE](cards).length,
          },
        ]
    }

    get filterColor() {
      const cards = this.#cardsModel.cards;
      return [
        {
        type: ColorFilter.ALL.COLOR_TYPE,
        name: ColorFilter.ALL.COLOR_NAME,
       // count: filterColor[ColorType.ALL](cards).length,
        },
        {
        type: ColorFilter.RED.COLOR_TYPE,
        name: ColorFilter.RED.COLOR_NAME,
        //count: filterColor[ColorType.RED](cards).length,
        },
        {
        type: ColorFilter.WHITE.COLOR_TYPE,
        name: ColorFilter.WHITE.COLOR_NAME,
        //count: filterColor[ColorType.WHITE](cards).length,
        },
        {
        type: ColorFilter.LILAC.COLOR_TYPE,
        name: ColorFilter.LILAC.COLOR_NAME,
        //count: filterColor[ColorType.LILAC](cards).length,
        },
        {
        type: ColorFilter.YELLOW.COLOR_TYPE,
        name: ColorFilter.YELLOW.COLOR_NAME,
        //count: filterColor[ColorType.YELLOW](cards).length,
        },
        {
        type: ColorFilter.PINK.COLOR_TYPE,
        name: ColorFilter.PINK.COLOR_NAME,
        //count: filterColor[ColorType.PINK](cards).length,
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
            onFilterTypeChange: this.#handleFilterReasonTypeChange,
        })

        this.#filterColorComponent = new FilterColorView({
          filtersColor,
          currentFilterType: this.#filterModel.filterColor,
          onFilterTypeChange: this.#handleFilterColorTypeChange,
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

    destroy() {
      remove(this.#filterReasonComponent);
      remove(this.#filterColorComponent);
    }

    #handleModelEvent = () => {
      this.init();
    };

    #handleFilterReasonTypeChange = (filterType) => {
        if (this.#filterModel.filterReason === filterType) {
          return;
        }

        this.#filterModel.setFilterReason(UpdateType.MAJOR, filterType);
      };

      #handleFilterColorTypeChange = (filterType) => {
        // if (this.#filterModel.filterColor === filterType) {
        //   return;
        // }
        if (filterType === ColorFilter.ALL.COLOR_NAME) {
          this.#filterModel.setFilterAllColor(UpdateType.MAJOR, filterType);
        } else {
          this.#filterModel.setFilterColor(UpdateType.MAJOR, filterType);
        }
      };
}
