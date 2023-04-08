import {SortType} from '../consts.js';
import AbstractView from '../framework/view/abstract-view.js';

function createSortTemplate(currentSortType) {
  return `<div class="catalogue__header" id="catalogue">
         <h2 class="title title--h3 catalogue__title">Каталог</h2>
         <div class="catalogue__sorting">
           <div class="sorting-price">
             <h3 class="title sorting-price__title">Цена</h3>
             <a class="sorting-price__link sorting-price__link--incr ${currentSortType === SortType.INCREASE ? 'sorting-price__link--active' : ''}" href="#" aria-label="сортировка по возрастанию цены">
               <svg class="sorting-price__icon" width="50" height="46" aria-hidden="true" data-sort-type="${SortType.INCREASE}">
                 <use xlink:href="#icon-increase-sort" onclick="return false"></use>
               </svg></a>
               <a class="sorting-price__link ${currentSortType === SortType.DESCENDING ? 'sorting-price__link--active' : ''}" href="#" aria-label="сортировка по убыванию цены">
               <svg class="sorting-price__icon" width="50" height="46" aria-hidden="true" data-sort-type="${SortType.DESCENDING}">
                 <use xlink:href="#icon-descending-sort" onclick="return false"></use>
               </svg></a>
           </div>
         </div>
       </div>`;
}

export default class SortView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (!evt.target.classList.contains('sorting-price__icon')) {
         return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
