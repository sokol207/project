import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {offers} from './mocks/offers';
import {offerCard, offerCardForOtherPlaces, offerList} from './mocks/offerList';
import {POINTS, POINTS_OTHER_OFFERS} from './mocks/points';
import {CITY} from './mocks/city';

const Setting = {
  PLACES_COUNT: 3,
};

ReactDOM.render(
  <React.StrictMode>
    <App placesCount={Setting.PLACES_COUNT} offers={offers} offerListForPage={offerList} offerList={offerCard} otherOffer={offerCardForOtherPlaces} pointsOtherOffers={POINTS_OTHER_OFFERS} city={CITY} points={POINTS}/>
  </React.StrictMode>,
  document.getElementById('root')
);
