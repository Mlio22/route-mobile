import React from 'react';

type SearchInfoType = {
  searchQuery?: string;
  selectedPlaceId?: string;
  selectedPlaceDetail?: {
    coordinates: number[];
    bounds: {
      ne: number[];
      sw: number[];
    };
  };
};

type SearchContextType = {
  searchInfo: SearchInfoType;
  updateInfo: (newInfo: SearchInfoType) => Promise<void>;
};

type props = {
  children: React.ReactNode;
};

const searchInfoDefaultValue: SearchInfoType = {
  searchQuery: '',
  selectedPlaceId: '',
  selectedPlaceDetail: {
    coordinates: [],
    bounds: {
      ne: [],
      sw: [],
    },
  },
};

const contextDefaultValue: SearchContextType = {
  searchInfo: searchInfoDefaultValue,
  updateInfo: async (_: any) => {},
};

const GOOGLE_PLACES_API_KEY = 'AIzaSyCjpcDm8TzqStHV2YMsPzIlnHUy8W5zDFo';

async function getTargetLocationData(placeId: string) {
  const API_URL = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${GOOGLE_PLACES_API_KEY}`;

  const response = await fetch(API_URL, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    responseJson = await response.json();

  const {
    geometry: {
      location: {lat, lng},
      viewport: {
        northeast: {lat: boundY1, lng: boundX1},
        southwest: {lat: boundY2, lng: boundX2},
      },
    },
  } = responseJson.results[0];

  const coordinates = [lng, lat],
    bounds = {
      ne: [boundX1, boundY1],
      sw: [boundX2, boundY2],
    };

  return {coordinates, bounds};
}

const SearchContext: React.Context<SearchContextType> =
  React.createContext(contextDefaultValue);

const SearchContextProvider = (props: props) => {
  const [searchInfo, updateSearchInfo] = React.useState<SearchInfoType>(
    searchInfoDefaultValue,
  );

  const updateInfo = async (newInfo: SearchInfoType) => {
    if (newInfo.selectedPlaceId !== searchInfo.selectedPlaceId) {
      const placeId = newInfo.selectedPlaceId!;
      newInfo.selectedPlaceDetail = await getTargetLocationData(placeId);
    }

    newInfo = {
      ...searchInfo,
      ...newInfo,
    };

    updateSearchInfo(newInfo);
  };

  const searchContextObj: SearchContextType = {
    searchInfo,
    updateInfo,
  };

  const {children} = props;

  return (
    <SearchContext.Provider value={searchContextObj}>
      {children}
    </SearchContext.Provider>
  );
};

export type {SearchInfoType, SearchContextType};
export {SearchContext, SearchContextProvider, searchInfoDefaultValue};
