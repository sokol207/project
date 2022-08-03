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

export const setDataLoadedStatus = createAction('data/setDataLoadedStatus',setValue);

export const setCurrentOffer = createAction('data/setCurrentOffer',setValue);

export const setComments = createAction('data/setComments',setValue);

export const setOtherOffers = createAction('data/setOtherOffers',setValue);

export const redirectToRoute = createAction('hotels/redirectToRoute',setValue);

export const setCurrentOfferId = createAction('hotels/setCurrentOfferId',setValue);
