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

const ReasonFilter = {
  ALL: {
    REASON_TYPE: 'для всех',
    REASUN_NAME: 'all',
  },
  BIRTHDAYBOY: {
    REASON_TYPE: 'имениннику',
    REASUN_NAME: 'birthday',
    FILTER_TYPE: 'birthdayboy',
  },
  FORLOVE: {
    REASON_TYPE: 'любимой',
    REASUN_NAME: 'darling',
    FILTER_TYPE: 'forlove',
  },
  BRIDGE: {
    REASON_TYPE: 'невесте',
    REASUN_NAME: 'bride',
    FILTER_TYPE: 'bridge',
  },
  COLLEAGUES: {
    REASON_TYPE: 'коллеге',
    REASUN_NAME: 'colleague',
    FILTER_TYPE: 'colleagues',
  },
  MOTHERDAY: {
    REASON_TYPE: 'маме',
    REASUN_NAME: 'mother',
    FILTER_TYPE: 'motherday',
  }
}
// const ReasonType = {
//   ALL: 'для всех',
//   BIRTHDAYBOY: 'имениннику',
//   FORLOVE: 'любимой',
//   BRIDGE: 'невесте',
//   COLLEAGUES: 'коллеге',
//   MOTHERDAY: 'маме',
// }

// const ReasonName = {
//   ALL: 'all',
//   BIRTHDAYBOY: 'birthday',
//   FORLOVE: 'darling',
//   BRIDGE: 'bride',
//   COLLEAGUES: 'colleague',
//   MOTHERDAY: 'mother',
// }

const ColorType = {
  ALL: 'все цвета',
  RED: 'красный',
  WHITE: 'белый',
  LILAC: 'сиреневый',
  YELLOW: 'жёлтый',
  PINK: 'розовый',
}

const ColorName = {
  ALL: 'all',
  RED: 'red',
  WHITE: 'white',
  LILAC: 'lilac',
  YELLOW: 'yellow',
  PINK: 'pink',
}

const Mode = {
  DEFAULT: 'DEFAULT',
  MODAL: 'MODAL',
};

const ErrorMessage = {
  ADD_COMMENT: 'Can\'t add comment',
  UPDATE_FILM: 'Can\'t update film',
};

const UserAction = {
  UPDATE_CARD: 'UPDATE_Card',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SortType = {
  INCREASE: 'increase',
  DESCENDING: 'descending',
};

export {
  AUTHORIZATION,
  END_POINT,
  CARD_COUNT_PER_STEP,
  UpdateType,
  MAX_DESCRIPTION_LENGTH,
  ReasonFilter,
  ColorType,
  Mode,

  ColorName,
  ErrorMessage,
  UserAction,
  Method,
  SortType,
}
