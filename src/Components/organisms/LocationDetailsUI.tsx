import React from 'react';

import {PreviewModeContext} from '../context/locationDetails/PreviewModeContext';
import {LocationDetailsCard} from '../../Components/organisms/LocationDetailsCard';
import {RouteUI} from '../../Components/organisms/RouteUI';

export const LocationDetailsUI = () => {
  const {previewMode} = React.useContext(PreviewModeContext);

  return previewMode === 'place' ? <LocationDetailsCard /> : <RouteUI />;
};
