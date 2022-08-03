import {City, Point} from './types';
import React from 'react';

export type OfferCard = {
  bedrooms: number;
  city: City;
  description: string;
  goods: string[]
  host: {
    avatarUrl: string
    id: number
    isPro: boolean
    name: string
  }
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: Point;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating:number;
  title: string;
  type: string;
};

export type OfferCardList = OfferCard[];

export type OfferList = {
  regionName: string;
  offers: OfferCardList;
};

export type OfferListForPage = OfferList[];

export type OfferToList = {
  offer: OfferCard;
  activeOfferCard: string;
  setActiveOfferCard: React.Dispatch<React.SetStateAction<string>>
};

export type CommentType = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  }
};

export type CommentsType = CommentType[];

export type CommentPostType = {
  id: number;
  comment: string;
  rating: number;
};
