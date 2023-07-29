import React from 'react';
import {BasicMap} from '../Map/BasicMap';

import {coordinatesObjToArr} from '../../utils/Coordinates';
import {RouteMapChildren} from '../molecules/locationMap/LocationMapChildren';
import {centerTargetProps} from '../../types/components/organisms/LocationMap';

function searchAngleDegree(coord1: number[], coord2: number[]) {
  const [X1, Y1] = coord1;
  const [X2, Y2] = coord2;

  var angleDeg = (Math.atan2(Y2 - Y1, X2 - X1) * 180) / Math.PI;
  return angleDeg;
}

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
    setTimeout(() => {
      this.camera.current?.zoomTo(15);
      this.camera.current?.moveTo([lng, lat]);
    }, 500);
  }

  async boundUserAndTarget() {
    // todo: perbaiki bound user dan target
    const {isEnabled, userCoordinates, activateUserLocation} = this.context;
    console.log('bounding');

    if (isEnabled.current) {
      const currentUserCoordinates = coordinatesObjToArr(
        userCoordinates.current!,
      );

      const [ne, sw] = searchBounds(
        currentUserCoordinates,
        this.currentTargetCoordinates,
      );

      const angle = searchAngleDegree(
        currentUserCoordinates,
        this.currentTargetCoordinates,
      );

      console.log(angle);

      this.camera.current?.fitBounds(ne, sw, [200, 100, 100, 100]);
      // this.camera.current?.fitBounds(ne, sw);
      this.camera.current?.setCamera({heading: angle + 90});
    } else {
      await activateUserLocation();
      this.boundUserAndTarget();
    }
  }

  render() {
    const children = <RouteMapChildren routeMapRef={this} />;

    console.log('render');

    return this.renderMap(children);
  }
}
