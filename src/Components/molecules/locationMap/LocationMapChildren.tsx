import React from 'react';
import {PreviewModeContext} from '../../context/locationDetails/PreviewModeContext';
import {PlaceChildren} from './PlaceChildren';
import {RouteChildren} from './RouteChildren';
import {RouteMapChildrenProps} from '../../../types/molecules/LocationMapChildren/LocationMapChildren';

export const RouteMapChildren = (props: RouteMapChildrenProps) => {
  const {previewMode} = React.useContext(PreviewModeContext);

  if (previewMode === 'place') {
    return <PlaceChildren {...props} />;
  } else {
    return <RouteChildren {...props} />;
  }
};
