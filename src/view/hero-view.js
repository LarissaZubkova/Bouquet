import AbstractView from '../framework/view/abstract-view.js';

function createHeroTemplate() {
  return `<section class="hero">
      <div class="hero__wrapper">
        <div class="hero__background">
          <picture>
            <source type="image/webp" srcset="img/content/hero-back.webp, img/content/hero-back@2x.webp 2x"><img src="img/content/hero-back.jpg" srcset="img/content/hero-back@2x.jpg 2x" width="1770" height="601" alt="фоновая картинка">
          </picture>
        </div>
        <div class="hero__content">
          <h2 class="title title--h1">Букеты<br>для<br>самых близких</h2>
          <a class="btn btn--with-icon btn--hero" href="#catalogue">выбрать
            <svg width="61" height="22" aria-hidden="true">
              <use xlink:href="#icon-arrow"></use>
            </svg>
          </a>
        </div>
      </div>
    </section>`;
}

export default class HeroView extends AbstractView {
  get template() {
    return createHeroTemplate();
  }
}
