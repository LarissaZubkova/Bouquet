const AUTHORIZATION = 'Basic hS2sfSff4wcj356hg';
const END_POINT = 'https://grading.objects.pages.academy/flowers-shop';

const CARD_COUNT_PER_STEP = 6;

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const MAX_DESCRIPTION_LENGTH = 140;

const ReasonType = {
  ALL: 'для всех',
  BIRTHDAYBOY: 'имениннику',
  FORLOVE: 'любимой',
  BRIDGE: 'невесте',
  COLLEAGUES: 'коллеге',
  MOTHERDAY: 'маме',
}

const ReasonName = {
  ALL: 'all',
  BIRTHDAYBOY: 'birthday',
  FORLOVE: 'darling',
  BRIDGE: 'bride',
  COLLEAGUES: 'colleague',
  MOTHERDAY: 'mother',
}

const ColorType = {
  ALL: 'все цвета',
  RED: 'красный',
  WHITE: 'белый',
  LILAC: 'сиреневый',
  YELLOW: 'жёлтый',
  PINK: 'розовый',
}

const Mode = {
  DEFAULT: 'DEFAULT',
  MODAL: 'MODAL',
};

export {
  AUTHORIZATION,
  END_POINT,
  CARD_COUNT_PER_STEP,
  UpdateType,
  MAX_DESCRIPTION_LENGTH,
  ReasonType,
  ColorType,
  Mode,
  ReasonName,
}
