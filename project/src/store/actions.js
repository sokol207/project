import {createAction} from '@reduxjs/toolkit';

function setStingValue(value){
  return {
    payload : value
  };
}

export const setCity = createAction('setCity',setStingValue);

export const setFirstCity = createAction('setFirstCity');

export const setSort = createAction('setSort',setStingValue);
