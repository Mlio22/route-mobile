import React from 'react';
import MapboxGL from '@rnmapbox/maps';

import {TargetMarkerIcon} from '../atoms/TargetMarkerIcon';

type targetMarkerProps = {
  coordinates?: number[];
};

export class TargetMarker extends React.Component<targetMarkerProps> {
  state: {
    currentCoordinates?: number[];
  };

  constructor(props: targetMarkerProps) {
    super(props);

    this.state = {
      currentCoordinates: undefined,
    };
  }

  moveTo(newCoordinates: number[]) {
    this.setState({
      currentCoordinates: newCoordinates,
    });
  }

  render() {
    const {currentCoordinates} = this.state;
    return (
      <>
        {currentCoordinates && (
          <MapboxGL.MarkerView coordinate={this.state.currentCoordinates}>
            <TargetMarkerIcon />
          </MapboxGL.MarkerView>
        )}
      </>
    );
  }
}
