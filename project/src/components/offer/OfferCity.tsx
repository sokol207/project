import Offer from './offer';
import {OfferToList} from '../../types/Offer';

export default function OfferCity (props:OfferToList) {
  return (
    <Offer articleClassName={'cities__card'} citiesImageClassName={'cities__image-wrapper'} divClassName={'place-card__info'} {...props}/>
  );
}
