import React from 'react';
import {CityList} from '../../const';
import CityListComponent from '../../components/city-list/city-list';
import {useAppSelector} from '../../hooks';
import OffersForCity from '../../components/offers-for-city/offers-for-city';
import {getCity, getOfferList} from '../../store/data-process/selectors';
import MainEmpty from '../../components/main-empty/main-empty';

function LocationsScreen(): JSX.Element {
  const currentCity = useAppSelector(getCity);
  const offerList = useAppSelector(getOfferList);
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
      {offerList.length === 0 ? <MainEmpty city={currentCity}/> : <OffersForCity/>}
    </div>);
}

export default LocationsScreen;
