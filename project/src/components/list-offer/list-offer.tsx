import React from 'react';
import {OfferCard} from '../../types/ofer-card';
import OfferByType from '../offer/offer-by-type';

type ListOfferProps = {
  typeList: string;
  offers: OfferCard[];
  onListItemHover: ((id: number) => void) | undefined;
  activeOfferCard:string;
  setActiveOfferCard: React.Dispatch<React.SetStateAction<string>>;
};


function ListOffer(props: ListOfferProps): JSX.Element {

  const listItemHoverHandler = (id:number) => {
    if (props.onListItemHover !== undefined) {
      props.onListItemHover(id);
    }
  };

  return (
    <>
      {props.offers.map((offer, index) => {
        const keyValueOffer = offer.id;
        if (props.onListItemHover !== undefined) {
          return (
            <li
              key={keyValueOffer}
              onMouseEnter={() => {
                listItemHoverHandler(offer.id);
              }}
              style={{listStyleType: 'none'}}
            >
              <OfferByType offerType={props.typeList} offer={offer} activeOfferCard={props.activeOfferCard} setActiveOfferCard={props.setActiveOfferCard}/>
            </li>
          );
        }
        return (
          <li key={keyValueOffer}>
            <OfferByType offerType={props.typeList} offer={offer} activeOfferCard={props.activeOfferCard} setActiveOfferCard={props.setActiveOfferCard}/>
          </li>);
      })}
    </>
  );
}

export default ListOffer;
