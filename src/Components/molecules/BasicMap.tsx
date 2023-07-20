import React from 'react';
import {StyleSheet} from 'react-native';

import MapboxGL, {MapViewProps} from '@rnmapbox/maps';
import {CameraProps} from '@rnmapbox/maps/javascript/components/Camera';

import {UserMarker} from '../molecules/UserMarker';
import {ChildrenProp, CoordinatesObjectType} from '../../types/Home';
import {ThemeContext} from '../context/UserSettings/ThemeContext';
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

export class BasicMap extends React.Component<ChildrenProp> {
  camera: React.RefObject<MapboxGL.Camera>;
  // @ts-ignore
  context: React.ContextType<typeof UserLocationContext>;

  currentTargetCoordinates: number[];

  constructor(props: ChildrenProp) {
    super(props);

    this.camera = React.createRef<MapboxGL.Camera>();

    this.currentTargetCoordinates = [107.604954, -6.934469];
  }

  async centerMapToUser(): Promise<void> {
    const {isEnabled, userCoordinates, activateUserLocation} = this.context;

    if (isEnabled.current) {
      const {longitude, latitude} =
        userCoordinates.current! as CoordinatesObjectType;

      this.camera.current?.flyTo([longitude!, latitude!]);
    } else {
      activateUserLocation();
    }
  }

  renderMap(anotherChildren?: any) {
    MapboxGL.setAccessToken(
      'pk.eyJ1IjoiYW5ha2JhaWstZXhlIiwiYSI6ImNsYnl4YnZkaTAzaDYzd3A3MWhrb2lqeWIifQ.JLrFLc_GxkTdET36LKjJvw',
    );
    const mapviewProps: MapViewProps = {
        projection: 'globe',
        style: styles.map,
        attributionEnabled: false,
        logoEnabled: false,
      },
      cameraProps: CameraProps = {
        zoomLevel: 15,
        animationMode: 'none',
        centerCoordinate: this.currentTargetCoordinates,
      };

    console.log(this.props.theme);

    if (this.props.theme === 'dark') {
      mapviewProps.styleURL = `mapbox://styles/mapbox/dark-v10`;
    }

    return (
      <>
        <MapboxGL.MapView {...mapviewProps}>
          <MapboxGL.Camera ref={this.camera} {...cameraProps} />
          <UserMarker />
          {this.props.children}
          {anotherChildren}
        </MapboxGL.MapView>
      </>
    );
  }

  render(): React.ReactNode {
    return this.renderMap();
  }
}

BasicMap.contextType = UserLocationContext;
