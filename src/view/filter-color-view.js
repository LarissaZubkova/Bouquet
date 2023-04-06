import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, currentFilterType, index) {
  const {type, name} = filter;
  return `<div class="filter-field-img filter-color__form-field">
       <input class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-${index}" name="colors" value="color-${name}" ${type === currentFilterType ? 'checked' : ''} data-filter-color="color-${name}">
       <label class="filter-field-img__label" for="filter-colors-field-id-${index}"><span class="filter-field-img__img">
         <picture>
          <source type="image/webp" srcset="img/content/filter-${name}.webp, img/content/filter-${name}@2x.webp 2x"><img src="img/content/filter-${name}.png" srcset="img/content/filter-${name}@2x.png 2x" width="130" height="130" alt="${type}">
         </picture></span><span class="filter-field-img__text">${type}</span></label>
       </div>`;
}

function createFilterColorTemplate(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems.map((filter, index) => createFilterItemTemplate(filter, currentFilterType, index)).join('');
  return `<section class="filter-color">
  <div class="container">
    <h2 class="title title--h3 filter-color__title">Выберите основной цвет для букета</h2>
    <form class="filter-color__form" action="#" method="post">
      <div class="filter-color__form-fields" data-filter-color="filter">
      ${filterItemsTemplate}

      </div>
      <button class="visually-hidden" type="submit" tabindex="-1">применить фильтр</button>
    </form>
  </div>
</section>`;
}

export default class FilterColorView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filtersColor, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filtersColor;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterColorTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();

    // if (evt.target.dataset.filterType) {
    //   this.#handleFilterTypeChange(evt.target.dataset.filterType);
    // }
  };
}
