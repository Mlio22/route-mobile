import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {GOOGLE_API_TOKEN} from '@env';

import {previewImageProps} from '../../../types/components/atoms/details/PreviewImage';

const styles = StyleSheet.create({
  locationPreviewImage: {
    height: '40%',
  },
  locationImage: {
    width: '100%',
    height: '100%',
  },
});

export const PreviewImage = (props: previewImageProps) => {
  const {reference} = props;

  const URL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${reference}&key=${GOOGLE_API_TOKEN}`;

  return (
    <View style={styles.locationPreviewImage}>
      <Image style={styles.locationImage} source={{uri: URL}} />
    </View>
  );
};
