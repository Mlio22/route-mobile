import React from 'react';
import {LocationDetailsCard} from '../../Components/organisms/LocationDetailsCard';
import {RouteUI} from '../../Components/organisms/RouteUI';
import {PreviewModeContext} from '../context/locationDetails/PreviewModeContext';

export const LocationDetailsUI = () => {
  const {previewMode} = React.useContext(PreviewModeContext);
  console.log(previewMode);

  return previewMode === 'place' ? <LocationDetailsCard /> : <RouteUI />;
};
