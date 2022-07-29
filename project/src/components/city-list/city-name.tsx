import React from 'react';
import {Link} from 'react-router-dom';

type CityProps = {
  name :string;
  className:string;
}

export default function CityName(props:CityProps){
  return (
    <Link className={props.className} to="/">
      <span>{props.name}</span>
    </Link>
  );
}

