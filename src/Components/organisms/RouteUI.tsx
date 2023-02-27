import React from 'react';
import {RouteSummary} from '../atoms/routeUI/RouteSummary';
import {RouteSteps} from '../atoms/routeUI/RouteSteps';

export const RouteUI = () => {
  return (
    <>
      <RouteSummary />
      <RouteSteps />
    </>
  );
};
