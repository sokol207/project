import React from 'react';
import {useAppDispatch} from '../../hooks';
import { logoutAction} from '../../store/api-actions';
import {UserData} from '../../types/user-data';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

type SignOutProps = {
  user: UserData;
  countFavoritesOffer: number;
}

function SignOut(props:SignOutProps) {
  const handleClick = () =>{
    dispatch(logoutAction());
  };

  const dispatch = useAppDispatch();
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{props.user.email}</span>
            <span className="header__favorite-count">{props.countFavoritesOffer}</span>
          </Link>
        </li>
        <li className="header__nav-item" onClick={handleClick}>
          <a className="header__nav-link">
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>);
}
export default SignOut;
