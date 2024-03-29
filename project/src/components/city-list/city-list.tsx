import {City} from '../../types/types';
import {useAppDispatch} from '../../hooks';
import CityName from './city-name';
import { setCity } from '../../store/data-process/data-process';
import React from 'react';

type CityListComponentProps = {
  cityList: City[];
  currentCityName: string;
}

export default function CityListComponent(props:CityListComponentProps){
  const dispatch = useAppDispatch();
  return (
    <>
      {props.cityList.map((city, id)=>{
        const keyValue = `${id}-${city}`;
        return(
          <li className="locations__item" key={keyValue} onClick={() => dispatch(setCity(city.name))}>
            <CityName name={city.name} className={(props.currentCityName === city.name) ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}/>
          </li>);
      })}
    </>
  );
}
