import React from 'react';

type LocationInfoType = {
  isEnabled?: boolean;
  coordinates?: {latitude?: number; longitude?: number};
};

type UserLocationContextType = {
  locationInfo: React.RefObject<LocationInfoType>;
  updateInfo: (newInfo: LocationInfoType) => void;
};

const userLocationDefaultValue: LocationInfoType = {
  isEnabled: false,
  coordinates: {},
};

const contextDefaultValue: UserLocationContextType = {
  locationInfo: undefined as unknown as React.RefObject<LocationInfoType>,
  updateInfo: (_: any) => {},
};

type props = {
  children: React.ReactNode;
};

const UserLocationContext: React.Context<UserLocationContextType> =
  React.createContext(contextDefaultValue);

const UserLocationContextProvider = (props: props) => {
  const locationInfo = React.useRef<LocationInfoType>(userLocationDefaultValue);

  const updateInfo = (newInfo: LocationInfoType) => {
    newInfo = {
      ...locationInfo,
      ...newInfo,
    };

    locationInfo.current = newInfo;
  };

  const locationInfoContextObj: UserLocationContextType = {
    locationInfo,
    updateInfo,
  };

  const {children} = props;

  return (
    <UserLocationContext.Provider value={locationInfoContextObj}>
      {children}
    </UserLocationContext.Provider>
  );
};

export type {LocationInfoType, UserLocationContextType};
export {
  UserLocationContext,
  UserLocationContextProvider,
  userLocationDefaultValue,
};
