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
import {City, Points} from '../../types/types';

type AppScreenProps = {
  placesCount: number;
  offers: Offers;
  offerListForPage: OfferListForPage;
  offerList: OfferCard[];
  otherOffer: OfferCard[];
  city: City;
  points: Points;
  pointsOtherOffers: Points;
}

function App(props:AppScreenProps): JSX.Element {
  const [firstOffer] = props.offers;
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.Main} element={<Layout/>}>
          <Route index element={<LocationsScreen placesCount={props.placesCount} offers={props.offerList} points={props.points} city={props.city}/>} />
          <Route path={AppRoute.Login} element={<LoginScreen/>} />
          <Route path={AppRoute.Offer} element={<OfferScreen offer={firstOffer} otherOffer={props.otherOffer} points={props.pointsOtherOffers} city={props.city}/>} />
          <Route path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <FavoritesScreen offerListForPage={props.offerListForPage}/>
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
