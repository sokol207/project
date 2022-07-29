import Offer from './offer';
import React from 'react';
import {OfferToList} from '../../types/ofer-card';

export default function OfferCity (props:OfferToList) {
  return (
    <Offer articleClassName={'cities__card'} citiesImageClassName={'cities__image-wrapper'} divClassName={'place-card__info'} image={{width:'260', high:'200'}} {...props}/>
  );
}
