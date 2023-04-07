import AbstractView from '../framework/view/abstract-view.js';

function createCatalogueTemplate() {
  return `<div class="catalogue" data-items="catalogue">
           <div class="container"></div>
        </div>`;
}

export default class CatalogueView extends AbstractView {
  get template() {
    return createCatalogueTemplate();
  }
}
