import React, {useState} from 'react';
import {Offer} from '../../types/Offer';
import CommentList from '../../components/commentList/commentList';
import ListOffer from '../../components/listOffer/listOffer';
import {TypeOfferList} from '../../const';
import {OfferCard} from '../../types/OfferCard';
import {City, Point, Points} from '../../types/types';
import Map from '../../components/map/map';

type OfferScreenProps = {
  offer: Offer;
  otherOffer: OfferCard[];
  city: City;
  points: Points;
}

function YourReview(): JSX.Element {
  const [textYourReview, setTextYourReview] = React.useState(
    {
      review :''
    }
  );
  return (<textarea onChange={(evt) =>{const {name, value} = evt.target; setTextYourReview({...textYourReview, [name]: value});}} value={textYourReview.review} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"/>
  );
}

function OfferScreen({offer,otherOffer, city, points}:OfferScreenProps): JSX.Element {
  const [activeOfferCard,setActiveOfferCard] = React.useState('1');
  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(
    undefined
  );

  const onListItemHover = (listItemName: string) => {
    const currentPoint = points.find((point) => point.title === listItemName);

    setSelectedPoint(currentPoint);
  };
  function starMark(mark:number): string{
    const markStarValue = ((mark / 5) * 100);
    return `${markStarValue}%`;
  }

  return (
    <div>
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offer.photoOffer.map((photo,id)=>
            {
              const keyValue = `${id}-${photo}`;
              return (
                <div key={keyValue} className="property__image-wrapper">
                  <img className="property__image" src={photo} alt={''}/>
                </div>);
            }
            )}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            <div className="property__mark">
              <span>Premium</span>
            </div>
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {offer.name}
              </h1>
              <button className="property__bookmark-button button" type="button">
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"/>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: starMark(offer.mark)}}/>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{offer.mark}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                Apartment
              </li>
              <li className="property__feature property__feature--bedrooms">
                3 Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max 4 adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;120</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {offer.insides.map((inside,id)=>
                {
                  const keyValue = `${id}-${inside}`;
                  return (
                    <li key={keyValue} className="property__inside-item">
                      {inside}
                    </li>);
                }
                )}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={offer.host.image} width="74" height="74" alt="Host avatar"/>
                </div>
                <span className="property__user-name">
                  {offer.host.name}
                </span>
                <span className="property__user-status">{offer.host.userStatus}</span>
              </div>
              <div className="property__description">
                {offer.host.text}
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{offer.comments.length}</span></h2>
              <ul className="reviews__list">
                <CommentList comments={offer.comments}/>
              </ul>
              <form className="reviews__form form" action="#" method="post">
                <label className="reviews__label form__label" htmlFor="review">Your review</label>
                <div className="reviews__rating-form form__rating">
                  <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"/>
                  <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"/>
                    </svg>
                  </label>
                  <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"/>
                  <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"/>
                    </svg>
                  </label>
                  <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"/>
                  <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"/>
                    </svg>
                  </label>
                  <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"/>
                  <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"/>
                    </svg>
                  </label>
                  <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"/>
                  <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"/>
                    </svg>
                  </label>
                </div>
                {<YourReview/>}
                <div className="reviews__button-wrapper">
                  <p className="reviews__help">
                    To submit review please make sure to set <span className="reviews__star">rating</span> and describe
                    your stay with at least <b className="reviews__text-amount">50 characters</b>.
                  </p>
                  <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
                </div>
              </form>
            </section>
          </div>
        </div>
        <section className="property__map map">
          <Map city={city} points={points} selectedPoint={selectedPoint} height={'600px'} width={'1200px'} marginLeft={'auto'} marginRight={'auto'}/>
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            <ListOffer typeList={TypeOfferList.COMMENT} offers={otherOffer} onListItemHover={onListItemHover} activeOfferCard={activeOfferCard} setActiveOfferCard={setActiveOfferCard}/>
          </div>
        </section>
      </div>
    </div>);
}

export default OfferScreen;
