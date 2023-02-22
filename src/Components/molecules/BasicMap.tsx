import React from 'react';
import {StyleSheet} from 'react-native';

import MapboxGL, {MapViewProps} from '@rnmapbox/maps';
import {CameraProps} from '@rnmapbox/maps/javascript/components/Camera';

import {UserMarker} from '../molecules/UserMarker';

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

type basicMapProps = {
  centerCoordinates?: number[];
  children?: React.ReactNode;
};

export class BasicMap extends React.Component<basicMapProps> {
  camera: React.RefObject<MapboxGL.Camera>;
  userMarker: React.RefObject<UserMarker>;

  currentTargetCoordinates: number[];

  constructor(props: basicMapProps) {
    super(props);

    this.camera = React.createRef<MapboxGL.Camera>();
    this.userMarker = React.createRef<UserMarker>();

    this.currentTargetCoordinates = props.centerCoordinates || [
      107.604954, -6.934469,
    ];
  }

  async centerMapToUser(): Promise<void> {
    const userCoordinates = await this.userMarker.current?.getUserCoordinates();

    if (userCoordinates) {
      this.camera.current?.flyTo(userCoordinates);
    }
  }

  renderMap(anotherChildren?: any) {
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

    return (
      <>
        <MapboxGL.MapView {...mapviewProps}>
          <MapboxGL.Camera ref={this.camera} {...cameraProps} />
          <UserMarker ref={this.userMarker} />
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
