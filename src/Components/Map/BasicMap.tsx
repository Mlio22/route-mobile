import React from 'react';
import {StyleSheet} from 'react-native';

import MapboxGL, {MapViewProps} from '@rnmapbox/maps';
import {CameraProps} from '@rnmapbox/maps/javascript/components/Camera';

import {UserMarker} from '../molecules/UserMarker';
import {ChildrenProp, CoordinatesObjectType} from '../../types/Home';
import {ThemeContext} from '../context/UserSettings/ThemeContext';
import {UserLocationContext} from '../context/UserLocationContext';
import {centerTargetProps} from '../../types/components/organisms/LocationMap';
import TrafficView from './Traffic';

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

export class BasicMap extends React.Component<any> {
  camera: React.RefObject<MapboxGL.Camera>;
  trafficView: React.RefObject<TrafficView>;
  // @ts-ignore
  context: React.ContextType<typeof UserLocationContext>;

  currentTargetCoordinates: number[];

  constructor(props: ChildrenProp) {
    super(props);

    this.camera = React.createRef<MapboxGL.Camera>();
    this.trafficView = React.createRef<TrafficView>();

    this.currentTargetCoordinates = [107.566389, -6.981029];
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

  centerMapToTarget(params: centerTargetProps) {
    const {coordinates, bounds, addPadding} = params;
    this.currentTargetCoordinates = coordinates;

    let [lng, lat] = coordinates;
    if (addPadding) {
      lat -= 0.002;
    }

    this.camera.current?.moveTo([lng, lat]);
    if (bounds) {
      // const {ne, sw} = bounds;
      // this.camera.current?.fitBounds(sw, ne);
    }
  }

  __onMapRegionChange(e: any) {
    const centerCoordinates = e.geometry.coordinates;
    const zoomLevel = Math.floor(e.properties.zoomLevel);

    this.trafficView.current?.regionChange(centerCoordinates, zoomLevel);
  }

  toggleTrafficView() {
    this.trafficView.current?.toggleTraffic();
  }

  renderMap(anotherChildren?: any) {
    const mapviewProps: MapViewProps = {
        projection: 'globe',
        style: styles.map,
        attributionEnabled: false,
        logoEnabled: false,
        onRegionIsChanging: e => this.__onMapRegionChange(e),
      },
      cameraProps: CameraProps = {
        zoomLevel: 15,
        animationMode: 'none',
        centerCoordinate: this.currentTargetCoordinates,
      };

    if (this.props.theme === 'dark') {
      mapviewProps.styleURL = `mapbox://styles/mapbox/dark-v10`;
    }

    return (
      <>
        <MapboxGL.MapView {...mapviewProps}>
          <MapboxGL.Camera ref={this.camera} {...cameraProps} />
          <UserMarker />
          <TrafficView
            ref={this.trafficView}
            initialCoordinates={this.currentTargetCoordinates}
          />
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
