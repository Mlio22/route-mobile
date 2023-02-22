import React from 'react';
import {BasicMap} from '../molecules/BasicMap';
import MapboxGL from '@rnmapbox/maps';

// @ts-ignore
import mapboxPolyline from '@mapbox/polyline';
import {polylineData} from '../atoms/route/RouteSteps';

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

function fixCoordinates(polylineString: string): number[][] {
  const coordinatesList = mapboxPolyline.decode(polylineString);

  return coordinatesList.map((coordinate: number[]) => {
    const [lat, lng] = coordinate;
    return [lng, lat];
  });
}

const processPolylineStrings = (polylineDataList: polylineData[]) => {
  let polylineRoute: PolylineRouteType[] = [];

  polylineDataList.forEach(polylineData => {
    const {polylineString, congestionIndex} = polylineData;
    const coordinates = fixCoordinates(polylineString);

    polylineRoute.push({
      coordinates,
      congestionIndex,
    });
  });

  return polylineRoute;
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
  state: {
    polylineDataList: polylineData[];
  };

  constructor(props: any) {
    super(props);

    this.state = {
      polylineDataList: [],
    };
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

  appendPolylines(polylineDataList: polylineData[]) {
    this.setState({
      polylineDataList,
    });
  }

  render(): React.ReactNode {
    const {polylineDataList} = this.state;

    let children;

    if (polylineDataList.length > 0) {
      const polylineRoute = processPolylineStrings(polylineDataList);

      children = polylineRoute.map((polyline, index) => {
        const {congestionIndex, coordinates} = polyline;

        // ide: ambil satu titik koordinat setelah akhir dari garis
        let appendCoordinate = coordinates;

        if (index !== polylineRoute.length - 1) {
          const {coordinates: otherCoordinates} = polylineRoute[index + 1];

          appendCoordinate.push(otherCoordinates[1]);
        }

        const shape = {
          type: 'LineString',
          coordinates: appendCoordinate,
        };

        return (
          // @ts-ignore
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
    }

    return this.renderMap(children);
  }
}
