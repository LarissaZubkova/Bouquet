import AbstractView from '../framework/view/abstract-view.js';

function createCatalogeTemplate() {
  return `<div class="catalogue" data-items="catalogue">
           <div class="container"></div>
        </div>`;
}

export default class CatalogeView extends AbstractView {
  get template() {
    return createCatalogeTemplate();
  }
}
