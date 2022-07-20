import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {offers} from './mocks/offers';
import {offerCard,offerList} from './mocks/offerList';

const Setting = {
  PLACES_COUNT: 3,
};

ReactDOM.render(
  <React.StrictMode>
    <App placesCount={Setting.PLACES_COUNT} offers={offers} offerListForPage={offerList} offerList={offerCard}/>
  </React.StrictMode>,
  document.getElementById('root')
);
