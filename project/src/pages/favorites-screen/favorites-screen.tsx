import React from 'react';
import {useAppSelector} from '../../hooks';
import FavoritesList from '../../components/favorites/favorites-list';
import FavoritesEmpty from '../../components/favorites/favorites-empty';
import {getFavoriteOffers} from '../../store/user-process/selectors';


function FavoritesScreen(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  return (
    <div className="page">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoriteOffers.length === 0 ? <FavoritesEmpty/> : <FavoritesList offerListProps={favoriteOffers}/>}
        </div>
      </main>
    </div>
  );
}
export default FavoritesScreen;
