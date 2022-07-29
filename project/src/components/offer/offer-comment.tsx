import Offer from './offer';
import React from 'react';
import {OfferToList} from '../../types/offer-card';

export default function OfferComment (props:OfferToList) {
  return (
    <Offer articleClassName={'near-places__card'} citiesImageClassName={'near-places__image-wrapper'} divClassName={'place-card__info'} image={{width: '260', high: '200'}} {...props}/>
  );
}
