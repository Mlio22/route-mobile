import React, {useState, useRef} from 'react';
import {UserLocationContext} from '../UserLocationContext';

// @ts-ignore
import mapboxPolyline from '@mapbox/polyline';
import {CoordinatesObjectType} from '../../../types/Home';
import {GOOGLE_API_TOKEN} from '@env';

type routeInfoType = {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
};

type rawStepType = routeInfoType & {
  polyline: {
    points: string;
  };
  maneuver: string;
  html_instructions: string;
};

type ProcessedStepType = routeInfoType & {
  maneuver: string;
  congestionIndex: number;
  html_instructions: string;
};

type polylineDataRaw = {
  polylineString: string;
  congestionIndex: number;
};

type placeRouteContextDefault = {
  isDataReady: boolean;
  routeSummary?: React.RefObject<routeInfoType | undefined>;
  routeSteps?: React.RefObject<ProcessedStepType[]>;
  routeLineList?: React.RefObject<PolylineRouteType[]>;
};

const contextDefaultValue: placeRouteContextDefault = {
  isDataReady: false,
};

async function getData(
  selectedPlaceId: string,
  userCoordinates: CoordinatesObjectType,
) {
  const {latitude, longitude} = userCoordinates,
    coordinates = `${latitude},${longitude}`;

  const URL = `https://maps.googleapis.com/maps/api/directions/json?origin=${coordinates}&destination=place_id:${selectedPlaceId}&key=${GOOGLE_API_TOKEN}`;

  const response = await fetch(URL),
    responseJSON = await response.json();

  console.log(responseJSON);

  const {distance, duration, steps} = responseJSON.routes[0].legs[0];

  const routeSummary = {
    distance,
    duration,
  } as routeInfoType;

  const rawSteps = steps as rawStepType[];

  return {routeSummary, rawSteps};
}

const processRouteSteps = (stepsRawData: rawStepType[]) => {
  let stepsList: ProcessedStepType[] = [],
    polylineList: polylineDataRaw[] = [];

  stepsRawData.forEach(step => {
    const {
      distance,
      duration,
      polyline: {points: polylineString},
      maneuver,
      html_instructions,
    } = step;

    const congestionIndex = Math.floor(Math.random() * 3);

    stepsList.push({
      distance,
      duration,
      maneuver,
      congestionIndex,
      html_instructions,
    });

    polylineList.push({
      polylineString,
      congestionIndex,
    });
  });

  return {steps: stepsList, polylines: polylineList};
};

type PolylineRouteType = {
  congestionIndex: number;
  coordinates: number[][];
};

function fixCoordinates(polylineString: string): number[][] {
  const coordinatesList = mapboxPolyline.decode(polylineString);

  return coordinatesList.map((coordinate: number[]) => {
    const [lat, lng] = coordinate;
    return [lng, lat];
  });
}

const processPolylineStrings = (polylineDataList: polylineDataRaw[]) => {
  let polylineRoute: PolylineRouteType[] = [];

  polylineDataList.forEach(polylineData => {
    const {polylineString, congestionIndex} = polylineData;
    const coordinates = fixCoordinates(polylineString);

    polylineRoute.push({
      coordinates,
      congestionIndex,
    });
  });

  return polylineRoute;
};

export const PlaceRouteContext =
  React.createContext<placeRouteContextDefault>(contextDefaultValue);

export const PlaceRouteContextProvider = (props: any) => {
  const [isDataReady, updateIsDataReady] = useState(false);
  const placeId = useRef<string>('');

  const {userCoordinates} = React.useContext(UserLocationContext);

  const routeSummary = useRef<routeInfoType>();
  const routeSteps = useRef<ProcessedStepType[]>([]);
  const routeLineList = useRef<PolylineRouteType[]>([]);

  const updateReadyStatus = (newStatus: boolean) => {
    if (isDataReady === newStatus) return;
    updateIsDataReady(newStatus);
  };

  (async () => {
    if (placeId === props.placeId || isDataReady) return;

    const {routeSummary: newSummary, rawSteps} = await getData(
      props.placeId,
      userCoordinates.current!,
    );

    const {steps: processedSteps, polylines} = processRouteSteps(rawSteps);
    const processedRouteLine = processPolylineStrings(polylines);

    placeId.current = props.placeId;
    routeSummary.current = newSummary;
    routeSteps.current = processedSteps;
    routeLineList.current = processedRouteLine;

    updateReadyStatus(true);
  })();

  const placeRouteContextObj: placeRouteContextDefault = {
    isDataReady,
    routeSummary,
    routeSteps,
    routeLineList,
  };

  return (
    <PlaceRouteContext.Provider value={placeRouteContextObj}>
      {props.children}
    </PlaceRouteContext.Provider>
  );
};
