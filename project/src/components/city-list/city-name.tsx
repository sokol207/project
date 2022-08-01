import React from 'react';

type CityProps = {
  name :string;
  className:string;
}

export default function CityName(props:CityProps){
  return (
    <a className={props.className}>
      <span>{props.name}</span>
    </a>
  );
}

