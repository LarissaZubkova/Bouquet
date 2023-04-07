import Observable from '../framework/observable.js';
import {ReasonFilter, ColorType} from '../consts.js';

export default class FilterModel extends Observable {
  #filterReason = ReasonFilter.ALL.REASON_TYPE;
  #filterColor = ColorType.ALL;

  get filterReason() {
    return this.#filterReason;
  }

  get filterColor() {
    return this.#filterColor;
  }

  setFilterReason(updateType, filterReason) {
    this.#filterReason = filterReason;
    this._notify(updateType, filterReason);
  }

  setFilterColor(updateType, filterColor) {
    this.#filterColor = filterColor;
    this._notify(updateType, filterColor);
  }
}
