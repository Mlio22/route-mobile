import React from 'react';

export type PreviewModeType = 'place' | 'route';

type contextDefaultType = {
  previewMode: PreviewModeType;
  updatePreviewMode: (newMode: PreviewModeType) => void;
};
const contextDefault: contextDefaultType = {
  previewMode: 'place',
  updatePreviewMode: (_: any) => {},
};

export const PreviewModeContext =
  React.createContext<contextDefaultType>(contextDefault);

export const PreviewModeContextProvider = (props: any) => {
  const [previewMode, updateMode] = React.useState<PreviewModeType>('place');

  const updatePreviewMode = (newMode: PreviewModeType) => {
    console.log(newMode, previewMode);

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
