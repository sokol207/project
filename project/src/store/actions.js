import {createAction} from '@reduxjs/toolkit';

function setStingValue(value){
  return {
    payload : value
  };
}
export const redirectToRoute = createAction('hotels/redirectToRoute',setStingValue);
