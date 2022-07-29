import {OfferList} from '../../types/offer-card';
import {Link} from 'react-router-dom';
import ListOffer from '../list-offer/list-offer';
import {TypeOfferList} from '../../const';
import React from 'react';

type FavoritesListProps = {
  offerListProps: OfferList[];
}

function FavoritesList({offerListProps}:FavoritesListProps): JSX.Element {
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {offerListProps.map((offerList,id)=>{
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
                <ListOffer typeList={TypeOfferList.FAVORITE} onListItemHover={undefined} offers={offerList.offers}/>
              </div>
            </li>
          );
        })}
      </ul>
    </section>);
}
export default FavoritesList;
