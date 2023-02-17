import React from 'react';

type LocationInfoType = {
  isEnabled?: any | boolean;
  coordinates?: {latitude?: number; longitude?: number};
};

type UserLocationContextType = {
  locationInfo: LocationInfoType;
  updateInfo: (newInfo: LocationInfoType) => void;
};

const userLocationDefaultValue: LocationInfoType = {
  isEnabled: false,
  coordinates: {},
};

const contextDefaultValue: UserLocationContextType = {
  locationInfo: userLocationDefaultValue,
  updateInfo: (_: any) => {},
};

type props = {
  children: React.ReactNode;
};

const UserLocationContext: React.Context<UserLocationContextType> =
  React.createContext(contextDefaultValue);

const UserLocationContextProvider = (props: props) => {
  const [locationInfo, updateLocationInfo] = React.useState<LocationInfoType>(
    userLocationDefaultValue,
  );

  const updateInfo = (newInfo: LocationInfoType) => {
    newInfo = {
      ...locationInfo,
      ...newInfo,
    };

    updateLocationInfo(newInfo);
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
