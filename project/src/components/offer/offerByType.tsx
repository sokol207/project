import {OfferCard} from '../../types/OfferCard';
import React from 'react';
import {TypeOfferList} from '../../const';
import OfferCity from './OfferCity';
import OfferComment from './offerComment';

type OfferByTypeProps = {
  offerType:string;
  keyValueOffer: string;
  offer: OfferCard;
  activeOfferCard:string;
  setActiveOfferCard: React.Dispatch<React.SetStateAction<string>>;
}

function OfferByType({offerType,keyValueOffer,offer,activeOfferCard,setActiveOfferCard}:OfferByTypeProps): JSX.Element{
  switch (offerType) {
    case TypeOfferList.CITY:
      return (<OfferCity offer={offer} keyValueOffer={keyValueOffer} activeOfferCard={activeOfferCard} setActiveOfferCard={setActiveOfferCard}/>);
    case TypeOfferList.COMMENT:
      return (<OfferComment offer={offer} keyValueOffer={keyValueOffer} activeOfferCard={activeOfferCard} setActiveOfferCard={setActiveOfferCard}/>);
  }
  return (<div/>);
}
export default OfferByType;
