import {City} from '../../types/types';
import {useAppDispatch} from '../../hooks';
import {setCity} from '../../store/actions';
import CityName from './cityName';

type CityListComponentProps = {
  cityList: City[];
  currentCityName: string;
}

export default function CityListComponent(props:CityListComponentProps){
  const dispatch = useAppDispatch();
  return (
    <>
      {props.cityList.map((city, id)=>{
        const keyValueOffer = `${id}-${city}`;
        return(
          <li className="locations__item" key={keyValueOffer} onClick={() => dispatch(setCity(city.name))}>
            <CityName name={city.name} className={(props.currentCityName === city.name) ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}/>
          </li>);
      })}
    </>
  );
}
