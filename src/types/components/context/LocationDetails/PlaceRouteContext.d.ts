export type routeInfoType = {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
};

export type congestionIndexType = 1 | 2 | 3;

export type rawStepType = {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  polyline: {
    points: string;
  };
  maneuver: string;
  html_instructions: string;
};

export type ProcessedStepType = {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  maneuver: string;
  congestionIndex: congestionIndexType;
  html_instructions: string;
};

export type polylineDataRaw = {
  polylineString: string;
  congestionIndex: congestionIndexType;
};

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
