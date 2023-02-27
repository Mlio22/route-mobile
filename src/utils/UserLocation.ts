import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {PermissionsAndroid, ToastAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {CoordinatesObjectType} from '../types/Home';

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

async function requestUserLocation(): Promise<boolean> {
  return new Promise(async resolve => {
    const isEnabled =
      await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      });

    resolve(isEnabled === 'enabled');
  });
}

let userCoordinates: CoordinatesObjectType = {
  latitude: null,
  longitude: null,
};

export const getUserCoordinates = () => {
  return userCoordinates;
};

const updateUserCoordinates = (newCoords: CoordinatesObjectType) => {
  let {latitude, longitude} = newCoords;

  longitude = 107.632827;
  latitude = -6.980611;

  userCoordinates = {latitude, longitude};
};

export async function enableUserLocation(): Promise<boolean> {
  const userLocationGranted = await grantUserLocation();

  return new Promise(resolve => {
    const successCallback = (coords: any): void => {
      updateUserCoordinates(coords);
      resolve(true);
    };

    const errorCallback = async (error: any) => {
      if (error.message === 'No location provider available.') {
        ToastAndroid.show('GPS unavailable, please turn on GPS', 1000);

        const isLocationEnabled = await requestUserLocation();
        if (isLocationEnabled) {
          resolve(enableUserLocation());
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
  });
}

export const checkUserLocationFirst = async (): Promise<boolean> => {
  const userLocationGranted = await grantUserLocation();

  return new Promise(resolve => {
    const success = (coords: any) => {
      updateUserCoordinates(coords);
      resolve(true);
    };

    const fail = () => {
      resolve(false);
    };

    if (userLocationGranted) {
      Geolocation.getCurrentPosition(success, fail);
    } else {
      resolve(false);
    }
  });
};
