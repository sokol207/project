import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/use-map';
import {City, PointsWithId, PointWithId} from '../../types/types';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  points: PointsWithId;
  selectedPoint: PointWithId | undefined;
  height:string;
  width:string;
  marginLeft:string;
  marginRight:string;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});


function Map(props: MapProps): JSX.Element {
  const {city, points, selectedPoint} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  useEffect(() => {
    if (map) {
      map?.setView([city.location.latitude, city.location.longitude],city.location.zoom);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.point.latitude,
          lng: point.point.longitude
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.id === selectedPoint.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, points, selectedPoint]);

  return <div style={{height: props.height, width: props.width, marginLeft: props.marginLeft, marginRight: props.marginRight}} ref={mapRef}></div>;
}

export default Map;
