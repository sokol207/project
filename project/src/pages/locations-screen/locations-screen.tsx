import React, {useState} from 'react';
import Map from '../../components/map/map';
import {Points, PointWithTitle} from '../../types/types';
import ListOffer from '../../components/listOffer/listOffer';
import {TypeOfferList} from '../../const';
import CityListComponent from '../../components/cityList/cityList';
import {useAppSelector} from '../../hooks';
import {CityList} from '../../const';
import {OfferCard} from '../../types/OfferCard';


function pointForMap(offer:OfferCard): PointWithTitle {
  return {title:offer.name,point:offer.point};
}

function pointsForMap(OfferFromCurrentCity: OfferCard[]):Points
{
  if(OfferFromCurrentCity.length > 0) {
    return OfferFromCurrentCity.map(pointForMap);
  }else {
    return [];
  }
}

function LocationsScreen(): JSX.Element {
  const [activeOfferCard,setActiveOfferCard] = React.useState('1');
  const [isClickPopular,setIsClickPopular] = React.useState(false);
  const [selectedPoint, setSelectedPoint] = useState<PointWithTitle | undefined>(
    undefined
  );
  const offerFromCurrentCity = useAppSelector((state)=>state.offers);
  const currentCity = useAppSelector((state)=>state.city);
  const points = pointsForMap(offerFromCurrentCity);

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
            <CityListComponent cityList={CityList} currentCityName={currentCity.name}/>
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offerFromCurrentCity.length} places to stay in {currentCity.name}</b>
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
              <ListOffer typeList={TypeOfferList.CITY} offers={offerFromCurrentCity} onListItemHover={onListItemHover} activeOfferCard={activeOfferCard} setActiveOfferCard={setActiveOfferCard}/>
            </div>
          </section>

          <div className="cities__right-section">
            <section className="cities__map map">
              <Map city={currentCity} points={points} selectedPoint={selectedPoint} height={'810px'} width={'525px'} marginLeft={'inherit'} marginRight={'auto'}/>
            </section>
          </div>
        </div>
      </div>
    </div>);
}

export default LocationsScreen;
