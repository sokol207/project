import {AppRoute, AuthorizationStatus} from '../../const';
import {Navigate} from 'react-router-dom';
import React from 'react';

type PrivateRouteProps ={
  authorizationStatus: string;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps) {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}
export default PrivateRoute;
