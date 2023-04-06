import Observable from '../framework/observable.js';
import {ReasonType, ColorType} from '../consts.js';

export default class FilterModel extends Observable {
  #filterReason = ReasonType.ALL;
  #filterColor = ColorType.ALL;

  get filterReason() {
    return this.#filterReason;
  }

  get filterColor() {
    return this.#filterColor;
  }

  setFilterReason(updateType, filterReason) {
    console.log(updateType, filterReason)
    this.#filterReason = filterReason;
    this._notify(updateType, filterReason);
  }
}
