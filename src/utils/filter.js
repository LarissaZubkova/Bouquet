import {ReasonFilter, ColorFilter} from '../const.js';

function getFilterText(type) {
  return type ? type[0].toUpperCase() + type.slice(1) : '';
}

const filterReason = {
  [ReasonFilter.ALL.REASON_TYPE]: (cards) => cards,
  [ReasonFilter.BIRTHDAYBOY.REASON_TYPE]: (cards) => cards.filter((card) => card.type === ReasonFilter.BIRTHDAYBOY.FILTER_TYPE),
  [ReasonFilter.FORLOVE.REASON_TYPE]: (cards) => cards.filter((card) => card.type === ReasonFilter.FORLOVE.FILTER_TYPE),
  [ReasonFilter.BRIDGE.REASON_TYPE]: (cards) => cards.filter((card) => card.type === ReasonFilter.BRIDGE.FILTER_TYPE),
  [ReasonFilter.COLLEAGUES.REASON_TYPE]: (cards) => cards.filter((card) => card.type === ReasonFilter.COLLEAGUES.FILTER_TYPE),
  [ReasonFilter.MOTHERDAY.REASON_TYPE]: (cards) => cards.filter((card) => card.type === ReasonFilter.MOTHERDAY.FILTER_TYPE),
};

const filterByColor = {
  [ColorFilter.ALL.COLOR_NAME]: (cards) => cards,
  [ColorFilter.RED.COLOR_NAME]: (cards) => cards.filter((card) => card.color === ColorFilter.RED.FITER_TYPE),
  [ColorFilter.WHITE.COLOR_NAME]: (cards) => cards.filter((card) => card.color === ColorFilter.WHITE.FITER_TYPE),
  [ColorFilter.LILAC.COLOR_NAME]: (cards) => cards.filter((card) => card.color === ColorFilter.LILAC.FILTER_TYPE),
  [ColorFilter.YELLOW.COLOR_NAME]: (cards) => cards.filter((card) => card.color === ColorFilter.YELLOW.FILTER_TYPE),
  [ColorFilter.PINK.COLOR_NAME]: (cards) => cards.filter((card) => card.color === ColorFilter.PINK.FILTER_TYPE),
};

function filterColor(colors, cards){
  return colors.map((color) => filterByColor[color](cards)).flat();
}

export {getFilterText ,filterReason, filterColor};
