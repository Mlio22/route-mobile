import React, {useState, useRef} from 'react';
import {
  PlaceDataUtils,
  PlaceGeolocationUtils,
} from '../../../utils/PlaceDetailUtils';

import {
  placeDataType,
  placeDetailContextDefault,
  placeGeolocationType,
} from '../../../types/components/context/LocationDetails/PlaceDetailsContext';

const contextDefaultValue: placeDetailContextDefault = {
  placeData: null as unknown as React.RefObject<placeDataType>,
  placeGeolocation: null as unknown as React.RefObject<placeGeolocationType>,
  isDataReady: false,
};

export const PlaceDetailContext = React.createContext(contextDefaultValue);

export const PlaceDetailContextProvider = (props: any) => {
  const [isDataReady, updateIsDataReady] = useState(false);

  const placeId = useRef<string>('');
  const placeData = useRef({} as placeDataType);
  const placeGeolocation = useRef({} as placeGeolocationType);

  const updateReadyStatus = (newStatus: boolean) => {
    if (isDataReady === newStatus) return;
    updateIsDataReady(newStatus);
  };

  (async () => {
    if (placeId !== props.placeId) {
      const newPlaceData = await PlaceDataUtils.getPlaceData(props.placeId);
      const newPlaceGeolocation =
        await PlaceGeolocationUtils.getPlaceGeolocationData(props.placeId);

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
