import {createAction} from '@reduxjs/toolkit';

function setValue(value){
  return {
    payload : value
  };
}

export const setCity = createAction('setCity',setValue);

export const setFirstCity = createAction('setFirstCity');

export const setSort = createAction('setSort',setValue);

export const setOffers = createAction('setOffers',setValue);

export const requireAuthorization = createAction('requireAuthorization',setValue);

export const setError = createAction('game/setError',setValue);

export const setDataLoadedStatus = createAction('data/setDataLoadedStatus',setValue);


