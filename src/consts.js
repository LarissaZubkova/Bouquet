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

const TYPES = {
  birthdayboy: 'имениннику',
  forlove: 'любимой',
  bridge: 'невесте',
  colleagues: 'коллеге',
  motherday: 'маме',
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
  TYPES,
  Mode,
}
