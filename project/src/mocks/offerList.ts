import {OfferCard, OfferListForPage} from '../types/OfferCard';

export const offerCard : OfferCard[] = [
  {
    photoOffer :'img/apartment-small-03.jpg',
    mark: '100%',
    name: 'Beautiful &amp; luxurious apartment at great location',
    cost: 120,
    type: 'Apartment',
    bookmark: false,
    placeCard: 'Premium',
    point: {
      lat: 52.3909553943508,
      lng: 4.85309666406198
    }
  },
  {
    photoOffer :'img/room.jpg',
    mark: '80%',
    name: 'Wood and stone place',
    cost: 80,
    type: 'Private room',
    bookmark: true,
    placeCard: '',
    point: {
      lat: 52.3909553943508,
      lng: 4.85309666406198
    }
  },
  {
    photoOffer :'img/apartment-02.jpg',
    mark: '80%',
    name: 'Canal View Prinsengracht',
    cost: 132,
    type: 'Apartment',
    bookmark: false,
    placeCard: '',
    point: {
      lat: 52.369553943508,
      lng: 4.85309666406198
    }
  },
  {
    photoOffer :'img/apartment-03.jpg',
    mark: '100%',
    name: 'Nice, cozy, warm big bed apartment',
    cost: 180,
    type: 'Apartment',
    bookmark: false,
    placeCard: 'Premium',
    point: {
      lat: 52.3909553943508,
      lng: 4.929309666406198
    }
  }
];

export const offerList : OfferListForPage = [
  {
    regionName: 'Amsterdam',
    offers: offerCard
  }
];
