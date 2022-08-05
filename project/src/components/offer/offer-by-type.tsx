import {OfferCard} from '../../types/offer-card';
import React from 'react';
import {TypeOfferList} from '../../const';
import OfferComment from './offer-comment';
import OfferFavorite from './offer-favorite';
import OfferCity from './offer-city';

type OfferByTypeProps = {
  offerType:string;
  offer: OfferCard;
}

function OfferByType({offerType,offer}:OfferByTypeProps): JSX.Element{
  switch (offerType) {
    case TypeOfferList.CITY:
      return (<OfferCity offer={offer}/>);
    case TypeOfferList.COMMENT:
      return (<OfferComment offer={offer}/>);
    case TypeOfferList.FAVORITE:
      return (<OfferFavorite offer={offer}/>);
  }
  return (<div/>);
}
export default OfferByType;
