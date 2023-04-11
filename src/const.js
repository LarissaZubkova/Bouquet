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
    REASON_NAME: 'all',
  },
  BIRTHDAYBOY: {
    REASON_TYPE: 'имениннику',
    REASON_NAME: 'birthday',
    FILTER_TYPE: 'birthdayboy',
  },
  FORLOVE: {
    REASON_TYPE: 'любимой',
    REASON_NAME: 'darling',
    FILTER_TYPE: 'forlove',
  },
  BRIDGE: {
    REASON_TYPE: 'невесте',
    REASON_NAME: 'bride',
    FILTER_TYPE: 'bridge',
  },
  COLLEAGUES: {
    REASON_TYPE: 'коллеге',
    REASON_NAME: 'colleague',
    FILTER_TYPE: 'colleagues',
  },
  MOTHERDAY: {
    REASON_TYPE: 'маме',
    REASON_NAME: 'mother',
    FILTER_TYPE: 'motherday',
  }
};

const ColorFilter = {
  ALL: {
    COLOR_TYPE: 'все цвета',
    COLOR_NAME: 'all',
  },
  RED: {
    COLOR_TYPE: 'красный',
    COLOR_NAME: 'red',
    FITER_TYPE: 'red',
  },
  WHITE: {
    COLOR_TYPE: 'белый',
    COLOR_NAME: 'white',
    FITER_TYPE: 'white',
  },
  LILAC: {
    COLOR_TYPE: 'сиреневый',
    COLOR_NAME: 'lilac',
    FILTER_TYPE: 'violet',
  },
  YELLOW: {
    COLOR_TYPE: 'жёлтый',
    COLOR_NAME: 'yellow',
    FILTER_TYPE: 'yellow',
  },
  PINK: {
    COLOR_TYPE: 'розовый',
    COLOR_NAME: 'pink',
    FILTER_TYPE: 'pink',
  }
};

const Mode = {
  DEFAULT: 'DEFAULT',
  MODAL: 'MODAL',
};

const ErrorMessage = {
  ADD_CARD: 'Can\'t add card',
  DELETE_CARD: 'Can\'t delete card',
};

const UserAction = {
  ADD_CARD: 'ADD_CARD',
  DELETE_CARD: 'DELETE_CARD',
};

const ActionType = {
  CLEAN: 'CLEAN',
  DELETE_ALL: 'DELETE_ALL',
  DELETE: 'DELETE',
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

const ScrollTop = {
  X: 0,
  Y: 0,
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const SLIDER_IMAGE_NUMBER = 1;

const ImagePosition = {
  START: 0,
  STEP: 1100,
};

const TRANSITION_DURATION = '700ms';
const SLIDER_STEP = 1;

const Url = {
  PRODUCTS: 'products',
  CART: 'cart',
};

export {
  AUTHORIZATION,
  END_POINT,
  CARD_COUNT_PER_STEP,
  UpdateType,
  MAX_DESCRIPTION_LENGTH,
  ReasonFilter,
  Mode,
  ColorFilter,
  ErrorMessage,
  UserAction,
  Method,
  SortType,
  ScrollTop,
  TimeLimit,
  ActionType,
  SLIDER_IMAGE_NUMBER,
  ImagePosition,
  TRANSITION_DURATION,
  SLIDER_STEP,
  Url,
};
