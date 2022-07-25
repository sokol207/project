export enum AppRoute{
  Login='/login',
  Offer='/offer/:id',
  Favorites='/favorites',
  Main='/'
}

export enum AuthorizationStatus{
  Auth='AUTH',
  NoAuth='NO_AUTH',
  Unknow = 'UNKNOW'
}

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

