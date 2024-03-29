import React from 'react';
import {Route, Routes} from 'react-router-dom';
import LoginScreen from '../../pages/login-screen/login-screen';
import {AppRoute, isCheckedAuth} from '../../const';
import Layout from '../layout/layout';
import LocationsScreen from '../../pages/locations-screen/locations-screen';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import PrivateRoute from '../private-route/private-route';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import {useAppSelector} from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import NotFound from '../not-found/not-found';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {getLoadedDataStatus} from '../../store/data-process/selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoaded = useAppSelector(getLoadedDataStatus);

  if (isCheckedAuth(authorizationStatus) || isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.Main} element={<Layout/>}>
          <Route index element={<LocationsScreen/>} />
          <Route path={AppRoute.Login} element={<LoginScreen/>} />
          <Route path={AppRoute.Offer} element={<OfferScreen/>} />
          <Route path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesScreen/>
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </HistoryRouter>);
}

export default App;
