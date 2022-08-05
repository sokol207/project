import React from 'react';
import {Link} from 'react-router-dom';
import {TypeOfferList} from '../../const';
import ListOffer from '../../components/list-offer/list-offer';
import {useAppSelector} from '../../hooks';
import {getFavoriteOffers} from '../../store/data-process/selectors';


function FavoritesScreen(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  return (
    <div className="page">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favoriteOffers.map((offerList,id)=>{
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
          </section>
        </div>
      </main>
    </div>
  );
}
export default FavoritesScreen;
