import {OfferCard, OfferListForPage} from '../types/OfferCard';

export const offerCard : OfferCard[] = [
  {
    photoOffer :'img/apartment-small-03.jpg',
    mark: '100%',
    name: 'Nice, cozy, warm big bed apartment',
    cost: 1180,
    type: 'Apartment'
  }
];

export const offerList : OfferListForPage = [
  {
    regionName: 'Amsterdam',
    offers: offerCard
  }
];
