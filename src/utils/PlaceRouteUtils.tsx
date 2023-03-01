// @ts-ignore
import mapboxPolyline from '@mapbox/polyline';
import {GOOGLE_API_TOKEN} from '@env';
import {CoordinatesObjectType} from '../types/Home';
import {
  PolylineRouteType,
  ProcessedStepType,
  polylineDataRaw,
  rawStepType,
  routeInfoType,
} from '../types/components/context/LocationDetails/PlaceRouteContext';

function fixCoordinates(polylineString: string): number[][] {
  const coordinatesList = mapboxPolyline.decode(polylineString);

  return coordinatesList.map((coordinate: number[]) => {
    const [lat, lng] = coordinate;
    return [lng, lat];
  });
}

type routeParam = {
  selectedPlaceId: string;
  userCoordinates: CoordinatesObjectType;
};

async function getData(param: routeParam) {
  const {selectedPlaceId, userCoordinates} = param;

  const {latitude, longitude} = userCoordinates;
  const coordinatesString = `${latitude},${longitude}`;

  const URL = `https://maps.googleapis.com/maps/api/directions/json?origin=${coordinatesString}&destination=place_id:${selectedPlaceId}&key=${GOOGLE_API_TOKEN}`;

  const response = await fetch(URL),
    responseJSON = await response.json();

  const {distance, duration, steps} = responseJSON.routes[0].legs[0];

  const routeSummary = {
    distance,
    duration,
  } as routeInfoType;

  const rawSteps = steps as rawStepType[];

  return {routeSummary, rawSteps};
}

function processRouteSteps(stepsRawData: rawStepType[]) {
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
}

function processPolylineStrings(polylineDataList: polylineDataRaw[]) {
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
}

export async function retrieveRouteData(param: routeParam) {
  const {routeSummary, rawSteps} = await getData(param);

  const {steps: processedSteps, polylines} = processRouteSteps(rawSteps);
  const processedRouteLine = processPolylineStrings(polylines);

  return {routeSummary, processedSteps, processedRouteLine};
}
