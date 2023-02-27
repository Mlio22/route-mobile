export type ChildrenProp = {
  children?: React.ReactNode;
};

export type SearchInfoType = {
  searchQuery?: string;
  selectedPlaceId?: string;
};

export type SearchContextType = {
  searchInfo: SearchInfoType;
  updateInfo: (newInfo: SearchInfoType) => void;
};

export type CoordinatesObjectType = {
  latitude: number;
  longitude: number;
};

export type CoordinatesObjectNullableType = {
  latitude: number | null;
  longitude: number | null;
};

export type CoordinatesArrayType = [number, number];
export type CoordinatesArrayNullableType = [number | null, number | null];

export type CoordinatesType = CoordinatesArrayType | CoordinatesObjectType;

export type LocationInfoType = {
  isEnabled: React.RefObject<boolean>;
  userCoordinates: React.RefObject<CoordinatesObjectType>;
};

export type UserLocationContextType = LocationInfoType & {
  activateUserLocation: () => Promise<void>;
};
