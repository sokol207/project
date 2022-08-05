import React from 'react';
import {OfferCard} from '../../types/offer-card';
import OfferByType from '../offer/offer-by-type';

type ListOfferProps = {
  typeList: string;
  offers: OfferCard[];
  onListItemHover: ((id: number) => void) | undefined;
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
              <OfferByType offerType={props.typeList} offer={offer}/>
            </li>
          );
        }
        return (
          <li key={keyValueOffer}>
            <OfferByType offerType={props.typeList} offer={offer}/>
          </li>);
      })}
    </>
  );
}

export default ListOffer;
