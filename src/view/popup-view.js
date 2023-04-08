import AbstractView from '../framework/view/abstract-view.js';

function createCardTemplate(cards) {
  return cards.map((card) => `<li class="popup-deferred__item">
  <div class="deferred-card">
    <div class="deferred-card__img">
      <picture>
        <source type="image/webp" srcset="img/content/defer1.webp, img/content/defer1@2x.webp 2x"><img src="img/content/defer1.jpg" srcset="img/content/defer1@2x.jpg 2x" width="233" height="393" alt="букет">
      </picture>
    </div>
    <div class="deferred-card__content">
      <h2 class="title title--h2">Нежные Ирисы</h2>
      <p class="text text--size-40">минималистичный букет для&nbsp;коллег и&nbsp;близких с&nbsp;ароматом весны</p>
    </div>
    <div class="deferred-card__count">
      <button class="btn-calculate" type="button">
        <svg width="30" height="27" aria-hidden="true">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button><span>1</span>
      <button class="btn-calculate" type="button">
        <svg width="30" height="28" aria-hidden="true">
          <use xlink:href="#icon-cross"></use>
        </svg>
      </button>
    </div>
    <div class="deferred-card__price"><b class="price price--size-middle-p">1 500<span>Р</span></b>
    </div>
    <button class="btn-close deferred-card__close-btn" type="button">
      <svg width="55" height="56" aria-hidden="true">
        <use xlink:href="#icon-close-big"></use>
      </svg>
    </button>
    <svg class="deferred-card__close-btn deferred-card__loader" width="56" height="56" aria-hidden="true">
      <use xlink:href="#icon-loader"></use>
    </svg>
  </div>
</li>`
  ).join('');
}
function createPopupTemplate() {
  return `<section class="popup-deferred" style="display:block;">
  <div class="popup-deferred__wrapper">
    <section class="hero hero--popup">
      <div class="hero__wrapper">
        <div class="hero__background">
          <picture>
            <source type="image/webp" srcset="img/content/hero-back-popup.webp, img/content/hero-back-popup@2x.webp 2x"><img src="img/content/hero-back-popup.jpg" srcset="img/content/hero-back-popup@2x.jpg 2x" width="1770" height="601" alt="фоновая картинка">
          </picture>
        </div>
        <div class="hero__content">
          <h2 class="title title--h1">Вас<br>заинтересовали</h2>
          <button class="btn-close btn-close--dark hero__popupclose" type="button" aria-label="Закрыть">
            <svg width="56" height="54" aria-hidden="true">
              <use xlink:href="#icon-union"></use>
            </svg>
          </button>
          <div class="btn-close btn-close--dark hero__loader">
            <svg class="hero__loader-icon" width="56" height="56" aria-hidden="true">
              <use xlink:href="#icon-loader"></use>
            </svg>
          </div>
        </div>
      </div>
    </section>
    <div class="popup-deferred__container">
      <a class="btn btn--with-icon popup-deferred__btn btn--light" href="#">в&nbsp;каталог
        <svg width="61" height="24" aria-hidden="true">
          <use xlink:href="#icon-arrow"></use>
        </svg>
      </a>
      <ul class="popup-deferred__catalog">
        <li class="popup-deferred__item">
          <div class="deferred-card">
            <div class="deferred-card__img">
              <picture>
                <source type="image/webp" srcset="img/content/defer1.webp, img/content/defer1@2x.webp 2x"><img src="img/content/defer1.jpg" srcset="img/content/defer1@2x.jpg 2x" width="233" height="393" alt="букет">
              </picture>
            </div>
            <div class="deferred-card__content">
              <h2 class="title title--h2">Нежные Ирисы</h2>
              <p class="text text--size-40">минималистичный букет для&nbsp;коллег и&nbsp;близких с&nbsp;ароматом весны</p>
            </div>
            <div class="deferred-card__count">
              <button class="btn-calculate" type="button">
                <svg width="30" height="27" aria-hidden="true">
                  <use xlink:href="#icon-minus"></use>
                </svg>
              </button><span>1</span>
              <button class="btn-calculate" type="button">
                <svg width="30" height="28" aria-hidden="true">
                  <use xlink:href="#icon-cross"></use>
                </svg>
              </button>
            </div>
            <div class="deferred-card__price"><b class="price price--size-middle-p">1 500<span>Р</span></b>
            </div>
            <button class="btn-close deferred-card__close-btn" type="button">
              <svg width="55" height="56" aria-hidden="true">
                <use xlink:href="#icon-close-big"></use>
              </svg>
            </button>
            <svg class="deferred-card__close-btn deferred-card__loader" width="56" height="56" aria-hidden="true">
              <use xlink:href="#icon-loader"></use>
            </svg>
          </div>
        </li>
        <li class="popup-deferred__item">
          <div class="deferred-card">
            <div class="deferred-card__img">
              <picture>
                <source type="image/webp" srcset="img/content/defer2.webp, img/content/defer2@2x.webp 2x"><img src="img/content/defer2.jpg" srcset="img/content/defer2@2x.jpg 2x" width="319" height="384" alt="букет">
              </picture>
            </div>
            <div class="deferred-card__content">
              <h2 class="title title--h2">Белые облака</h2>
              <p class="text text--size-40">монобукет из&nbsp;трёх нежнейших гортензий</p>
            </div>
            <div class="deferred-card__count">
              <button class="btn-calculate" type="button">
                <svg width="30" height="27" aria-hidden="true">
                  <use xlink:href="#icon-minus"></use>
                </svg>
              </button><span>2</span>
              <button class="btn-calculate" type="button">
                <svg width="30" height="28" aria-hidden="true">
                  <use xlink:href="#icon-cross"></use>
                </svg>
              </button>
            </div>
            <div class="deferred-card__price"><b class="price price--size-middle-p">8 400<span>Р</span></b>
            </div>
            <button class="btn-close deferred-card__close-btn" type="button">
              <svg width="55" height="56" aria-hidden="true">
                <use xlink:href="#icon-close-big"></use>
              </svg>
            </button>
            <svg class="deferred-card__close-btn deferred-card__loader" width="56" height="56" aria-hidden="true">
              <use xlink:href="#icon-loader"></use>
            </svg>
          </div>
        </li>
        <li class="popup-deferred__item">
          <div class="deferred-card">
            <div class="deferred-card__img">
              <picture>
                <source type="image/webp" srcset="img/content/defer3.webp, img/content/defer3@2x.webp 2x"><img src="img/content/defer3.jpg" srcset="img/content/defer3@2x.jpg 2x" width="344" height="408" alt="букет">
              </picture>
            </div>
            <div class="deferred-card__content">
              <h2 class="title title--h2">Летнее настроение</h2>
              <p class="text text--size-40">сочетание полевых и&nbsp;садовых цветов: розы, львиный&nbsp;зев, чертополох, тюльпаны и&nbsp;эустома</p>
            </div>
            <div class="deferred-card__count">
              <button class="btn-calculate" type="button">
                <svg width="30" height="27" aria-hidden="true">
                  <use xlink:href="#icon-minus"></use>
                </svg>
              </button><span>1</span>
              <button class="btn-calculate" type="button">
                <svg width="30" height="28" aria-hidden="true">
                  <use xlink:href="#icon-cross"></use>
                </svg>
              </button>
            </div>
            <div class="deferred-card__price"><b class="price price--size-middle-p">5 800<span>Р</span></b>
            </div>
            <button class="btn-close deferred-card__close-btn" type="button">
              <svg width="55" height="56" aria-hidden="true">
                <use xlink:href="#icon-close-big"></use>
              </svg>
            </button>
            <svg class="deferred-card__close-btn deferred-card__loader" width="56" height="56" aria-hidden="true">
              <use xlink:href="#icon-loader"></use>
            </svg>
          </div>
        </li>
      </ul>
      <div class="popup-deferred__btn-container">
        <button class="btn btn--with-icon popup-deferred__btn-clean" type="button">очистить
          <svg width="61" height="24" aria-hidden="true">
            <use xlink:href="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div class="popup-deferred__sum">
        <p class="text text--total">Итого вы выбрали:</p>
        <div class="popup-deferred__block-wrap">
          <div class="popup-deferred__block">
            <p class="text text--total">Букеты</p><span class="popup-deferred__count" data-atribut="count-defer">4</span>
          </div>
          <div class="popup-deferred__block">
            <p class="text text--total">Сумма</p><b class="price price--size-middle-p">15 700<span>Р</span></b>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

export default class PopupView extends AbstractView {
  get template() {
    return createPopupTemplate();
  }
}
