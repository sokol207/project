import {createAction} from '@reduxjs/toolkit';

function setNameCity(value){
  return {
    payload : value
  };
}

export const setCity = createAction('setCity',setNameCity);

export const setFirstCity = createAction('setFirstCity');
