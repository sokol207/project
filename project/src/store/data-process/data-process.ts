import {HotelsData} from '../../types/state';
import { CityList, NameSpace, SortList} from '../../const';
import {createSlice} from '@reduxjs/toolkit';
import {addComment, fetchHotelsAction, getOffer} from '../api-actions';
import {OfferCard, OfferList} from '../../types/offer-card';


const initialState: HotelsData = {
  city: CityList[0],
  offers: [],
  offerList: [],
  sortBy: SortList[0],
  favoriteOffers: [],
  currentOfferId: null,
  currentOfferIdFromParam: null,
  currentOffer: null,
  comments: [],
  otherOffers: [],
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
function filterByCity(allOffers: OfferCard[],cityName: string) {
  const offersFromCurrentCity = allOffers.filter((offer)=>offer.city.name === cityName);
  return offersFromCurrentCity.length > 0 ? offersFromCurrentCity : [];
}
function getOfferFavoriteList(stateData:HotelsData): OfferList[] {
  const offerListByRegion:OfferList[] = [];
  CityList.forEach((city) => {
    if (stateData.favoriteOffers.filter((offers) => offers.regionName === city.name).length > 0) {
      offerListByRegion.push({
        regionName: city.name,
        offers: stateData.favoriteOffers.filter((offers) => offers.regionName === city.name)[0].offers
      });
    }
  });
  return offerListByRegion;
}

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = CityList.filter((city) => city.name === action.payload)[0];
      state.offers = filterByCity(state.offerList,state.city.name);
    },
    setFirstCity:  (state) =>{
      state.city = initialState.city;
      state.offers = filterByCity(state.offerList,state.city.name);
    },
    setSort: (state, action) =>{
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
          state.offers = filterByCity(state.offerList,state.city.name);
          state.sortBy = action.payload;
          break;
        }
      }
    },
    setOffers : (state, action) =>{
      state.offerList = action.payload;
      state.offers = filterByCity(state.offerList,state.city.name);
      state.favoriteOffers = getOfferFavoriteList(state);
    },
    setDataLoadedStatus : (state, action) => {
      state.isDataLoaded = action.payload;
    },
    setCurrentOffer : (state, action) => {
      state.currentOffer = action.payload;
      state.currentOfferId = state.currentOffer === null ? null : state.currentOffer.id;
    },
    setComments : (state, action) => {
      state.comments = action.payload;
    },
    setOtherOffers : (state, action) => {
      state.otherOffers = action.payload;
    },
    setCurrentOfferIdFromParam: (state, action) => {
      state.currentOfferIdFromParam = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchHotelsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchHotelsAction.fulfilled, (state, action) => {
        state.offerList = action.payload;
        state.offers = filterByCity(state.offerList,state.city.name);
        state.isDataLoaded = false;
      })
      .addCase(getOffer.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(getOffer.fulfilled, (state, action) => {
        state.currentOfferId = action.payload.currentOfferId;
        state.currentOffer = action.payload.currentOffer;
        state.comments = action.payload.comments;
        state.otherOffers = action.payload.otherOffers;
        state.isDataLoaded = false;
      })
      .addCase(getOffer.rejected, (state, action) => {
        state.currentOfferId = state.currentOfferIdFromParam;
        state.isDataLoaded = false;
      })
      .addCase(addComment.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(addComment.fulfilled, (state) => {
        state.isDataLoaded = false;
      });
  }
});

export const {setCity, setFirstCity, setSort,setOffers,setDataLoadedStatus,setCurrentOffer,setComments,setOtherOffers,setCurrentOfferIdFromParam} = dataProcess.actions;
