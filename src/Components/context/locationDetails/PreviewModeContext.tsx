import React from 'react';
import {
  PreviewModeType,
  contextDefaultType,
} from '../../../types/components/context/LocationDetails/PreviewModeContext';

const contextDefault: contextDefaultType = {
  previewMode: 'place',
  updatePreviewMode: (_: any) => {},
};

export const PreviewModeContext =
  React.createContext<contextDefaultType>(contextDefault);

export const PreviewModeContextProvider = (props: any) => {
  const [previewMode, updateMode] = React.useState<PreviewModeType>('place');

  const updatePreviewMode = (newMode: PreviewModeType) => {
    if (newMode === previewMode) return;
    updateMode(newMode);
  };

  const previewContextObj: contextDefaultType = {
    previewMode,
    updatePreviewMode,
  };

  return (
    <PreviewModeContext.Provider value={previewContextObj}>
      {props.children}
    </PreviewModeContext.Provider>
  );
};
