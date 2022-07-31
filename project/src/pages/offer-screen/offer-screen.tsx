import React, {useState} from 'react';
import CommentList from '../../components/comment/comment-list';
import ListOffer from '../../components/list-offer/list-offer';
import {pointsForMap, starMark, TypeOfferList} from '../../const';
import {PointWithId} from '../../types/types';
import Map from '../../components/map/map';
import {useAppSelector} from '../../hooks';


function YourReview(): JSX.Element {
  const [textYourReview, setTextYourReview] = React.useState(
    {
      review :''
    }
  );
  return (<textarea onChange={(evt) =>{const {name, value} = evt.target; setTextYourReview({...textYourReview, [name]: value});}} value={textYourReview.review} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"/>
  );
}

function OfferScreen(): JSX.Element {
  const offer = useAppSelector((state)=>state.currentOffer);
  const [activeOfferCard,setActiveOfferCard] = React.useState('1');
  const comments = useAppSelector((state)=>state.comments);
  const city = useAppSelector((state)=>state.city);
  const otherOffer = useAppSelector((state)=>state.otherOffers);
  const points = pointsForMap(otherOffer);
  const [selectedPoint, setSelectedPoint] = useState<PointWithId | undefined>(
    undefined
  );
  if(offer === null)
  {
    return <>Not Found</>;
  }

  const onListItemHover = (id: number) => {
    const currentPoint = points.find((point) => point.id === id);

    setSelectedPoint(currentPoint);
  };

  return (
    <div>
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offer.images.map((photo,id)=>
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
            {offer.isPremium &&
            <div className="property__mark">
              <span>Premium</span>
            </div>}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {offer.title}
              </h1>
              <button className={offer.isFavorite ? 'property__bookmark__bookmark-button--active property__bookmark-button button' : 'property__bookmark-button button'} type="button">
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"/>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: starMark(offer.rating)}}/>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{offer.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {offer.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {offer.bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {offer.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{offer.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {offer.goods.map((inside,id)=>
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
                  <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                </div>
                <span className="property__user-name">
                  {offer.host.name}
                </span>
                {offer.host.isPro && <span className="property__user-status">Pro</span>}
              </div>
              <div className="property__description">
                {offer.description}
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
              <ul className="reviews__list">
                <CommentList comments={comments}/>
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
