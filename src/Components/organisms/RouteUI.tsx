import React from 'react';
import {SearchContext} from '../context/SearchContext';
import {UserLocationContext} from '../context/UserLocationContext';
import {RouteMap} from './RouteMap';
import {RouteSummary} from '../atoms/route/RouteSummary';
import {RouteSteps} from '../atoms/route/RouteSteps';

export type RouteInfo = {
  distance?: any;
  duration?: any;
};

export type RawStepsType = {
  distance: string;
  duration: string;
  polyline: {
    points: string;
  };
  maneuver: string;
  html_instructions: string;
}[];

type RouteDetails = {
  summary: RouteInfo;
  steps: RawStepsType;
};

type RouteUIProps = {
  mapRef: React.RefObject<RouteMap>;
};

const GOOGLE_PLACES_API_KEY = 'AIzaSyCjpcDm8TzqStHV2YMsPzIlnHUy8W5zDFo';

export const RouteUI = (props: RouteUIProps) => {
  const {locationInfo} = React.useContext(UserLocationContext);
  const {searchInfo} = React.useContext(SearchContext);
  const [routeDetails, updateRouteDetails] = React.useState<RouteDetails>();

  // todo: load steps
  const {coordinates} = locationInfo;
  const {selectedPlaceId} = searchInfo;

  const userCoordinates = `${coordinates?.latitude},${coordinates?.longitude}`;
  // const userCoordinates = '-6.980611,107.632827';

  React.useEffect(() => {
    async function getData() {
      const URL = `https://maps.googleapis.com/maps/api/directions/json?origin=${userCoordinates}&destination=place_id:${selectedPlaceId}&key=${GOOGLE_PLACES_API_KEY}`;

      const response = await fetch(URL),
        responseJSON = await response.json();

      const {distance, duration, steps} = responseJSON.routes[0].legs[0];

      const newRouteDetails: RouteDetails = {
        summary: {
          distance,
          duration,
        },
        steps,
      };

      updateRouteDetails(newRouteDetails);
    }

    getData();
  }, [props.mapRef, selectedPlaceId, userCoordinates]);

  return (
    <>
      {routeDetails && (
        <>
          <RouteSummary summary={routeDetails.summary} />
          <RouteSteps mapRef={props.mapRef} stepsRaw={routeDetails.steps} />
        </>
      )}
    </>
  );
};
