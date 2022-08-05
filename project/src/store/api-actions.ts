import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/store.js';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AppRoute} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {CommentPostType, CommentsType, OfferCard, OfferCardList, OfferScreenDataType} from '../types/offer-card';
import {redirectToRoute} from './actions';

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

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Main));
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
    const {data} = await api.post<CommentsType>(`${APIRoute.Comments}/${id}`, {comment,rating});
    return data;
  },
);

const loadDataOffer = async (dispatch: AppDispatch, api: AxiosInstance, id:number) => {
  const {data: dataOffer} = await api.get<OfferCard>(`${APIRoute.Hotels}/${id}`);
  return dataOffer;
};

const loadDataComments = async (dispatch: AppDispatch, api: AxiosInstance, id:number) => {
  const {data: dataComments} = await api.get<CommentsType>(`${APIRoute.Comments}/${id}`);
  return dataComments;
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
