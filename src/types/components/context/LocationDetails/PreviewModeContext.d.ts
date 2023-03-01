export type contextDefaultType = {
  previewMode: PreviewModeType;
  updatePreviewMode: (newMode: PreviewModeType) => void;
};
export type PreviewModeType = 'place' | 'route';
