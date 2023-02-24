import React from 'react';
import MapboxGL from '@rnmapbox/maps';

import {TargetMarkerIcon} from '../atoms/TargetMarkerIcon';
import {PlaceDetailContext} from '../context/locationDetails/PlaceDetailsContext';

export const TargetMarker = () => {
  const {isDataReady, placeGeolocation} = React.useContext(PlaceDetailContext);

  if (isDataReady) {
    const {coordinates} = placeGeolocation?.current!;

    return (
      <MapboxGL.MarkerView coordinate={coordinates}>
        <TargetMarkerIcon />
      </MapboxGL.MarkerView>
    );
  }

  return <></>;
};
