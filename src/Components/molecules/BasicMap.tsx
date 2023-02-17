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

type centerMapToCoordinatesProps = {
  coordinates: number[];
  bounds?: {
    ne: number[];
    sw: number[];
  };
  addPadding?: boolean;
};

export class BasicMap extends React.Component<basicMapProps> {
  camera: React.RefObject<MapboxGL.Camera>;
  userMarker: React.RefObject<UserMarker>;

  constructor(props: basicMapProps) {
    super(props);

    this.camera = React.createRef<MapboxGL.Camera>();
    this.userMarker = React.createRef<UserMarker>();
  }

  async centerMapToUser(): Promise<void> {
    const userCoordinates = await this.userMarker.current?.getUserCoordinates();

    if (userCoordinates) {
      this.camera.current?.flyTo(userCoordinates);
    }
  }

  async centerMapToCoordinates(params: centerMapToCoordinatesProps) {
    const {coordinates, bounds, addPadding} = params;

    let [lng, lat] = coordinates;
    if (addPadding) {
      lat -= 0.002;
    }

    this.camera.current?.flyTo([lng, lat]);
    if (bounds) {
      // const {ne, sw} = bounds;
      // this.camera.current?.fitBounds(sw, ne);
    }
  }

  render(): React.ReactNode {
    let {children, centerCoordinates} = this.props as basicMapProps;

    if (!centerCoordinates) {
      centerCoordinates = [107.604791, -6.934023];
    }

    const mapviewProps: MapViewProps = {
        projection: 'globe',
        style: styles.map,
        attributionEnabled: false,
        logoEnabled: false,
      },
      cameraProps: CameraProps = {
        zoomLevel: 15,
        animationMode: 'none',
        centerCoordinate: centerCoordinates || [107.604954, -6.934469],
      };

    return (
      <>
        <MapboxGL.MapView {...mapviewProps}>
          <MapboxGL.Camera ref={this.camera} {...cameraProps} />
          <UserMarker ref={this.userMarker} />
          {children}
        </MapboxGL.MapView>
      </>
    );
  }
}
