import AbstractView from '../framework/view/abstract-view.js';

function createNoPointTemplate() {
  return (
    `<li class="catalogue__item"
      p class="trip-events__msg">Loading...</p>
    </li>`
  );
}

export default class LoadingView extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}
