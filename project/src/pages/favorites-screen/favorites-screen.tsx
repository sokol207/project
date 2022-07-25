import React from 'react';
import {OfferListForPage} from '../../types/OfferCard';
import {Link} from 'react-router-dom';

type FavoritesScreenProps = {
  offerListForPage: OfferListForPage
}

function FavoritesScreen({offerListForPage}:FavoritesScreenProps): JSX.Element {
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {offerListForPage.map((offerList,id)=>{
          const keyValue = `${id}-${offerList}`;
          return (
            <li key={keyValue} className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <Link className="locations__item-link" to="/">
                    <span>{offerList.regionName}</span>
                  </Link>
                </div>
              </div>
              <div className="favorites__places">
                {offerList.offers.map((offer,idOffer )=>{
                  const keyValueOffer = `${idOffer}-${offer}`;
                  return (
                    <article key={keyValueOffer} className="favorites__card place-card">
                      <div className="place-card__mark">
                        <span>Premium</span>
                      </div>
                      <div className="favorites__image-wrapper place-card__image-wrapper">
                        <Link to="/offer/1">
                          <img className="place-card__image" src={offer.photoOffer} width="150" height="110" alt="Place image"/>
                        </Link>
                      </div>
                      <div className="favorites__card-info place-card__info">
                        <div className="place-card__price-wrapper">
                          <div className="place-card__price">
                            <b className="place-card__price-value">&euro;{offer.cost}</b>
                            <span className="place-card__price-text">&#47;&nbsp;night</span>
                          </div>
                          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                            <svg className="place-card__bookmark-icon" width="18" height="19">
                              <use xlinkHref="#icon-bookmark"/>
                            </svg>
                            <span className="visually-hidden">In bookmarks</span>
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
                    </article>
                  );
                })}

              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
export default FavoritesScreen;
