import {offerList} from '../mocks/offerList';
import {CityList} from '../const';
import {createReducer} from '@reduxjs/toolkit';
import {setCity, setFirstCity} from './actions';


const initialState = {
  city: CityList[0],
  offers: offerList.filter((offers)=>offers.regionName === CityList[0].name)[0].offers
};


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
    });
});
