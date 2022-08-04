import {City, PointsWithId, PointWithId} from './types/types';
import {OfferCard} from './types/offer-card';

export enum AppRoute{
  Login='/login',
  Offer='/offer/:id',
  Favorites='/favorites',
  Main='/',
  NotFound='/notFound'
}

export enum AuthorizationStatus{
  Auth='AUTH',
  NoAuth='NO_AUTH',
  Unknown = 'UNKNOW'
}

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const TypeOfferList = {
  CITY:'city',
  COMMENT:'comment',
  FAVORITE:'favorite'
};

export const CityList : City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.0006540,
      zoom: 13
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  }
];

export const SortList = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first'
];

export function pointForMap(offer:OfferCard) : PointWithId{
  return {id:offer.id,point:offer.location};
}

export function pointsForMap(offers: OfferCard[]) : PointsWithId{
  if(offers.length > 0) {
    return offers.map(pointForMap);
  }else {
    return [];
  }
}

export function starMark(mark:number) : string{
  const markStarValue = ((mark / 5) * 100);
  return `${markStarValue}%`;
}

export enum APIRoute {
  Hotels = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
}

export const TIMEOUT_SHOW_ERROR = 2000;

export const isCheckedAuth = (authorizationStatus: string): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
}
