import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LocationDetailsProps} from '../../App';
import {BasicMap} from '../Components/molecules/BasicMap';
import {TargetMarker} from '../Components/molecules/TargetMarker';
import {LocationDetailsCard} from '../Components/organisms/LocationDetailsCard';

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: '100%',
  },
});

const GOOGLE_PLACES_API_KEY = 'AIzaSyCjpcDm8TzqStHV2YMsPzIlnHUy8W5zDFo';

async function getLocationCoordinates(placeId: string) {
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

const LocationDetails = (props: LocationDetailsProps) => {
  const basicMapRef = React.useRef() as React.RefObject<BasicMap>;
  const targetMarkerRef = React.useRef() as React.RefObject<TargetMarker>;

  const {place_id} = props.route.params;

  React.useEffect(() => {
    setTimeout(async () => {
      const {coordinates, bounds} = await getLocationCoordinates(place_id);

      basicMapRef.current?.centerMapToCoordinates({
        coordinates,
        bounds,
        addPadding: true,
      });

      targetMarkerRef.current?.moveTo(coordinates);
    }, 50);
  }, [basicMapRef, place_id, targetMarkerRef]);

  return (
    <>
      <View style={styles.mapContainer}>
        <BasicMap ref={basicMapRef}>
          <TargetMarker ref={targetMarkerRef} />
        </BasicMap>
      </View>
      <LocationDetailsCard place_id={place_id} />
    </>
  );
};

export default LocationDetails;
