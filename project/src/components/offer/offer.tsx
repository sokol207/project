import {OfferCard} from '../../types/OfferCard';
import {Link} from 'react-router-dom';
import React from 'react';

type OfferProps = {
  keyValueOffer: string;
  offer: OfferCard;
  activeOfferCard:string;
  setActiveOfferCard: React.Dispatch<React.SetStateAction<string>>;
  articleClassName:string;
  divClassName:string;
}

function Offer({keyValueOffer,offer,activeOfferCard,setActiveOfferCard,articleClassName,divClassName}:OfferProps): JSX.Element{
  return (
    <article className={`${articleClassName} place-card`} onMouseOver={()=>{setActiveOfferCard(`/offer/${keyValueOffer}`);}}>
      {
        offer.placeCard !== '' &&
        <div className="place-card__mark">
          <span>{offer.placeCard}</span>
        </div>
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={activeOfferCard}>
          <img className="place-card__image" src={offer.photoOffer} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className={divClassName}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.cost}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={offer.bookmark ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: offer.mark}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to="/offer/1">{offer.name}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>);
}

export default Offer;
