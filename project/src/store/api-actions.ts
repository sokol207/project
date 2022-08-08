import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/store.js';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AppRoute} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {CommentPostType, CommentsType, OfferCard, OfferCardList, OfferScreenDataType} from '../types/offer-card';
import {redirectToRoute} from './actions';
import {DataForPostFavorites} from '../types/types';

export const fetchHotelsAction = createAsyncThunk<OfferCardList, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/hotels',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferCardList>(APIRoute.Hotels);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data: userData} = await api.get<UserData>(APIRoute.Login);
    dispatch(fetchFavoritesAction());
    dispatch(fetchHotelsAction());
    return userData;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: userData} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(userData.token);
    dispatch(fetchFavoritesAction());
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(fetchHotelsAction());
    return userData;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const addComment = createAsyncThunk<CommentsType, CommentPostType, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/comment/post',
  async ({id, comment, rating}, {dispatch, extra: api}) => {
    const {data:dataComments} = await api.post<CommentsType>(`${APIRoute.Comments}/${id}`, {comment,rating});
    const arrayComments = [];
    for (let i = 0; i < 10 && i < dataComments.length; i++){
      arrayComments.push(dataComments[i]);
    }
    return arrayComments;
  },
);

const loadDataOffer = async (dispatch: AppDispatch, api: AxiosInstance, id:number) => {
  const {data: dataOffer} = await api.get<OfferCard>(`${APIRoute.Hotels}/${id}`);
  return dataOffer;
};

const loadDataComments = async (dispatch: AppDispatch, api: AxiosInstance, id:number) => {
  const {data: dataComments} = await api.get<CommentsType>(`${APIRoute.Comments}/${id}`);
  const arrayComments = [];
  for (let i = 0; i < 10 && i < dataComments.length; i++){
    arrayComments.push(dataComments[i]);
  }
  return arrayComments;
};

const loadDataOtherOffer = async (dispatch: AppDispatch, api: AxiosInstance, id:number) => {
  const {data: dataOtherOffer} = await api.get<OfferCard[]>(`${APIRoute.Hotels}/${id}/nearby`);
  return dataOtherOffer;
};


export const getOffer = createAsyncThunk<OfferScreenDataType, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offer',
  async (id, {dispatch, extra: api}) => {
    const dataOfferProm = loadDataOffer(dispatch, api, id);
    const dataCommentsProm = loadDataComments(dispatch, api, id);
    const dataOtherOfferProm = loadDataOtherOffer(dispatch, api, id);
    const [dataOffer,dataComments,dataOtherOffer] = await Promise.all([dataOfferProm,dataCommentsProm,dataOtherOfferProm]);
    return {currentOfferId:id,currentOffer:dataOffer,comments:dataComments,otherOffers:dataOtherOffer};
  },
);

export const fetchFavoritesAction = createAsyncThunk<OfferCardList, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/favorites',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferCardList>(APIRoute.Favorites);
    return data;
  },
);

export const postFavoriteAction = createAsyncThunk<void, DataForPostFavorites, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/favorites/post',
  async (dataForFavorites, {dispatch, extra: api}) => {
    api.post<OfferCardList>(`${APIRoute.Favorites}/${dataForFavorites.hotelId}/${dataForFavorites.status}`).then(()=>{
      dispatch(fetchFavoritesAction());
      if (dataForFavorites.typeReloaded === 'main'){
        dispatch(fetchHotelsAction());
      }
      if (dataForFavorites.typeReloaded === 'comment'){
        dispatch(getOffer(dataForFavorites.hotelId));
      }
    });
  },
);
