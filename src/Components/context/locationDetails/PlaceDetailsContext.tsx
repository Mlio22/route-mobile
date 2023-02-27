import React, {useState, useRef} from 'react';

const GOOGLE_PLACES_API_KEY = 'AIzaSyCjpcDm8TzqStHV2YMsPzIlnHUy8W5zDFo';

type placeDataType = {
  previewImageReference: string;
  placeTitle: {
    placeName: string;
    placeType: string;
  };
  locationDetails: {
    address: string;
  };
};

type placeGeolocationType = {
  coordinates: number[];
  bounds: {
    ne: number[];
    sw: number[];
  };
};

type placeDetailContextDefault = {
  isDataReady: boolean;
  placeData?: React.RefObject<placeDataType>;
  placeGeolocation?: React.MutableRefObject<placeGeolocationType>;
};

const contextDefaultValue: placeDetailContextDefault = {
  isDataReady: false,
};

function extractPlaceData(jsonResponse: any): placeDataType {
  const {photos, formatted_address, name, types} = jsonResponse;

  const result: placeDataType = {
    previewImageReference: photos[0].photo_reference,
    placeTitle: {
      placeName: name,
      placeType: types[0],
    },
    locationDetails: {
      address: formatted_address,
    },
  };

  return result;
}

async function getPlaceData(placeId: string): Promise<placeDataType> {
  const API_URL = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GOOGLE_PLACES_API_KEY}`;

  const response = await fetch(API_URL),
    responseJSON = await response.json(),
    placeDataJson = responseJSON.result;

  return extractPlaceData(placeDataJson);
}

type CoordinatesArrayType = [number, number];
type BoundsCoordinatesType = {
  ne: CoordinatesArrayType;
  sw: CoordinatesArrayType;
};

function extractPlaceGeolocationData(jsonResponse: any) {
  const {
    geometry: {
      location: {lat, lng},
      viewport: {
        northeast: {lat: boundY1, lng: boundX1},
        southwest: {lat: boundY2, lng: boundX2},
      },
    },
  } = jsonResponse.results[0];

  const coordinates: CoordinatesArrayType = [lng, lat],
    bounds: BoundsCoordinatesType = {
      ne: [boundX1, boundY1],
      sw: [boundX2, boundY2],
    };

  return {coordinates, bounds};
}

async function getPlaceGeolocationData(placeId: string) {
  const API_URL = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${GOOGLE_PLACES_API_KEY}`;

  const response = await fetch(API_URL),
    responseJson = await response.json(),
    geolocationData = extractPlaceGeolocationData(responseJson);

  return geolocationData;
}

export const PlaceDetailContext = React.createContext(contextDefaultValue);

export const PlaceDetailContextProvider = (props: any) => {
  const [isDataReady, updateIsDataReady] = useState(false);

  const placeId = useRef<string>('');
  const placeData = useRef<placeDataType>();
  const placeGeolocation = useRef<placeGeolocationType>();

  const updateReadyStatus = (newStatus: boolean) => {
    if (isDataReady === newStatus) return;
    updateIsDataReady(newStatus);
  };

  (async () => {
    if (placeId !== props.placeId) {
      const newPlaceData = await getPlaceData(props.placeId);
      const newPlaceGeolocation = await getPlaceGeolocationData(props.placeId);

      placeId.current = props.placeId;
      placeData.current = newPlaceData;
      placeGeolocation.current = newPlaceGeolocation;

      updateReadyStatus(true);
    }
  })();

  const placeDetailContextObj: placeDetailContextDefault = {
    isDataReady,
    placeData,
    placeGeolocation,
  };

  return (
    <PlaceDetailContext.Provider value={placeDetailContextObj}>
      {props.children}
    </PlaceDetailContext.Provider>
  );
};

// todo: buat placedetailsContext yang membawahi mode preview detail dan route detail
