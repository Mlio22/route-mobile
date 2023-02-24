import React from 'react';
import {BasicMap} from '../molecules/BasicMap';
import MapboxGL from '@rnmapbox/maps';

// @ts-ignore
import {PlaceRouteContext} from '../context/locationDetails/PlaceRouteContext';
import {PreviewModeContext} from '../context/locationDetails/PreviewModeContext';
import {PlaceDetailContext} from '../context/locationDetails/PlaceDetailsContext';

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

type PolylineRouteType = {
  congestionIndex: number;
  coordinates: number[][];
};

const polylineColor = ['#cc3300', '#ffcc00', '#14530d'];

// const convertMultipolylineString = (polylineStrings: PolylineRouteType[]) => {
//   let multipolylineCoordinates: ThreeMultipolylineType = [[], [], []];

//   polylineStrings.forEach(polyline => {
//     const {congestionIndex, coordinates} = polyline;

//     multipolylineCoordinates[congestionIndex].push(coordinates);
//   });
//   console.log(multipolylineCoordinates);
// };

export class RouteMap extends BasicMap {
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

const RouteLineLayers = (polylineRoute: PolylineRouteType[]) => {
  const children = polylineRoute.map((polyline, index) => {
    const {congestionIndex, coordinates} = polyline;

    // ide: ambil satu titik koordinat setelah akhir dari garis
    let appendCoordinate = coordinates;

    if (index !== polylineRoute.length - 1) {
      const {coordinates: otherCoordinates} = polylineRoute[index + 1];

      appendCoordinate.push(otherCoordinates[1]);
    }

    // @ts-ignore
    const shape: Geometry = {
      type: 'LineString',
      coordinates: appendCoordinate,
    };

    return (
      <MapboxGL.ShapeSource id={`line${index}`} shape={shape}>
        <MapboxGL.LineLayer
          id={`linelayer${index}`}
          // todo: perbaiki styling
          style={{
            lineColor: polylineColor[congestionIndex],
            lineWidth: 5,
            lineJoin: 'round',
          }}
        />
      </MapboxGL.ShapeSource>
    );
  });

  return children;
};

type RouteMapChildrenProps = {
  routeMapRef: RouteMap;
};

const PlaceChildren = (props: RouteMapChildrenProps) => {
  const {isDataReady, placeGeolocation} = React.useContext(PlaceDetailContext);
  const {routeMapRef} = props;

  if (isDataReady) {
    const {coordinates, bounds} = placeGeolocation?.current!;
    routeMapRef.centerMapToTarget({
      coordinates,
      bounds,
      addPadding: true,
    });
  }

  return <></>;
};

const RouteChildren = (props: RouteMapChildrenProps) => {
  let {isDataReady, routeLineList} = React.useContext(PlaceRouteContext)!;
  let children;

  if (isDataReady && routeLineList?.current) {
    children = RouteLineLayers(routeLineList.current);
    props.routeMapRef.boundUserAndTarget();
  }

  return <>{children}</>;
};

const RouteMapChildren = (props: RouteMapChildrenProps) => {
  const {previewMode} = React.useContext(PreviewModeContext);

  if (previewMode === 'place') {
    return <PlaceChildren {...props} />;
  } else {
    return <RouteChildren {...props} />;
  }
};
