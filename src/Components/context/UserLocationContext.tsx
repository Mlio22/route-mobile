import React from 'react';

export type locationInfo = {
  isShown: any | boolean;
  coordinates: {latitude?: number; longitude?: number};
};

export type UserLocationContextType = {
  locationInfo: locationInfo;
  updateInfo: (newInfo: locationInfo) => void;
};

export const UserLocationContext: React.Context<UserLocationContextType> =
  React.createContext({
    locationInfo: {
      isShown: false,
      coordinates: {},
    },
    updateInfo: _ => {},
  });
