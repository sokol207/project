import {Link, Outlet} from 'react-router-dom';
import {AppRoute} from '../../const';
import React from 'react';
import SignIn from '../sign/sign-in';
import {useAppSelector} from '../../hooks';
import {getCountFavoriteOffers, getUser} from '../../store/user-process/selectors';
import SignOut from '../sign/sign-out';

function Layout() {
  const currentUser = useAppSelector(getUser);
  const countFavoriteOffers = useAppSelector(getCountFavoriteOffers);
  return (
    <React.Fragment>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            {currentUser === null ? <SignIn/> : <SignOut user={currentUser} countFavoritesOffer={countFavoriteOffers}/>}
          </div>
        </div>
      </header>
      <Outlet/>
    </React.Fragment>);
}
export default Layout;
