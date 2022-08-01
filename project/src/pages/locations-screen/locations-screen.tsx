import React, {useState} from 'react';
import Map from '../../components/map/map';
import {PointWithId} from '../../types/types';
import ListOffer from '../../components/list-offer/list-offer';
import {TypeOfferList, CityList, pointsForMap} from '../../const';
import CityListComponent from '../../components/city-list/city-list';
import {useAppSelector} from '../../hooks';
import TabSort from '../../components/tab-sort/tab-sort';

function LocationsScreen(): JSX.Element {
  const [activeOfferCard,setActiveOfferCard] = React.useState('1');
  const [selectedPoint, setSelectedPoint] = useState<PointWithId | undefined>(
    undefined
  );
  const offerFromCurrentCity = useAppSelector((state)=>state.offers);
  const currentCity = useAppSelector((state)=>state.city);
  const points = pointsForMap(offerFromCurrentCity);
  const onListItemHover = (id: number) => {
    const currentPoint = points.find((point) => point.id === id);
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
            <TabSort/>
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
