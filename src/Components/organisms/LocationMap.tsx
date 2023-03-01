import React from 'react';
import {BasicMap} from '../molecules/BasicMap';

import {coordinatesObjToArr} from '../../utils/Coordinates';
import {RouteMapChildren} from '../molecules/locationMap/LocationMapChildren';
import {centerTargetProps} from '../../types/components/organisms/LocationMap';

function searchBounds(coord1: number[], coord2: number[]) {
  const [X1, Y1] = coord1;
  const [X2, Y2] = coord2;

  const [west, east] = [X1, X2].sort();
  const [north, south] = [Y1, Y2].sort();

  return [
    [east, north],
    [west, south],
  ];
}

export class LocationMap extends BasicMap {
  constructor(props: any) {
    super(props);
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

  async boundUserAndTarget() {
    // todo: perbaiki bound user dan target
    const {isEnabled, userCoordinates, activateUserLocation} = this.context;

    if (isEnabled.current) {
      const coordinates = coordinatesObjToArr(userCoordinates.current!);

      const [ne, sw] = searchBounds(coordinates, this.currentTargetCoordinates);

      this.camera.current?.fitBounds(ne, sw, [300, 200, 200, 100]);
    } else {
      await activateUserLocation();
      this.boundUserAndTarget();
    }
  }

  render() {
    const children = <RouteMapChildren routeMapRef={this} />;

    return this.renderMap(children);
  }
}
