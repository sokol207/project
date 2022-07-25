// import React, {useState} from 'react';
// import List from '../list/list';
// import Map from '../map/map';
// import {City, Points, Point} from '../../types/types';
//
// type AppProps = {
//   city: City;
//   points: Points;
// };
//
// function App(props: AppProps): JSX.Element {
//   const {city, points} = props;
//
//   const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(
//     undefined
//   );
//
//   const onListItemHover = (listItemName: string) => {
//     const currentPoint = points.find((point) => point.title === listItemName);
//
//     setSelectedPoint(currentPoint);
//   };
//
//   return (
//     <React.Fragment>
//       <header>
//         <h1>Парки города {city.title}:</h1>
//       </header>
//       <main>
//         <List points={points} onListItemHover={onListItemHover} />
//         <Map city={city} points={points} selectedPoint={selectedPoint} />
//       </main>
//     </React.Fragment>
//   );
// }
//
// export default App;


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
import {POINTS} from '../../mocks/points';
import {CITY} from '../../mocks/city';

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
          <Route index element={<LocationsScreen placesCount={placesCount} offers={offerList} points={POINTS} city={CITY}/>} />
          {/*<Route index element={<LocationsScreen points={POINTS} city={CITY}/>} />*/}
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
