import TabSort from '../tab-sort/tab-sort';
import ListOffer from '../list-offer/list-offer';
import {pointsForMap, TypeOfferList} from '../../const';
import Map from '../map/map';
import React, {useState} from 'react';
import {PointWithId} from '../../types/types';
import {useAppSelector} from '../../hooks';
import {getCity, getOffers} from '../../store/data-process/selectors';

function OffersForCity() {
  const [selectedPoint, setSelectedPoint] = useState<PointWithId | undefined>(
    undefined
  );
  const offerFromCurrentCity = useAppSelector(getOffers);
  const points = pointsForMap(offerFromCurrentCity);
  const currentCity = useAppSelector(getCity);
  const onListItemHover = (id: number) => {
    const currentPoint = points.find((point) => point.id === id);
    setSelectedPoint(currentPoint);
  };
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offerFromCurrentCity.length} places to stay in {currentCity.name}</b>
          <TabSort/>
          <div className="cities__places-list places__list tabs__content">
            <ListOffer typeList={TypeOfferList.CITY} offers={offerFromCurrentCity} onListItemHover={onListItemHover}/>
          </div>
        </section>

        <div className="cities__right-section">
          <section className="cities__map map">
            <Map city={currentCity} points={points} selectedPoint={selectedPoint} height={'810px'} width={'525px'} marginLeft={'inherit'} marginRight={'auto'}/>
          </section>
        </div>
      </div>
    </div>);
}

export default OffersForCity;
