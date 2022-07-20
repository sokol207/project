import {City} from './types/types';

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

export const TypeOfferList = {
  CITY:'city',
  COMMENT:'comment'
};

export const CityList : City[] = [
  {
    name: 'Paris',
    point: {
      lat: 48.7,
      lng: 2.2,
    },
    zoom: 10
  },
  {
    name: 'Cologne',
    point: {
      lat: 50.9,
      lng: 6.9728,
    },
    zoom: 12
  },
  {
    name: 'Brussels',
    point: {
      lat: 50.50,
      lng: 4.21,
    },
    zoom: 10
  },
  {
    name: 'Amsterdam',
    point: {
      lat: 52.3909553943508,
      lng: 4.85309666406198,
    },
    zoom: 10
  },
  {
    name: 'Hamburg',
    point: {
      lat: 53.33,
      lng: 10.0,
    },
    zoom: 10
  },
  {
    name: 'Dusseldorf',
    point: {
      lat: 51.13,
      lng: 6.46,
    },
    zoom: 10
  }
];

