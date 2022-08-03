import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/store.js';
import {
  setOffers,
  requireAuthorization,
  setDataLoadedStatus,
  setCurrentOffer,
  setComments,
  setOtherOffers, redirectToRoute, setCurrentOfferId
} from './actions';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {CommentPostType, CommentsType, OfferCard, OfferCardList} from '../types/offer-card';

export const fetchHotelsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/hotels',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferCardList>(APIRoute.Hotels);
    dispatch(setDataLoadedStatus(true));
    dispatch(setOffers(data));
    dispatch(setDataLoadedStatus(false));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
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
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
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
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const getOffer = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offer',
  async (id, {dispatch, extra: api}) => {
    dispatch(setDataLoadedStatus(true));
    const dataOfferProm = loadDataOffer(dispatch, api, id);
    const dataCommentsProm = loadDataComments(dispatch, api, id);
    const dataOtherOfferProm = loadDataOtherOffer(dispatch, api, id);
    Promise.all([dataOfferProm,dataCommentsProm,dataOtherOfferProm]).then(()=>{
      dispatch(setDataLoadedStatus(false));}
    ).catch(()=>{
      dispatch(setCurrentOffer(null));
      dispatch(setCurrentOfferId(id));
      dispatch(setDataLoadedStatus(false));
    });
  },
);

export const addComment = createAsyncThunk<void, CommentPostType, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/comment/post',
  async ({id, comment, rating}, {dispatch, extra: api}) => {
    dispatch(setDataLoadedStatus(true));
    const {data: dataComment} = await api.post<CommentsType>(`${APIRoute.Comments}/${id}`, {comment,rating});
    dispatch(setComments(dataComment));
    dispatch(setDataLoadedStatus(false));
  },
);

const loadDataOffer = async (dispatch: AppDispatch, api: AxiosInstance, id:number) => {
  const {data: dataOffer} = await api.get<OfferCard>(`${APIRoute.Hotels}/${id}`);
  dispatch(setCurrentOffer(dataOffer));
};

const loadDataComments = async (dispatch: AppDispatch, api: AxiosInstance, id:number) => {
  const {data: dataComments} = await api.get<CommentsType>(`${APIRoute.Comments}/${id}`);
  dispatch(setComments(dataComments));
};

const loadDataOtherOffer = async (dispatch: AppDispatch, api: AxiosInstance, id:number) => {
  const {data: dataOtherOffer} = await api.get<OfferCard>(`${APIRoute.Hotels}/${id}/nearby`);
  dispatch(setOtherOffers(dataOtherOffer));
};

