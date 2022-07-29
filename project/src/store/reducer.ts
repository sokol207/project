import {AuthorizationStatus, CityList, SortList} from '../const';
import {createReducer} from '@reduxjs/toolkit';
import {
  requireAuthorization,
  setCity,
  setDataLoadedStatus,
  setError,
  setFirstCity,
  setOffers,
  setSort
} from './actions';
import {CommentsType, OfferCard, OfferList} from '../types/ofer-card';
import {State} from '../types/store';
import {City} from '../types/types';

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
  currentOffer: OfferCard | null;
  comments: CommentsType;
  otherOffers: OfferCard[];
  authorizationStatus: string;
  error: string | null;
  isDataLoaded: boolean;
}

const initialState : initialStateType = {
  city: CityList[0],
  offers: [],
  offerList: [],
  sortBy: SortList[0],
  favoriteOffers: [],
  currentOffer: null,
  comments: [],
  otherOffers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isDataLoaded: false
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
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    });
});
