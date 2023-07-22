export type routeInfoType = {
  distance: number;
  duration: number;
};

export type congestionIndexType = number;

export type rawStepType = {
  text: string;
  distance: number;
  duration: number;
  maneuver: string;
};

export type ProcessedStepType = {
  distance: number;
  duration: number;
  maneuver: string;
  text: string;
};

export type polylineDataRaw = [string, number];

export type placeRouteContextDefault = {
  isDataReady: boolean;
  routeSummaryRef?: React.RefObject<routeInfoType>;
  routeStepsRef?: React.RefObject<ProcessedStepType[]>;
  routeLineListRef?: React.RefObject<PolylineRouteType[]>;
};

export type PolylineRouteType = {
  congestionIndex: congestionIndexType;
  coordinates: number[][];
};

export type PlaceRouteProps = {
  placeId: string;
  children?: React.ReactNode;
};
