import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

const styles = StyleSheet.create({
  locationPreviewImage: {
    height: '40%',
  },
  locationImage: {
    width: '100%',
    height: '100%',
  },
});

type previewImageProps = {
  reference: string;
};

const GOOGLE_PLACES_API_KEY = 'AIzaSyCjpcDm8TzqStHV2YMsPzIlnHUy8W5zDFo';

export const PreviewImage = (props: previewImageProps) => {
  const {reference} = props;

  const URL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${reference}&key=${GOOGLE_PLACES_API_KEY}`;
  console.log(URL);

  return (
    <View style={styles.locationPreviewImage}>
      <Image style={styles.locationImage} source={{uri: URL}} />
    </View>
  );
};
