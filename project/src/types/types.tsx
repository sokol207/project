export type City = {
  name: string;
  point:{
    lat: number;
    lng: number;
  };
  zoom: number;
};

export type Point = {
  lat: number;
  lng: number;
};

export type PointWithTitle = {
  title: string;
  point: Point;
};

export type Points = PointWithTitle[];
