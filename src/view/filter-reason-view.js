import AbstractView from '../framework/view/abstract-view.js';

function createFilterReasonTemplate() {
  return `<section class="filter-reason">
      <div class="container">
        <h2 class="title title--h3 filter-reason__title">Выберите повод для букета</h2>
        <form class="filter-reason__form" action="#" method="post">
          <div class="filter-reason__form-fields">
            <div class="filter-field-text filter-reason__form-field--for-all filter-reason__form-field">
              <input class="filter-field-text__input filter-reason__form-field--for-all filter-reason__form-field" type="radio" id="filter-reason-field-id-0" name="reason" value="for-all" checked>
              <label class="filter-field-text__label" for="filter-reason-field-id-0"><span class="filter-field-text__text">Для всех</span></label>
            </div>
            <div class="filter-field-text filter-reason__form-field--for-birthday filter-reason__form-field">
              <input class="filter-field-text__input filter-reason__form-field--for-birthday filter-reason__form-field" type="radio" id="filter-reason-field-id-1" name="reason" value="for-birthday">
              <label class="filter-field-text__label" for="filter-reason-field-id-1"><span class="filter-field-text__text">Имениннику</span></label>
            </div>
            <div class="filter-field-text filter-reason__form-field--for-bride filter-reason__form-field">
              <input class="filter-field-text__input filter-reason__form-field--for-bride filter-reason__form-field" type="radio" id="filter-reason-field-id-2" name="reason" value="for-bride">
              <label class="filter-field-text__label" for="filter-reason-field-id-2"><span class="filter-field-text__text">Невесте</span></label>
            </div>
            <div class="filter-field-text filter-reason__form-field--for-mother filter-reason__form-field">
              <input class="filter-field-text__input filter-reason__form-field--for-mother filter-reason__form-field" type="radio" id="filter-reason-field-id-3" name="reason" value="for-mother">
              <label class="filter-field-text__label" for="filter-reason-field-id-3"><span class="filter-field-text__text">Маме</span></label>
            </div>
            <div class="filter-field-text filter-reason__form-field--for-colleague filter-reason__form-field">
              <input class="filter-field-text__input filter-reason__form-field--for-colleague filter-reason__form-field" type="radio" id="filter-reason-field-id-4" name="reason" value="for-colleague">
              <label class="filter-field-text__label" for="filter-reason-field-id-4"><span class="filter-field-text__text">Коллеге</span></label>
            </div>
            <div class="filter-field-text filter-reason__form-field--for-darling filter-reason__form-field">
              <input class="filter-field-text__input filter-reason__form-field--for-darling filter-reason__form-field" type="radio" id="filter-reason-field-id-5" name="reason" value="for-darling">
              <label class="filter-field-text__label" for="filter-reason-field-id-5"><span class="filter-field-text__text">Любимой</span></label>
            </div>
          </div>
          <button class="filter-reason__btn visually-hidden" type="submit" tabindex="-1">применить фильтр</button>
        </form>
      </div>
    </section>`;
}

export default class FilterReasonView extends AbstractView {
  get template() {
    return createFilterReasonTemplate();
  }
}