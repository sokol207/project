import React from 'react';
import {OfferCard} from '../../types/OfferCard';
import Offer from '../offer/offer';

type ListOfferProps = {
  offers: OfferCard[];
  onListItemHover: (listItemName: string) => void;
  activeOfferCard:string;
  setActiveOfferCard: React.Dispatch<React.SetStateAction<string>>;
};

function ListOffer(props: ListOfferProps): JSX.Element {
  const {offers, onListItemHover, activeOfferCard, setActiveOfferCard} = props;

  const listItemHoverHandler = (name:string) => {
    onListItemHover(name);
  };

  return (
    <>
      {offers.map((offer, index) => {
        const keyValueOffer = `${index}-${offer}`;
        return (
          <li
            key={keyValueOffer}
            onMouseEnter={()=> {
              listItemHoverHandler(offer.name);
            }}
          >
            <Offer offer={offer} keyValueOffer={keyValueOffer} activeOfferCard={activeOfferCard} setActiveOfferCard={setActiveOfferCard} articleClassName={'cities__card'} divClassName={'place-card__info'}/>
          </li>
        );
      })}
    </>
  );
}

export default ListOffer;
