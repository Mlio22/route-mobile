export class PlaceUtils {
  static extractPlaceData(jsonResponse: any): placeDataType {
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

  async getPlaceData(placeId: string): Promise<placeDataType> {
    const API_URL = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GOOGLE_PLACES_API_KEY}`;

    const response = await fetch(API_URL),
      responseJSON = await response.json(),
      placeDataJson = responseJSON.result;

    return PlaceUtils.extractPlaceData(placeDataJson);
  }
}
