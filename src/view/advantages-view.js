import AbstractView from '../framework/view/abstract-view.js';

function createAdvantagesTemplate() {
  return `<section class="advantages">
        <div class="container">
          <div class="advantages__wrapper">
            <div class="advantages__img">
              <picture>
                <source type="image/webp" srcset="img/content/flor-saurina.webp, img/content/flor-saurina@2x.webp 2x"><img src="img/content/flor-saurina.png" srcset="img/content/flor-saurina@2x.png 2x" width="1044" height="810" alt="букет">
              </picture>
            </div>
            <div class="advantages__content"></div>
            <h2 class="title title--h3">Почему мы</h2>
            <ul class="advantages-list">
              <li class="advantages-list__item">
                <p>доставка<br>за&nbsp;1&nbsp;час</p>
                <svg width="122" height="82" aria-hidden="true">
                  <use xlink:href="#icon-delivery"></use>
                </svg>
              </li>
              <li class="advantages-list__item">
                <p>индивидуальный<br>подход</p>
                <svg width="66" height="82" aria-hidden="true">
                  <use xlink:href="#icon-men"></use>
                </svg>
              </li>
              <li class="advantages-list__item">
                <p>приятные<br>цены</p>
                <svg width="85" height="83" aria-hidden="true">
                  <use xlink:href="#icon-like"></use>
                </svg>
              </li>
            </ul>
          </div>
        </div>
      </section>`;
}

export default class AdvantagesView extends AbstractView {
  get template() {
    return createAdvantagesTemplate();
  }
}
