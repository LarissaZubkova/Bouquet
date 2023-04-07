import {ReasonFilter, ColorType} from '../consts.js';

const filterReason = {
  [ReasonFilter.ALL.REASON_TYPE]: (cards) => cards,
  [ReasonFilter.BIRTHDAYBOY.REASON_TYPE]: (cards) => cards.filter((card) => card.type === ReasonFilter.BIRTHDAYBOY.FILTER_TYPE),
  [ReasonFilter.FORLOVE.REASON_TYPE]: (cards) => cards.filter((card) => card.type === ReasonFilter.FORLOVE.FILTER_TYPE),
  [ReasonFilter.BRIDGE.REASON_TYPE]: (cards) => cards.filter((card) => card.type === ReasonFilter.BRIDGE.FILTER_TYPE),
  [ReasonFilter.COLLEAGUES.REASON_TYPE]: (cards) => cards.filter((card) => card.type === ReasonFilter.COLLEAGUES.FILTER_TYPE),
  [ReasonFilter.MOTHERDAY.REASON_TYPE]: (cards) => cards.filter((card) => card.type === ReasonFilter.MOTHERDAY.FILTER_TYPE),
};

const filterColor = {
  [ColorType.ALL]: (cards) => cards,
  [ColorType.RED]: (cards) => cards.filter((card) => card.color === ColorType.RED),
  [ColorType.WHITE]: (cards) => cards.filter((card) => card.color === ColorType.WHITE),
  [ColorType.LILAC]: (cards) => cards.filter((card) => card.color === ColorType.LILAC),
  [ColorType.YELLOW]: (cards) => cards.filter((card) => card.color === ColorType.YELLOW),
  [ColorType.PINK]: (cards) => cards.filter((card) => card.color === ColorType.PINK),
}

export {filterReason, filterColor};
