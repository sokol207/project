import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {offers} from './mocks/offers';
import {offerCard,offerList} from './mocks/offerList';

const Setting = {
  PLACES_COUNT: 3,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App placesCount={Setting.PLACES_COUNT} offers={offers} offerListForPage={offerList} offerList={offerCard}/>
  </React.StrictMode>,
);
