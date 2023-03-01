import React from 'react';

import {PlaceRouteContext} from '../../context/locationDetails/PlaceRouteContext';
import {RouteMapChildrenProps} from '../../../types/molecules/LocationMapChildren/LocationMapChildren';
import {RouteLineLayers} from './RouteLineLayers';

export const RouteChildren = (props: RouteMapChildrenProps) => {
  let {isDataReady, routeLineListRef} = React.useContext(PlaceRouteContext)!;
  let routelayers;

  if (isDataReady && routeLineListRef?.current) {
    routelayers = RouteLineLayers(routeLineListRef.current);
    props.routeMapRef.boundUserAndTarget();
  }

  return <>{routelayers}</>;
};
