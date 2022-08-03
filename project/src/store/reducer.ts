import {AuthorizationStatus, CityList, SortList} from '../const';
import {createReducer} from '@reduxjs/toolkit';
import {
  requireAuthorization,
  setCity, setComments, setCurrentOffer, setCurrentOfferId,
  setDataLoadedStatus,
  setFirstCity,
  setOffers, setOtherOffers,
  setSort
} from './actions';
import {CommentsType, OfferCard, OfferList} from '../types/offer-card';
import {State} from '../types/store';
import {City} from '../types/types';
import {UserData} from '../types/user-data';

function getOfferFavoriteList(state:State): OfferList[] {
  const offerListByRegion:OfferList[] = [];
  CityList.forEach((city) => {
    if (state.favoriteOffers.filter((offers) => offers.regionName === city.name).length > 0) {
      offerListByRegion.push({
        regionName: city.name,
        offers: state.favoriteOffers.filter((offers) => offers.regionName === city.name)[0].offers
      });
    }
  });
  return offerListByRegion;
}

type initialStateType = {
  city: City;
  offers: OfferCard[];
  offerList: OfferCard[];
  sortBy: string;
  favoriteOffers: OfferList[];
  currentOfferId: number|null;
  currentOffer: OfferCard | null;
  comments: CommentsType;
  otherOffers: OfferCard[];
  authorizationStatus: string;
  error: string | null;
  isDataLoaded: boolean;
  user: UserData | null;
}

const initialState : initialStateType = {
  city: CityList[0],
  offers: [],
  offerList: [],
  sortBy: SortList[0],
  favoriteOffers: [],
  currentOfferId: null,
  currentOffer: null,
  comments: [],
  otherOffers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isDataLoaded: false,
  user: null
};

function sortByLowPrice(a:OfferCard,b:OfferCard)
{
  return a.price - b.price;
}
function sortByHighPrice(a:OfferCard,b:OfferCard)
{
  return b.price - a.price;
}

function sortByRated(a:OfferCard,b:OfferCard)
{
  return a.rating - b.rating;
}
function filterByCity(state:State) {
  const offersFromCurrentCity = state.offerList.filter((offers)=>offers.city.name === state.city.name);
  return offersFromCurrentCity.length > 0 ? offersFromCurrentCity : [];
}

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) =>{
      state.city = CityList.filter((city) => city.name === action.payload)[0];
      state.offers = filterByCity(state);
    })
    .addCase(setFirstCity, (state) =>{
      state.city = initialState.city;
      state.offers = filterByCity(state);
    })
    .addCase(setSort, (state, action) =>{
      switch (action.payload){
        case 'Price: low to high' : {
          state.offers = state.offers.sort(sortByLowPrice);
          state.sortBy = action.payload;
          break;
        }
        case 'Price: high to low' : {
          state.offers = state.offers.sort(sortByHighPrice);
          state.sortBy = action.payload;
          break;
        }
        case 'Top rated first' : {
          state.offers = state.offers.sort(sortByRated);
          state.sortBy = action.payload;
          break;
        }
        case 'Popular' : {
          state.offers = filterByCity(state);
          state.sortBy = action.payload;
          break;
        }
      }
    }).addCase(setOffers, (state, action) =>{
      state.offerList = action.payload;
      state.offers = filterByCity(state);
      state.favoriteOffers = getOfferFavoriteList(state);
    }).addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
      state.currentOfferId = state.currentOffer === null ? null : state.currentOffer.id;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setOtherOffers, (state, action) => {
      state.otherOffers = action.payload;
    })
    .addCase(setCurrentOfferId, (state, action) => {
      state.currentOfferId = action.payload;
    });
});
