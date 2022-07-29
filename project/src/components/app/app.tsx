import React from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import LoginScreen from '../../pages/login-screen/login-screen';
import {AppRoute, AuthorizationStatus, isCheckedAuth} from '../../const';
import Layout from '../layout/layout';
import LocationsScreen from '../../pages/locations-screen/locations-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import PrivateRoute from '../private-route/private-route';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import {useAppSelector} from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

function App(): JSX.Element {
  const {authorizationStatus, isDataLoaded} = useAppSelector((state) => state);

  if (isCheckedAuth(authorizationStatus) || isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.Main} element={<Layout/>}>
          <Route index element={<LocationsScreen/>} />
          <Route path={AppRoute.Login} element={<LoginScreen/>} />
          <Route path={AppRoute.Offer} element={<OfferScreen/>} />
          <Route path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <FavoritesScreen/>
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={
          <React.Fragment>
            <h1>Ошибка 404. Страница не существует.</h1>
            <Link className="header__logo-link" to={AppRoute.Main}>
              <span className="locations__item-link" style={{color: 'blue'}}>Вернуться на главную</span>
            </Link>
          </React.Fragment>
        }
        />
      </Routes>
    </BrowserRouter>);
}

export default App;
