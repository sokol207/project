import {offerList} from '../mocks/offerList';
import {CityList, SortList} from '../const';
import {createReducer} from '@reduxjs/toolkit';
import {setCity, setFirstCity, setSort} from './actions';
import {OfferCard} from '../types/OfferCard';


const initialState = {
  city: CityList[0],
  offers: offerList.filter((offers)=>offers.regionName === CityList[0].name)[0].offers,
  sortBy: SortList[0]
};

function sortByLowPrice(a:OfferCard,b:OfferCard)
{
  return a.cost - b.cost;
}
function sortByHighPrice(a:OfferCard,b:OfferCard)
{
  return b.cost - a.cost;
}

function sortByRated(a:OfferCard,b:OfferCard)
{
  if (a.mark > b.mark){
    return 1;
  } else {
    if (a.mark === b.mark){
      return 0;
    } else {
      return -1;
    }
  }
}
function sortByPopular(a:OfferCard,b:OfferCard)
{
  if (a.popularNum > b.popularNum){
    return 1;
  } else {
    if (a.popularNum === b.popularNum){
      return 0;
    } else {
      return -1;
    }
  }
}

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) =>{
      state.city = CityList.filter((city) => city.name === action.payload)[0];
      const offersFromCurrentCity = offerList.filter((offers)=>offers.regionName === state.city.name);
      if (offersFromCurrentCity.length > 0) {
        state.offers = offersFromCurrentCity[0].offers;
      } else {
        state.offers = [];
      }
    })
    .addCase(setFirstCity, (state) =>{
      state.city = initialState.city;
      state.offers = initialState.offers;
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
          state.offers = state.offers.sort(sortByPopular);
          state.sortBy = action.payload;
          break;
        }
      }
    });
});
