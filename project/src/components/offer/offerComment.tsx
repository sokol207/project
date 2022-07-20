import Offer from './offer';
import {OfferToList} from '../../types/Offer';

export default function OfferComment (props:OfferToList) {
  return (
    <Offer articleClassName={'near-places__card'} citiesImageClassName={'near-places__image-wrapper'} divClassName={'place-card__info'} {...props}/>
  );
}
