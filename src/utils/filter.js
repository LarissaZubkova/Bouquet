import {ReasonType, ColorType} from '../consts.js';

const filterReason = {
  [ReasonType.ALL]: (cards) => cards,
  [ReasonType.BIRTHDAYBOY]: (cards) => cards.filter((card) => {
    console.log(card, ReasonType.BIRTHDAYBOY)
    return card.type === ReasonType.BIRTHDAYBOY
  }),
  [ReasonType.FORLOVE]: (cards) => cards.filter((card) => card.type === ReasonType.FORLOVE),
  [ReasonType.BRIDGE]: (cards) => cards.filter((card) => card.type === ReasonType.BRIDGE),
  [ReasonType.COLLEAGUES]: (cards) => cards.filter((card) => card.type === ReasonType.COLLEAGUES),
  [ReasonType.MOTHERDAY]: (cards) => cards.filter((card) => card.type === ReasonType.MOTHERDAY),
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
