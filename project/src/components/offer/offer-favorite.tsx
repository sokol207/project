import Offer from './offer';
import React from 'react';
import {OfferToList} from '../../types/offer-card';

export default function OfferFavorite (props:OfferToList) {
  return (
    <Offer articleClassName={'favorites__card'} citiesImageClassName={'favorites__image-wrapper'} divClassName={'favorites__card-info place-card__info'} image={{width: '150', high: '110'}} {...props}/>
  );
}
