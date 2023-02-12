import React from 'react';

import MapboxGL from '@rnmapbox/maps';
import {Marker} from '../atoms/Marker';

export interface UserMarkerProps {
  readonly coordinates: number[];
}

export class UserMarker extends React.Component<UserMarkerProps> {
  state: {
    coordinates?: number[];
    markerShown: boolean;
    compassHeading: number;
  };

  constructor(props: UserMarkerProps) {
    super(props);
    this.state = {
      coordinates: undefined,
      markerShown: false,
      compassHeading: 0,
    };
  }

  moveTo(targetCoordinates: number[]) {
    this.setState({coordinates: targetCoordinates, markerShown: true});
  }

  render() {
    return (
      <>
        {this.state.markerShown && (
          <MapboxGL.MarkerView coordinate={this.state.coordinates}>
            <Marker />
          </MapboxGL.MarkerView>
        )}
      </>
    );
  }
}
