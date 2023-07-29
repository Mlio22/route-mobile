import React, {useState, useRef} from 'react';
import {UserLocationContext} from '../UserLocationContext';

import {
  PlaceRouteProps,
  PolylineRouteType,
  ProcessedStepType,
  placeRouteContextDefault,
  routeInfoType,
} from '../../../types/components/context/LocationDetails/PlaceRouteContext';
import {retrieveRouteData} from '../../../utils/PlaceRouteUtils';

const contextDefaultValue: placeRouteContextDefault = {
  isDataReady: false,
};

export const PlaceRouteContext = React.createContext(contextDefaultValue);

export const PlaceRouteContextProvider = (props: PlaceRouteProps) => {
  const [isDataReady, updateIsDataReady] = useState(false);

  const isRouteFoundRef = useRef<boolean>(false);
  const placeIdRef = useRef<string>('');
  const routeSummaryRef = useRef<routeInfoType>({} as routeInfoType);
  const routeStepsRef = useRef<ProcessedStepType[]>([]);
  const routeLineListRef = useRef<PolylineRouteType[]>([]);

  const {userCoordinates} = React.useContext(UserLocationContext);

  const updateReadyStatus = (newStatus: boolean) => {
    if (isDataReady === newStatus) return;
    updateIsDataReady(newStatus);
  };

  (async () => {
    if (placeIdRef.current! === props.placeId || isDataReady) return;

    const current_placeId = props.placeId;
    const currentUserCoordinates = userCoordinates.current!;

    const routeParam = {
      selectedPlaceId: current_placeId,
      userCoordinates: currentUserCoordinates,
    };

    const {routeSummary, processedRouteLine, routeSteps, routeFound} =
      await retrieveRouteData(routeParam);

    placeIdRef.current = props.placeId;
    isRouteFoundRef.current = routeFound;
    routeSummaryRef.current = routeSummary!;
    routeLineListRef.current = processedRouteLine!;
    routeStepsRef.current = routeSteps!;

    updateReadyStatus(true);
  })();

  const placeRouteContextObj: placeRouteContextDefault = {
    isDataReady,
    isRouteFoundRef,
    routeSummaryRef,
    routeStepsRef,
    routeLineListRef,
  };

  return (
    <PlaceRouteContext.Provider value={placeRouteContextObj}>
      {props.children}
    </PlaceRouteContext.Provider>
  );
};
