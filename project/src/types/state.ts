import {store} from '../store/index';
import {AuthorizationStatus} from '../const';
import {City} from './types';
import {CommentsType, OfferCard, OfferList} from './offer-card';
import {UserData} from './user-data';

export type HotelsData = {
  city: City;
  offers: OfferCard[];
  offerList: OfferCard[];
  sortBy: string;
  favoriteOffers: OfferList[];
  currentOfferId: number|null;
  currentOfferIdFromParam: number|null;
  currentOffer: OfferCard | null;
  comments: CommentsType;
  otherOffers: OfferCard[];
  error: string | null;
  isDataLoaded: boolean;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
