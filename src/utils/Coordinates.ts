import {CoordinatesObjectType} from '../types/Home';

export const coordinatesObjToArr = (coords: CoordinatesObjectType) => {
  const {latitude, longitude} = coords;

  return [longitude, latitude];
};

export const coordinatesArrToObj = (coords: number[]) => {
  const [longitude, latitude] = coords;

  return {
    latitude,
    longitude,
  };
};
