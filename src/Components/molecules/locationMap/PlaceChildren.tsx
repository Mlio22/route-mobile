import React from 'react';
import {PlaceDetailContext} from '../../context/locationDetails/PlaceDetailsContext';
import {RouteMapChildrenProps} from '../../../types/molecules/LocationMapChildren/LocationMapChildren';

export const PlaceChildren = (props: RouteMapChildrenProps) => {
  const {isDataReady, placeGeolocation} = React.useContext(PlaceDetailContext);
  const {routeMapRef} = props;

  if (isDataReady) {
    const {coordinates, bounds} = placeGeolocation?.current!;
    routeMapRef.centerMapToTarget({
      coordinates,
      bounds,
      addPadding: true,
    });
  }

  return <></>;
};
