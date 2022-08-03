import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

export default function NotFound() {
  return (
    <React.Fragment>
      <h1>Ошибка 404. Страница не существует.</h1>
      <Link className="header__logo-link" to={AppRoute.Main}>
        <span className="locations__item-link" style={{color: 'blue'}}>Вернуться на главную</span>
      </Link>
    </React.Fragment>);
}
