import React from 'react';
import {
  checkUserLocationFirst,
  enableUserLocation,
  getUserCoordinates,
} from '../../utils/UserLocation';

import {CoordinatesObjectType} from '../../types/Home';
import {UserLocationContextType} from '../../types/components/context/UserLocationContext';

const contextDefaultValue: UserLocationContextType = {
  isEnabled: null as unknown as React.RefObject<boolean>,
  userCoordinates: null as unknown as React.RefObject<CoordinatesObjectType>,
  activateUserLocation: async () => {},
};

export const UserLocationContext = React.createContext(contextDefaultValue);

export const UserLocationContextProvider = (props: any) => {
  let interval: ReturnType<typeof setInterval>;

  const isEnabled = React.useRef(false);
  const userCoordinates = React.useRef<CoordinatesObjectType>({
    longitude: 0,
    latitude: 0,
  });

  const onLocationActivated = () => {
    interval = setInterval(async () => {
      if (!isEnabled.current) clearInterval(interval);

      // check user location still enabled every 10s
      isEnabled.current = await checkUserLocationFirst();
    }, 10000);
  };

  const activateUserLocation = async () => {
    isEnabled.current = await enableUserLocation();
    userCoordinates.current = getUserCoordinates();

    if (isEnabled.current) onLocationActivated();
  };

  const userLocationStartup = async () => {
    isEnabled.current = await checkUserLocationFirst();
    userCoordinates.current = getUserCoordinates();

    console.log(isEnabled, userCoordinates);

    if (isEnabled.current) onLocationActivated();
  };

  userLocationStartup();

  const locationInfoContextObj: UserLocationContextType = {
    isEnabled,
    userCoordinates,
    activateUserLocation,
  };

  const {children} = props;

  return (
    <UserLocationContext.Provider value={locationInfoContextObj}>
      {children}
    </UserLocationContext.Provider>
  );
};
