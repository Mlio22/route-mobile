import React from 'react';
import MapboxGL from '@rnmapbox/maps';

import {RouteMapChildrenProps} from '../../organisms/LocationMap';
import {PlaceRouteContext} from '../../context/locationDetails/PlaceRouteContext';
import {TrafficColor} from '../../data/constants';

type PolylineRouteType = {
  congestionIndex: number;
  coordinates: number[][];
};

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
    lineJoin: 'round',
  };
};

const RouteLineLayers = (polylineRoute: PolylineRouteType[]) => {
  const layers = polylineRoute.map((polyline, index) => {
    let {congestionIndex, coordinates} = polyline;

    // ide: ambil satu titik koordinat setelah akhir dari garis
    if (index !== polylineRoute.length - 1) {
      const {coordinates: otherCoordinates} = polylineRoute[index + 1];

      coordinates.push(otherCoordinates[1]);
    }

    // @ts-ignore
    const shape: Geometry = {
      type: 'LineString',
      coordinates: coordinates,
    };

    return (
      <MapboxGL.ShapeSource id={`line${index}`} shape={shape}>
        <MapboxGL.LineLayer
          id={`linelayer${index}`}
          style={lineLayerStyle(congestionIndex)}
        />
      </MapboxGL.ShapeSource>
    );
  });

  return layers;
};

export const RouteChildren = (props: RouteMapChildrenProps) => {
  let {isDataReady, routeLineList} = React.useContext(PlaceRouteContext)!;
  let routelayers;

  if (isDataReady && routeLineList?.current) {
    routelayers = RouteLineLayers(routeLineList.current);
    props.routeMapRef.boundUserAndTarget();
  }

  return <>{routelayers}</>;
};
