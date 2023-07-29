import {GOOGLE_API_TOKEN} from '@env';
import {
  BoundsCoordinatesType,
  CoordinatesArrayType,
  placeDataType,
} from '../types/components/context/LocationDetails/PlaceDetailsContext';

export class PlaceDataUtils {
  static extractPlaceData(jsonResponse: any): placeDataType {
    const {photos, formatted_address, name, types} = jsonResponse;

    let previewImageReference;

    if (photos) {
      previewImageReference = photos[0]?.photo_reference;
    } else {
      previewImageReference = '';
    }

    const result: placeDataType = {
      previewImageReference: previewImageReference,
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

  static async getPlaceData(placeId: string): Promise<placeDataType> {
    const API_URL = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GOOGLE_API_TOKEN}`;
    console.log(API_URL);

    const response = await fetch(API_URL),
      responseJSON = await response.json(),
      placeDataJson = responseJSON.result;

    return this.extractPlaceData(placeDataJson);
  }
}

export class PlaceGeolocationUtils {
  static extractPlaceGeolocationData(jsonResponse: any) {
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

  static async getPlaceGeolocationData(placeId: string) {
    const API_URL = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${GOOGLE_API_TOKEN}`;
    console.log(API_URL);

    const response = await fetch(API_URL),
      responseJson = await response.json(),
      geolocationData = this.extractPlaceGeolocationData(responseJson);

    return geolocationData;
  }
}
