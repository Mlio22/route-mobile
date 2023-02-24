import React from 'react';
import {PlaceDetailContextProvider} from './locationDetails/PlaceDetailsContext';
import {PlaceRouteContextProvider} from './locationDetails/PlaceRouteContext';
import {PreviewModeContextProvider} from './locationDetails/PreviewModeContext';

export const LocationDetailsContextProvider = (props: any) => {
  const {placeId} = props;

  return (
    <PlaceDetailContextProvider placeId={placeId}>
      <PlaceRouteContextProvider placeId={placeId}>
        <PreviewModeContextProvider>
          {props.children}
        </PreviewModeContextProvider>
      </PlaceRouteContextProvider>
    </PlaceDetailContextProvider>
  );
};
