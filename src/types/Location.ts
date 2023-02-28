import React from 'react';

export type placeDataType =
  | {
      previewImageReference: string;
      placeTitle: {
        placeName: string;
        placeType: string;
      };
      locationDetails: {
        address: string;
      };
    }
  | {};

export type placeGeolocationType =
  | {
      coordinates: number[];
      bounds: {
        ne: number[];
        sw: number[];
      };
    }
  | {};

export type placeDetailContextDefault = {
  isDataReady: boolean;
  placeData: React.RefObject<placeDataType>;
  placeGeolocation: React.RefObject<placeGeolocationType>;
};
