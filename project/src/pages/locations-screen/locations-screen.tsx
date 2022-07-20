import React, {useState} from 'react';
import {OfferCard} from '../../types/OfferCard';
import Map from '../../components/map/map';
import {City, Points, Point} from '../../types/types';
import ListOffer from '../../components/listOffer/listOffer';
import {TypeOfferList} from '../../const';

type LocationsScreenProps = {
  placesCount: number;
  offers: OfferCard[];
  city: City;
  points: Points;
}

function LocationsScreen({placesCount,offers, city, points}:LocationsScreenProps): JSX.Element {
  const [activeOfferCard,setActiveOfferCard] = React.useState('1');
  const [isClickPopular,setIsClickPopular] = React.useState(false);

  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(
    undefined
  );

  const onListItemHover = (listItemName: string) => {
    const currentPoint = points.find((point) => point.title === listItemName);

    setSelectedPoint(currentPoint);
  };

  return (
    <div>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Paris</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Cologne</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Brussels</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item tabs__item--active">
                <span>Amsterdam</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Hamburg</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Dusseldorf</span>
              </a>
            </li>
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{placesCount} places to stay in Amsterdam</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0} onClick={()=>{setIsClickPopular((_isClickPopular) => !_isClickPopular);}}>
                      Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"/>
                </svg>
              </span>
              {isClickPopular &&
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>}
            </form>
            <div className="cities__places-list places__list tabs__content">
              <ListOffer typeList={TypeOfferList.CITY} offers={offers} onListItemHover={onListItemHover} activeOfferCard={activeOfferCard} setActiveOfferCard={setActiveOfferCard}/>
            </div>
          </section>

          <div className="cities__right-section">
            <section className="cities__map map">
              <Map city={city} points={points} selectedPoint={selectedPoint} height={'810px'} width={'525px'} marginLeft={'inherit'} marginRight={'auto'}/>
            </section>
          </div>
        </div>
      </div>
    </div>);
}

export default LocationsScreen;
