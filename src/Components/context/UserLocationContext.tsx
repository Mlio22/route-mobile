import React from 'react';
import {
  ChildrenProp,
  CoordinatesObjectType,
  UserLocationContextType,
} from '../../types/Home';
import {
  checkUserLocationFirst,
  enableUserLocation,
  getUserCoordinates,
} from '../../utils/UserLocation';

const contextDefaultValue: UserLocationContextType = {
  isEnabled: null as unknown as React.RefObject<boolean>,
  userCoordinates: null as unknown as React.RefObject<CoordinatesObjectType>,
  activateUserLocation: async () => {},
};

export const UserLocationContext = React.createContext(contextDefaultValue);

export const UserLocationContextProvider = (props: ChildrenProp) => {
  let interval: ReturnType<typeof setInterval>;

  // todo:
  // on startup, get user location if GPS is enabled.
  // if user enabled location, listen every 10 secs until it detects that location has disabled
  // add manual settings for user location
  const isEnabled = React.useRef(false);
  const userCoordinates = React.useRef<CoordinatesObjectType>({
    longitude: null,
    latitude: null,
  });

  const onLocationActivated = () => {
    interval = setInterval(async () => {
      if (!isEnabled.current) clearInterval(interval);

      // check user location still enabled every 1s
      isEnabled.current = await checkUserLocationFirst();
    }, 1000);
  };

  const activateUserLocation = async () => {
    isEnabled.current = await enableUserLocation();
    userCoordinates.current = getUserCoordinates();

    if (isEnabled.current) onLocationActivated();
  };

  const userLocationStartup = async () => {
    isEnabled.current = await checkUserLocationFirst();
    userCoordinates.current = getUserCoordinates();

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
