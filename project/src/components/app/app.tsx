import React from 'react';
import LocationsScreen from '../../pages/locations-screen/locations-screen';

type AppScreenProps = {
  placesCount: number;
}

function App({placesCount}:AppScreenProps): JSX.Element {
  return <LocationsScreen placesCount={placesCount}/>;
}

export default App;
