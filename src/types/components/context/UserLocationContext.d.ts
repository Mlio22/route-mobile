export type LocationInfoType = {
  isEnabled: React.RefObject<boolean>;
  userCoordinates: React.RefObject<CoordinatesObjectType>;
};

export type UserLocationContextType = {
  isEnabled: React.RefObject<boolean>;
  userCoordinates: React.RefObject<CoordinatesObjectType>;
  activateUserLocation: () => Promise<void>;
};
