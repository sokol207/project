import {OfferCard} from '../../types/ofer-card';
import React from 'react';
import {TypeOfferList} from '../../const';
import OfferComment from './offer-comment';
import OfferFavorite from './offer-favorite';
import OfferCity from './offer-city';

type OfferByTypeProps = {
  offerType:string;
  offer: OfferCard;
  activeOfferCard:string;
  setActiveOfferCard: React.Dispatch<React.SetStateAction<string>>;
}

function OfferByType({offerType,offer,activeOfferCard,setActiveOfferCard}:OfferByTypeProps): JSX.Element{
  switch (offerType) {
    case TypeOfferList.CITY:
      return (<OfferCity offer={offer} activeOfferCard={activeOfferCard} setActiveOfferCard={setActiveOfferCard}/>);
    case TypeOfferList.COMMENT:
      return (<OfferComment offer={offer} activeOfferCard={activeOfferCard} setActiveOfferCard={setActiveOfferCard}/>);
    case TypeOfferList.FAVORITE:
      return (<OfferFavorite offer={offer} activeOfferCard={activeOfferCard} setActiveOfferCard={setActiveOfferCard}/>);
  }
  return (<div/>);
}
export default OfferByType;
