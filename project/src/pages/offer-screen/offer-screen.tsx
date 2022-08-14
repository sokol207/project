import React, {FormEvent, useEffect} from 'react';
import CommentList from '../../components/comment/comment-list';
import ListOffer from '../../components/list-offer/list-offer';
import {AppRoute, AuthorizationStatus, pointsForMap, starMark, TypeOfferList} from '../../const';
import Map from '../../components/map/map';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Navigate, useParams} from 'react-router-dom';
import {addComment, getOffer, postFavoriteAction} from '../../store/api-actions';
import {CommentPostType} from '../../types/offer-card';
import LoadingScreen from '../loading-screen/loading-screen';
import {
  getCity,
  getComments,
  getCurrentOffer,
  getCurrentOfferId,
  getOtherOffers
} from '../../store/data-process/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import { setCurrentOfferIdFromParam } from '../../store/data-process/data-process';


function OfferScreen(): JSX.Element {
  const {id:idCurrentOfferFromParam} = useParams();
  const dispatch = useAppDispatch();
  const idCurrentOfferFromState = useAppSelector(getCurrentOfferId);
  useEffect(() => {
    if (idCurrentOfferFromParam !== null && idCurrentOfferFromParam !== undefined && (idCurrentOfferFromState === null || idCurrentOfferFromState !== parseInt(idCurrentOfferFromParam, 10))){
      dispatch(setCurrentOfferIdFromParam(parseInt(idCurrentOfferFromParam, 10)));
      dispatch(getOffer(parseInt(idCurrentOfferFromParam, 10)));
    }
  }, [idCurrentOfferFromParam,dispatch,idCurrentOfferFromState]);
  const currentOffer = useAppSelector(getCurrentOffer);
  const comments = useAppSelector(getComments);
  const city = useAppSelector(getCity);
  const otherOffer = useAppSelector(getOtherOffers);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const points = pointsForMap(otherOffer);
  if (currentOffer !== null) {
    points.push({id: currentOffer.id, point: currentOffer.location});
  }

  const [textYourReview, setTextYourReview] = React.useState('');
  const [ratingYourReview, setRatingYourReview] = React.useState(
    0
  );
  const HandleClick = (id:number,isFavorite: boolean) => {
    dispatch(postFavoriteAction({hotelId: id,status: isFavorite ? 1 : 0, typeReloaded: 'comment'}));
  };
  const onSubmit = (comment:CommentPostType) => {
    dispatch(addComment(comment));
  };
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (ratingYourReview !== 0 && textYourReview !== '' && currentOffer !== null && textYourReview.length >= 50 && textYourReview.length <= 300) {
      onSubmit({
        id:currentOffer.id,
        comment: textYourReview,
        rating: ratingYourReview
      });
    }
  };

  const currentOfferIdTest = useAppSelector(getCurrentOfferId);
  if (currentOfferIdTest === null) {
    return (
      <LoadingScreen />
    );
  }

  if(currentOffer === null)
  {
    return <Navigate to={AppRoute.NotFound}/>;
  }

  return (
    <div>
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {currentOffer.images.map((photo,id)=>
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
            {currentOffer.isPremium &&
            <div className="property__mark">
              <span>Premium</span>
            </div>}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {currentOffer.title}
              </h1>
              <button className={currentOffer.isFavorite ? 'property__bookmark-button property__bookmark-button--active button' : 'property__bookmark-button button'} type="button" onClick={() => HandleClick(currentOffer.id,!currentOffer.isFavorite)}>
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"/>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: starMark(currentOffer.rating)}}/>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{currentOffer.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {currentOffer.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {currentOffer.bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {currentOffer.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{currentOffer.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {currentOffer.goods.map((inside,id)=>
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
                  <img className="property__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                </div>
                <span className="property__user-name">
                  {currentOffer.host.name}
                </span>
                {currentOffer.host.isPro && <span className="property__user-status">Pro</span>}
              </div>
              <div className="property__description">
                {currentOffer.description}
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
              <ul className="reviews__list">
                <CommentList comments={comments}/>
              </ul>

              {authorizationStatus === AuthorizationStatus.Auth &&
              <form className="reviews__form form" action="" method="" onSubmit={handleSubmit}>
                <label className="reviews__label form__label" htmlFor="review">Your review</label>
                <div className="reviews__rating-form form__rating">
                  <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"/>
                  <label htmlFor="5-stars" onClick={() => setRatingYourReview(5)} className="reviews__rating-label form__rating-label" title="perfect">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"/>
                    </svg>
                  </label>
                  <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"/>
                  <label htmlFor="4-stars" onClick={() => setRatingYourReview(4)} className="reviews__rating-label form__rating-label" title="good">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"/>
                    </svg>
                  </label>
                  <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"/>
                  <label htmlFor="3-stars" onClick={() => setRatingYourReview(3)} className="reviews__rating-label form__rating-label" title="not bad">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"/>
                    </svg>
                  </label>
                  <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"/>
                  <label htmlFor="2-stars" onClick={() => setRatingYourReview(2)} className="reviews__rating-label form__rating-label" title="badly">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"/>
                    </svg>
                  </label>
                  <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"/>
                  <label htmlFor="1-star" onClick={() => setRatingYourReview(1)} className="reviews__rating-label form__rating-label" title="terribly">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"/>
                    </svg>
                  </label>
                </div>
                <textarea onChange={(evt) => {const {value} = evt.target; setTextYourReview(value);}} value={textYourReview} minLength={50} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"/>
                <div className="reviews__button-wrapper">
                  <p className="reviews__help">
                    To submit review please make sure to set <span className="reviews__star">rating</span> and describe
                    your stay with at least <b className="reviews__text-amount">50 characters</b>.
                  </p>
                  <button className="reviews__submit form__submit button" type="submit">Submit</button>
                </div>
              </form>}
            </section>
          </div>
        </div>
        <section className="property__map map">
          <Map city={city} points={points} selectedPoint={undefined} height={'600px'} width={'1200px'} marginLeft={'auto'} marginRight={'auto'}/>
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            <ListOffer typeList={TypeOfferList.COMMENT} offers={otherOffer} onListItemHover={undefined}/>
          </div>
        </section>
      </div>
    </div>);
}

export default OfferScreen;
