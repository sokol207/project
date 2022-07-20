import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {offers} from './mocks/offers';
import { offerCardForOtherPlaces, offerList} from './mocks/offerList';
import {POINTS_OTHER_OFFERS} from './mocks/points';
import {CITY} from './mocks/city';
import {Provider} from 'react-redux';
import {store} from './store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <App offers={offers} offerListForPage={offerList} otherOffer={offerCardForOtherPlaces} pointsOtherOffers={POINTS_OTHER_OFFERS} city={CITY}/>
  </Provider>
);
