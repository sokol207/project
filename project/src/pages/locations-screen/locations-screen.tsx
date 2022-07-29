import React, {useEffect} from 'react';
import {CityList} from '../../const';
import CityListComponent from '../../components/city-list/city-list';
import {useAppSelector} from '../../hooks';
import OffersForCity from '../../components/offers-for-city/offers-for-city';
import {getCity, getOfferList} from '../../store/data-process/selectors';
import {store} from '../../store';
import {fetchHotelsAction} from '../../store/api-actions';

function LocationsScreen(): JSX.Element {
  const offerList = useAppSelector(getOfferList);
  useEffect(()=>{
    if(offerList.length === 0) {
      store.dispatch(fetchHotelsAction());
    }
  });
  const currentCity = useAppSelector(getCity);
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
      <OffersForCity/>
    </div>);
}

export default LocationsScreen;
