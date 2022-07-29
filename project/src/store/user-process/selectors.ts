import {NameSpace,AuthorizationStatus} from '../../const';
import {State} from '../../types/state';
import {UserData} from '../../types/user-data';
import {OfferList} from '../../types/offer-card';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUser = (state: State): UserData | null => state[NameSpace.User].user;
export const getFavoriteOffers = (state: State): OfferList[] => state[NameSpace.User].favoriteOffers;
export const getCountFavoriteOffers = (state: State): number => state[NameSpace.User].countFavoriteOffers;
