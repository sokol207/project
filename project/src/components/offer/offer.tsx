import {OfferCard} from '../../types/ofer-card';
import {Link} from 'react-router-dom';
import React from 'react';
import {starMark} from '../../const';

export type OfferProps = {
  offer: OfferCard;
  activeOfferCard:string;
  setActiveOfferCard: React.Dispatch<React.SetStateAction<string>>;
  articleClassName:string;
  divClassName:string;
  citiesImageClassName:string;
  image:{
    width:string;
    high:string;
  }
}

function Offer({offer,activeOfferCard,setActiveOfferCard,articleClassName,citiesImageClassName,divClassName,image}:OfferProps): JSX.Element{
  return (
    <article className={`${articleClassName} place-card`} onMouseOver={()=>{setActiveOfferCard(`/offer/${offer.id}`);}}>
      {
        offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${citiesImageClassName}  place-card__image-wrapper`}>
        <Link to={activeOfferCard}>
          <img className="place-card__image" src={offer.previewImage} width={image.width} height={image.high} alt={''}/>
        </Link>
      </div>
      <div className={divClassName}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={offer.isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: starMark(offer.rating)}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>);
}

export default Offer;
