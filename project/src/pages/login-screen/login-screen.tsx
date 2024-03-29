import React, {FormEvent, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AuthData} from '../../types/auth-data';
import {loginAction} from '../../store/api-actions';
import {Link, Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {getCity} from '../../store/data-process/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';

function LoginScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null && passwordRef.current.value.length >= 2 && passwordRef.current.value.search(/\d/g) !== -1 && passwordRef.current.value.search(/[A-Za-z]/g) !== -1) {
      onSubmit({
        email: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  const currentCity = useAppSelector(getCity);
  const userStatus = useAppSelector(getAuthorizationStatus);
  if (userStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main}/>;
  }
  return (
    <div className="page page--gray page--login">
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="" method="" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required ref={loginRef}/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" minLength={2} pattern={'[0-9A-Za-z].*'} placeholder="Password" required ref={passwordRef} autoComplete="on"/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>{currentCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
export default LoginScreen;
