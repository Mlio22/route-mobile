// @ts-ignore
import mapboxPolyline from '@mapbox/polyline';
import {GOOGLE_API_TOKEN} from '@env';
import {CoordinatesObjectType} from '../types/Home';
import {
  PolylineRouteType,
  polylineDataRaw,
  rawStepType,
  routeInfoType,
} from '../types/components/context/LocationDetails/PlaceRouteContext';
import {getValueFromAsyncStorage} from '../storages/vehiclevalue';
import {getPreferenceToAsyncStorage} from '../storages/Preferecevalue';

function fixCoordinates(polylineString: string): number[][] {
  const coordinatesList = mapboxPolyline.decode(polylineString, 6);

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
  const listPriority = await getPreferenceToAsyncStorage();

  const sourceCoordinatesString = `${source_lat},${source_lon}`;
  const targetCoordinatesString = `${target_lat},${target_lon}`;

  const URL = `http://10.0.2.2:3000/route?coordinates=${sourceCoordinatesString};${targetCoordinatesString}&vehicle=${userVehicle}&priorities=${listPriority}`;
  console.log(URL);

  const response = await fetch(URL),
    responseJSON = await response.json();

  const {
    overview: {
      overview_info: {total_distance, total_duration},
      overview_geometries_traffic,
    },
    steps,
  } = responseJSON;

  const routeSummary = {
    distance: total_distance,
    duration: total_duration,
  } as routeInfoType;

  const routeGeometries = overview_geometries_traffic;

  const routeSteps = steps as rawStepType[];

  return {routeSummary, routeGeometries, routeSteps};
}

function processPolylineStrings(polylineDataList: polylineDataRaw[]) {
  let polylineRoute: PolylineRouteType[] = [];

  polylineDataList.forEach(polylineData => {
    const [polylineString, congestionIndex] = polylineData;
    const coordinates = fixCoordinates(polylineString);

    polylineRoute.push({
      coordinates,
      congestionIndex,
    });
  });

  return polylineRoute;
}

export async function retrieveRouteData(param: routeParam) {
  const {routeSummary, routeGeometries, routeSteps} = await getData(param);

  const processedRouteLine = processPolylineStrings(routeGeometries);

  return {routeSummary, routeSteps, processedRouteLine};
}
