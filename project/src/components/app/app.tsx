import React from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import LoginScreen from '../../pages/login-screen/login-screen';
import {AppRoute, AuthorizationStatus} from '../../const';
import Layout from '../layout/layout';
import LocationsScreen from '../../pages/locations-screen/locations-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import PrivateRoute from '../private-route/private-route';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import {Offers} from '../../types/Offer';
import {OfferCard, OfferListForPage} from '../../types/OfferCard';

type AppScreenProps = {
  placesCount: number;
  offers: Offers;
  offerListForPage: OfferListForPage;
  offerList: OfferCard[];
}

function App({placesCount, offers, offerListForPage, offerList}:AppScreenProps): JSX.Element {
  const [firstOffer] = offers;
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.Main} element={<Layout/>}>
          <Route index element={<LocationsScreen placesCount={placesCount} offers={offerList}/>} />
          <Route path={AppRoute.Login} element={<LoginScreen/>} />
          <Route path={AppRoute.Offer} element={<OfferScreen offer={firstOffer}/>} />
          <Route path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <FavoritesScreen offerListForPage={offerListForPage}/>
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
