export type ChildrenProp = {
  children?: React.ReactNode;
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
