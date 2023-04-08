import AbstractView from '../framework/view/abstract-view.js';
import {ScrollTop} from '../consts.js';

function createLoadMoreBtnTemplate() {
  return `<div class="catalogue__btn-wrap">
        <button class="btn btn--outlined catalogue__show-more-btn" type="button">больше букетов
        </button>
        <button class="btn-round btn-round--to-top btn-round--size-small catalogue__to-top-btn" type="button" aria-label="наверх">
          <svg width="80" height="85" aria-hidden="true" focusable="false">
            <use xlink:href="#icon-round-button"></use>
          </svg>
        </button>
      </div>`;
}

export default class LoadMoreButtonView extends AbstractView {
  #handleClick = null;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;

    this.element.querySelector('.catalogue__show-more-btn').addEventListener('click', this.#clickHandler);
    this.element.querySelector('.catalogue__to-top-btn').addEventListener('click', this.#scrollBtnHandler);
  }

  get template() {
    return createLoadMoreBtnTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

  #scrollBtnHandler = () => {
    window.scrollTo(ScrollTop.X, ScrollTop.Y);
  }
}
