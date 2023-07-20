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
import {getValueFromAsyncStorage} from '../storages/vehiclevalue';
import {getPreferenceToAsyncStorage} from '../storages/Preferecevalue';

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

function extractPlaceGeolocationData(jsonResponse: any) {
  const {
    geometry: {
      location: {lat, lng},
    },
  } = jsonResponse.results[0];
  return {lat, lng};
}

async function getPlaceGeolocationData(placeId: string) {
  const API_URL = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${GOOGLE_API_TOKEN}`;

  const response = await fetch(API_URL),
    responseJson = await response.json(),
    geolocationData = extractPlaceGeolocationData(responseJson);

  return geolocationData;
}

async function getData(param: routeParam) {
  const {selectedPlaceId, userCoordinates} = param;

  const {latitude: source_lat, longitude: source_lon} = userCoordinates;
  const {lat: target_lat, lng: target_lon} = await getPlaceGeolocationData(
    selectedPlaceId,
  );
  const userVehicle = await getValueFromAsyncStorage();
  // console.log(userVehicle);
  const listPriority = await getPreferenceToAsyncStorage('preference');
  // console.log(listPriority);

  const sourceCoordinatesString = `${source_lat},${source_lon}`;
  const targetCoordinatesString = `${target_lat},${target_lon}`;

  const URL = `https://maps.googleapis.com/maps/api/directions/json?origin=${sourceCoordinatesString}&destination=place_id:${selectedPlaceId}&key=${GOOGLE_API_TOKEN}`;
  const URL2 = `http://localhost:3000/route?coordinates=${sourceCoordinatesString};${targetCoordinatesString}&vehicle=${userVehicle}&priorities=${listPriority}`;
  console.log(URL2);

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
