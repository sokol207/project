import {HotelsData} from '../../types/state';
import { CityList, NameSpace, SortList} from '../../const';
import {createSlice} from '@reduxjs/toolkit';
import {addComment, fetchHotelsAction, getOffer} from '../api-actions';
import {OfferCard} from '../../types/offer-card';


const initialState: HotelsData = {
  city: CityList[0],
  offers: [],
  offerList: [],
  sortBy: SortList[0],
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

function sortOffers(sortBy:string, stateForSort:HotelsData) {
  switch (sortBy){
    case 'Price: low to high' : {
      return stateForSort.offers.sort(sortByLowPrice);
    }
    case 'Price: high to low' : {
      return stateForSort.offers.sort(sortByHighPrice);
    }
    case 'Top rated first' : {
      return stateForSort.offers.sort(sortByRated);
    }
    case 'Popular' : {
      return filterByCity(stateForSort.offerList,stateForSort.city.name);
    }
  }
  return stateForSort.offers;
}

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = CityList.filter((city) => city.name === action.payload)[0];
      state.offers = filterByCity(state.offerList,state.city.name);
    },
    setSort: (state, action) =>{
      state.sortBy = action.payload;
      state.offers = sortOffers(action.payload,state);
    },
    setCurrentOfferIdFromParam: (state, action) => {
      state.currentOfferIdFromParam = action.payload;
    },
    setFavorite: (state, action) => {
      state.offers[action.payload].isFavorite = !state.offers[action.payload].isFavorite;
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
        state.offers = sortOffers(state.sortBy,state);
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
      .addCase(getOffer.rejected, (state) => {
        state.currentOfferId = state.currentOfferIdFromParam;
        state.isDataLoaded = false;
      })
      .addCase(addComment.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(addComment.fulfilled, (state,action) => {
        state.comments = action.payload;
        state.isDataLoaded = false;
      });
  }
});

export const {setCity, setSort,setCurrentOfferIdFromParam,setFavorite} = dataProcess.actions;
