import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import MapboxGL, {MapViewProps} from '@rnmapbox/maps';
import {CameraProps} from '@rnmapbox/maps/javascript/components/Camera';

import {UserMarker} from '../molecules/UserMarker';
import {UserLocationContext} from '../context/UserLocationContext';

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  userPositionContainer: {
    backgroundColor: '#2EC08C8f',
    borderRadius: 25,
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 10,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  trackUserImage: {
    width: 20,
    height: 20,
  },
  mapSettingsContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    padding: 10,
    backgroundColor: '#2EC08C8f',
    borderRadius: 50,
  },

  mapSettings: {},
});

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

export class Map extends React.Component {
  static contextType = UserLocationContext;

  //@ts-ignore
  context!: React.ContextType<typeof UserLocationContext>;

  camera: React.RefObject<MapboxGL.Camera>;
  userMarker: React.RefObject<UserMarker>;
  userLocationEnabled: boolean;

  state: {
    centerCoordinates: number[];
  };

  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      centerCoordinates: [107.604954, -6.934469],
    };

    this.camera = React.createRef<MapboxGL.Camera>();
    this.userMarker = React.createRef();

    this.userLocationEnabled = false;
  }

  async centerMapToUser(): Promise<void> {
    const userLocationGranted = await grantUserLocation();

    if (userLocationGranted) {
      Geolocation.getCurrentPosition(
        ({coords: {latitude, longitude}}) => {
          this.userMarker.current?.moveTo([longitude, latitude]);
          this.camera.current?.flyTo([longitude, latitude], 1000);

          this.context.updateInfo({
            isShown: true,
            coordinates: {latitude, longitude},
          });
        },
        async error => {
          if (error.message === 'No location provider available.') {
            ToastAndroid.show('GPS unavailable, please turn on GPS', 1000);
            await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
              interval: 10000,
              fastInterval: 5000,
            });

            this.centerMapToUser();
          }
        },
      );
    }
  }

  render(): React.ReactNode {
    const mapviewProps: MapViewProps = {
        projection: 'globe',
        style: styles.map,
        attributionEnabled: false,
        logoEnabled: false,
      },
      cameraProps: CameraProps = {
        zoomLevel: 15,
        animationMode: 'none',
        centerCoordinate: this.state.centerCoordinates,
      };

    return (
      <>
        <MapboxGL.MapView {...mapviewProps}>
          <MapboxGL.Camera ref={this.camera} {...cameraProps} />
          <UserMarker
            ref={this.userMarker}
            coordinates={this.state.centerCoordinates}
          />
        </MapboxGL.MapView>
        <TouchableOpacity
          style={styles.userPositionContainer}
          onPress={() => this.centerMapToUser()}>
          <Image
            style={styles.trackUserImage}
            source={require('../../images/userTrack.png')}
          />
        </TouchableOpacity>

        <View style={styles.mapSettingsContainer}>
          <Image
            style={styles.mapSettings}
            source={require('../../images/options1.png')}
          />
        </View>
      </>
    );
  }
}
