import React from 'react';
import {PermissionsAndroid, ToastAndroid} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import {UserMarkerIcon} from '../atoms/UserMarkerIcon';
import {
  LocationInfoType,
  UserLocationContext,
  userLocationDefaultValue,
} from '../context/UserLocationContext';
import {TargetMarkerIcon} from '../atoms/TargetMarkerIcon';

type targetMarkerProps = {
  coordinates: number[];
};

export const TargetMarker = (props: targetMarkerProps) => {
  const {coordinates} = props;

  return (
    <MapboxGL.MarkerView coordinate={coordinates}>
      <TargetMarkerIcon />
    </MapboxGL.MarkerView>
  );
};
