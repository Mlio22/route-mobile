import React from 'react';

import MapboxGL from '@rnmapbox/maps';
import {TrafficColor} from '../../data/constants';
import {PolylineRouteType} from '../../../types/components/context/LocationDetails/PlaceRouteContext';

// todo buat dari kumpulan polyline menjadi 3 multipolyline
// const convertMultipolylineString = (polylineStrings: PolylineRouteType[]) => {
//   let multipolylineCoordinates: ThreeMultipolylineType = [[], [], []];

//   polylineStrings.forEach(polyline => {
//     const {congestionIndex, coordinates} = polyline;

//     multipolylineCoordinates[congestionIndex].push(coordinates);
//   });
//   console.log(multipolylineCoordinates);
// };

const lineLayerStyle = (index: number) => {
  // todo: perbaiki styling, dengan titik sambung
  return {
    lineColor: TrafficColor[index],
    lineWidth: 5,
    lineCap: MapboxGL.LineJoin.Round,
    lineOpacity: 1.84,
  };
};

// todo group lines

const createMultilineShape = (lines: Array<number[][]>) => {
  return {
    type: 'MultiLineString',
    coordinates: lines,
  } as any;
};

const groupLines = (polylineRoute: PolylineRouteType[]) => {
  const greenLines: Array<number[][]> = [],
    yellowLines: Array<number[][]> = [],
    redLines: Array<number[][]> = [];

  polylineRoute.forEach(polyline => {
    const {congestionIndex, coordinates} = polyline;

    if (congestionIndex === 1) {
      greenLines.push(coordinates);
    }

    if (congestionIndex === 2) {
      yellowLines.push(coordinates);
    }

    if (congestionIndex === 3) {
      redLines.push(coordinates);
    }
  });

  return [greenLines, yellowLines, redLines];
};

export const RouteLineLayers = (polylineRoute: PolylineRouteType[]) => {
  const lines = groupLines(polylineRoute);

  const layers = lines.map((line, congestionIndex) => {
    const shape = createMultilineShape(line);

    return (
      <MapboxGL.ShapeSource
        key={`${congestionIndex}`}
        id={`line${congestionIndex}`}
        shape={shape}>
        <MapboxGL.LineLayer
          id={`linelayer${congestionIndex}`}
          style={lineLayerStyle(congestionIndex)}
        />
      </MapboxGL.ShapeSource>
    );
  });

  return <>{layers}</>;
};
