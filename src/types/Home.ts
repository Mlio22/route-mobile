export type ChildrenProp = {
  children?: React.ReactNode;
  trafficIndicatorRef?: React.RefObject<boolean>;
};

export type CoordinatesObjectType = {
  latitude: number;
  longitude: number;
};

export type CoordinatesObjectNullableType = {
  latitude: number | null;
  longitude: number | null;
};

export type CoordinatesArrayType = number[];
export type CoordinatesArrayNullableType = [number | null, number | null];

export type CoordinatesType = CoordinatesArrayType | CoordinatesObjectType;
