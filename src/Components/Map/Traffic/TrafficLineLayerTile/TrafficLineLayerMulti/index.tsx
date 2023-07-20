import React from 'react';
import MapboxGL from '@rnmapbox/maps';
// @ts-ignore
import mapboxPolyline from '@mapbox/polyline';
import {TrafficColor} from '../../../../data/constants';

function get_padding(angle: number, padding = 0.0) {
  const paddingX = padding * Math.cos(angle),
    paddingY = padding * Math.sin(angle);

  return [paddingX, paddingY];
}

function geometryToCoordinates(
  geometry: string,
  angle: number,
  heading: string,
) {
  const invertedCoordinates: string[] = mapboxPolyline.decode(geometry, 6);

  let [paddingX, paddingY] = [0, 0];
  if (heading === 'alternate') {
    // console.log('alternate');
  }

  if (heading !== 'single') {
    [paddingX, paddingY] = get_padding(angle);
  }

  const coordinates = invertedCoordinates.map(coordinate => {
    return [coordinate[1] + paddingY, coordinate[0] + paddingX];
  });

  return coordinates;
}

function createLineLayerStyle(type: string) {
  let color;

  if (type === 'light') color = 'darkgreen';
  if (type === 'moderate') color = 'orange';
  if (type === 'heavy') color = 'red';

  return {
    lineColor: color,
    lineWidth: 4,
    lineCap: MapboxGL.LineJoin.Round,
    lineOpacity: 1.84,
  };
}

type multiProps = {
  geometries: string[];
  type: string;
  id: number;
};

const TrafficLineLayerMulti = ({geometries, type, id}: multiProps) => {
  // multi: contains geometry data of single line layers

  const coordinates = geometries.map(([geometryList, angle, heading]) => {
    return geometryToCoordinates(geometryList, angle, heading);
  });

  const element = (
    <MapboxGL.ShapeSource
      id={`line${type}${id}`}
      shape={{
        type: 'MultiLineString',
        coordinates,
      }}>
      <MapboxGL.LineLayer
        id={`linelayer${type}${id}`}
        style={createLineLayerStyle(type)}
      />
    </MapboxGL.ShapeSource>
  );

  return element;
};

export default TrafficLineLayerMulti;
