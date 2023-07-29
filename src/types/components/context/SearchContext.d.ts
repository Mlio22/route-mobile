export type SearchInfoType = {
  searchQuery?: string;
  selectedPlaceId?: string;
};

export type SearchContextType = {
  searchInfo: SearchInfoType;
  updateInfo: (newInfo: SearchInfoType) => void;
  clearSearch: () => void;
};
