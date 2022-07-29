import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus, CityList} from '../../const';
import {UserProcess} from '../../types/state';
import {checkAuthAction, fetchFavoritesAction, loginAction, logoutAction} from '../api-actions';
import {OfferCard, OfferList} from '../../types/offer-card';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  favoriteOffers: [],
  countFavoriteOffers: 0,
  user: null
};

function getOfferFavoriteList(offers:OfferCard[]): OfferList[] {
  const offerListByRegion:OfferList[] = [];
  if(offers?.length > 0) {
    CityList.forEach((city) => {
      if (offers.filter((favoriteOffer) => favoriteOffer.city.name === city.name).length > 0) {
        offerListByRegion.push({
          regionName: city.name,
          offers: offers.filter((favoriteOffer) => favoriteOffer.city.name === city.name)
        });
      }
    });
  }
  return offerListByRegion;
}

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.user = null;
        state.favoriteOffers = [];
        state.countFavoriteOffers = 0;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favoriteOffers = getOfferFavoriteList(action.payload);
        state.countFavoriteOffers = state.favoriteOffers.length > 0 ? action.payload.length : 0;
      });
  }
});
