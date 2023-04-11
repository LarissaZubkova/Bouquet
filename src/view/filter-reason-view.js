import AbstractView from '../framework/view/abstract-view.js';
import {getFilterText} from '../utils/filter.js';

function createFilterItemTemplate(filter, currentFilterType, index) {
  const {type, name} = filter;

  return `<div class="filter-field-text filter-reason__form-field--for-${name} filter-reason__form-field">
            <input class="filter-field-text__input filter-reason__form-field--for-${name} filter-reason__form-field" type="radio" id="filter-reason-field-id-${index}" name="reason" value="for-${name}" ${type === currentFilterType ? 'checked' : ''}>
            <label class="filter-field-text__label" for="filter-reason-field-id-${index}"><span class="filter-field-text__text" data-filter-type="${type}">${getFilterText(type)}</span></label>
          </div>`;
}

function createFilterReasonTemplate(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems.map((filter, index) => createFilterItemTemplate(filter, currentFilterType, index)).join('');

  return `<section class="filter-reason">
      <div class="container">
        <h2 class="title title--h3 filter-reason__title">Выберите повод для букета</h2>
        <form class="filter-reason__form" action="#" method="post">
          <div class="filter-reason__form-fields">
          ${filterItemsTemplate}
          </div>
          <button class="filter-reason__btn visually-hidden" type="submit" tabindex="-1">применить фильтр</button>
        </form>
      </div>
    </section>`;
}

export default class FilterReasonView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filtersReason, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filtersReason;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterReasonTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.dataset.filterType) {
      this.#handleFilterTypeChange(evt.target.dataset.filterType);
    }
  };
}
