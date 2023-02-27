import React from 'react';
import MapboxGL from '@rnmapbox/maps';

import {UserMarkerIcon} from '../atoms/UserMarkerIcon';
import {UserLocationContext} from '../context/UserLocationContext';

export const UserMarker = () => {
  const userLocation = React.useContext(UserLocationContext);

  const {isEnabled, userCoordinates} = userLocation;
  const [isEnabledState, setEnable] = React.useState(isEnabled.current);

  const interval = setInterval(() => {
    if (isEnabledState !== isEnabled.current) {
      setEnable(isEnabled.current);
    }
  }, 1000);

  React.useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  });

  if (!isEnabledState) return <></>;

  const {longitude, latitude} = userCoordinates.current!;

  return (
    <>
      <MapboxGL.MarkerView coordinate={[longitude, latitude]}>
        <UserMarkerIcon />
      </MapboxGL.MarkerView>
    </>
  );
};
