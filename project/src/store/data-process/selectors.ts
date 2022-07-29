import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {CommentsType, OfferCard} from '../../types/offer-card';
import {City} from '../../types/types';

export const getCurrentOfferId = (state: State): number | null => state[NameSpace.Data].currentOfferId;
export const getCurrentOffer = (state: State): OfferCard | null => state[NameSpace.Data].currentOffer;
export const getComments = (state: State): CommentsType => state[NameSpace.Data].comments;
export const getOtherOffers = (state: State): OfferCard[] => state[NameSpace.Data].otherOffers;
export const getCity = (state: State): City => state[NameSpace.Data].city;
export const getSortBy = (state: State): string => state[NameSpace.Data].sortBy;
export const getOffers = (state: State): OfferCard[] => state[NameSpace.Data].offers;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
export const getOfferList = (state: State): OfferCard[] => state[NameSpace.Data].offerList;
