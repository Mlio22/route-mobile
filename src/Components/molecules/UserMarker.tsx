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

async function grantUserLocation(): Promise<boolean> {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]);

    if (granted['android.permission.ACCESS_FINE_LOCATION'] === 'granted') {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
  }

  return false;
}

async function requestUserLocation() {
  return new Promise(async resolve => {
    const isEnabled =
      await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      });

    resolve(isEnabled === 'enabled');
  }) as Promise<boolean>;
}

export class UserMarker extends React.Component {
  static contextType = UserLocationContext;

  //@ts-ignore
  context: React.ContextType<typeof UserLocationContext>;

  state: LocationInfoType;

  constructor(props: any) {
    super(props);

    this.state = userLocationDefaultValue;
  }

  async getUserCoordinates() {
    const userLocationGranted = await grantUserLocation();

    return new Promise(resolve => {
      const successCallback = ({coords: {latitude, longitude}}: any): void => {
        const newLocationInfo = {
          isEnabled: true,
          coordinates: {latitude, longitude},
        };

        this.context.updateInfo(newLocationInfo);
        this.setState(newLocationInfo);

        resolve([longitude, latitude]);
      };

      const errorCallback = async (error: any) => {
        if (error.message === 'No location provider available.') {
          ToastAndroid.show('GPS unavailable, please turn on GPS', 1000);

          const isLocationEnabled = await requestUserLocation();
          if (isLocationEnabled) {
            resolve(this.getUserCoordinates());
          } else {
            resolve(false);
          }
        }
      };

      if (userLocationGranted) {
        Geolocation.getCurrentPosition(successCallback, errorCallback);
      } else {
        resolve(false);
      }
    }) as Promise<number[] | false>;
  }

  render() {
    const {longitude, latitude} = this.state.coordinates!;

    return (
      <>
        {this.state.isEnabled && (
          <MapboxGL.MarkerView coordinate={[longitude, latitude]}>
            <UserMarkerIcon />
          </MapboxGL.MarkerView>
        )}
      </>
    );
  }
}
