import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {store} from './store';
import ErrorMessage from './components/error-message/error-message';
import {checkAuthAction, fetchHotelsAction} from './store/api-actions';

store.dispatch(fetchHotelsAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <ErrorMessage />
    <App/>
  </Provider>
);
