import React from 'react';
import {OfferCard} from '../../types/OfferCard';
import OfferByType from '../offer/offerByType';

type ListOfferProps = {
  typeList: string;
  offers: OfferCard[];
  onListItemHover: (listItemName: string) => void;
  activeOfferCard:string;
  setActiveOfferCard: React.Dispatch<React.SetStateAction<string>>;
};


function ListOffer(props: ListOfferProps): JSX.Element {
  const {typeList, offers, onListItemHover, activeOfferCard, setActiveOfferCard} = props;

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
            style={{listStyleType:'none'}}
          >
            <OfferByType offerType={typeList} keyValueOffer={keyValueOffer} offer={offer} activeOfferCard={activeOfferCard} setActiveOfferCard={setActiveOfferCard}/>
          </li>
        );
      })}
    </>
  );
}

export default ListOffer;
