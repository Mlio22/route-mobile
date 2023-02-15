import React from 'react';

type LocationInfoType = {
  isShown: any | boolean;
  coordinates: {latitude?: number; longitude?: number};
};

type UserLocationContextType = {
  locationInfo: LocationInfoType;
  updateInfo: (newInfo: LocationInfoType) => void;
};

const userLocationDefaultValue: LocationInfoType = {
  isShown: false,
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
    updateLocationInfo(newInfo);
  };

  const locationInfoObj: UserLocationContextType = {
    locationInfo,
    updateInfo,
  };

  const {children} = props;

  return (
    <UserLocationContext.Provider value={locationInfoObj}>
      {children}
    </UserLocationContext.Provider>
  );
};

export type {LocationInfoType, UserLocationContextType};
export {UserLocationContext, UserLocationContextProvider};
