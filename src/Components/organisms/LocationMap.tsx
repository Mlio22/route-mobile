import React from 'react';
import {BasicMap} from '../molecules/BasicMap';

// @ts-ignore
import {PreviewModeContext} from '../context/locationDetails/PreviewModeContext';
import {PlaceChildren} from '../atoms/locationMap/PlaceChildren';
import {RouteChildren} from '../atoms/locationMap/RouteChildren';

type centerTargetProps = {
  coordinates: number[];
  bounds?: {
    ne: number[];
    sw: number[];
  };
  addPadding?: boolean;
};

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
    const userCoordinates =
      (await this.userMarker.current?.getUserCoordinates()) as number[];

    const [ne, sw] = searchBounds(
      userCoordinates,
      this.currentTargetCoordinates,
    );

    this.camera.current?.fitBounds(ne, sw, [300, 200, 200, 100]);
  }

  render() {
    const children = <RouteMapChildren routeMapRef={this} />;

    return this.renderMap(children);
  }
}

export type RouteMapChildrenProps = {
  routeMapRef: LocationMap;
};

const RouteMapChildren = (props: RouteMapChildrenProps) => {
  const {previewMode} = React.useContext(PreviewModeContext);

  if (previewMode === 'place') {
    return <PlaceChildren {...props} />;
  } else {
    return <RouteChildren {...props} />;
  }
};
