export type City = {
  name: string;
  location:Point;
};

export type Point = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type PointWithId = {
  id: number;
  point: Point;
};

export type PointsWithId = PointWithId[];

export type DataForPostFavorites = {
  hotelId: number;
  status: number;
  typeReloaded: string;
}
