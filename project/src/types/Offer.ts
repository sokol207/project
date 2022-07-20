import {OfferCard} from './OfferCard';
import React from 'react';

export type CommentType = {
  text: string;
  name: string;
  image:string;
  mark: string;
  dateTime: string;
}

export type Offer = {
  photoOffer: string[];
  name: string;
  mark: number;
  cost: number;
  insides: string[];
  comments: CommentType[];
  host:{
    name:string;
    image:string;
    text:string;
    userStatus:string;
  }
};

export type Offers = Offer[];

export type OfferToList ={
  keyValueOffer: string;
  offer: OfferCard;
  activeOfferCard:string;
  setActiveOfferCard: React.Dispatch<React.SetStateAction<string>>
};
