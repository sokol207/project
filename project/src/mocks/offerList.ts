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
    popularNum:10,
    point: {
      lat: 52.3909553943508,
      lng: 4.85309666406198
    }
  },
  {
    photoOffer :'img/room.jpg',
    mark: '60%',
    name: 'Wood and stone place',
    cost: 80,
    type: 'Private room',
    bookmark: true,
    placeCard: '',
    popularNum:9,
    point: {
      lat: 52.369553943508,
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
    popularNum:8,
    point: {
      lat: 52.369553943508,
      lng: 4.929309666406198
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
    popularNum:7,
    point: {
      lat: 52.3809553943508,
      lng: 4.929309666406198
    }
  }
];

export const offerList : OfferListForPage = [
  {
    regionName: 'Amsterdam',
    offers: offerCard
  },
  {
    regionName: 'Paris',
    offers:   [{
      photoOffer :'img/apartment-03.jpg',
      mark: '100%',
      name: 'Nice, cozy, warm big bed apartment',
      cost: 180,
      type: 'Apartment',
      bookmark: false,
      placeCard: 'Premium',
      popularNum:6,
      point: {
        lat: 48.7,
        lng: 2.2,
      }
    }]
  }
];

export const offerCardForOtherPlaces : OfferCard[] = [
  {
    photoOffer :'img/room.jpg',
    mark: '80%',
    name: 'Wood and stone place',
    cost: 80,
    type: 'Private room',
    bookmark: true,
    placeCard: '',
    popularNum:6,
    point: {
      lat: 52.3909553943508,
      lng: 4.85309666406198
    }
  },
  {
    photoOffer :'img/apartment-02.jpg',
    mark: '60%',
    name: 'Canal View Prinsengracht',
    cost: 132,
    type: 'Apartment',
    bookmark: false,
    placeCard: '',
    popularNum:6,
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
    popularNum:6,
    point: {
      lat: 52.3909553943508,
      lng: 4.929309666406198
    }
  }
];
