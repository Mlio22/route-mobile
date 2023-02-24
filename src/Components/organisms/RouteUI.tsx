import React from 'react';
import {RouteSummary} from '../atoms/route/RouteSummary';
import {RouteSteps} from '../atoms/route/RouteSteps';

export const RouteUI = () => {
  return (
    <>
      <RouteSummary />
      <RouteSteps />
    </>
  );
};
