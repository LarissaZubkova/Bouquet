import Observable from '../framework/observable.js';
import {ReasonFilter, ColorFilter} from '../consts.js';

export default class FilterModel extends Observable {
  #filterReason = ReasonFilter.ALL.REASON_TYPE;
  #filterColor = [ColorFilter.ALL.COLOR_NAME];

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
    if (this.#filterColor.includes(ColorFilter.ALL.COLOR_NAME)) {
      this.#filterColor = this.#filterColor.filter((color) => color !== ColorFilter.ALL.COLOR_NAME);
    }
    if (this.#filterColor.includes(filterColor)) {
      this.#filterColor = this.#filterColor.filter((color) => color !== filterColor);
    } else {
      this.#filterColor.push(filterColor);
    }
    if (this.#filterColor.length === 0) {
      this.#filterColor = [ColorFilter.ALL.COLOR_NAME];
    }

    this._notify(updateType, filterColor);
  }

  setFilterAllColor(updateType, filterColor) {
    if (this.#filterColor.includes(ColorFilter.ALL.COLOR_NAME)) {
      return;
    }

    this.#filterColor = [filterColor];
    this._notify(updateType, filterColor);
  }
}
