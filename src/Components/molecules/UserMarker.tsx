import React from 'react';

import MapboxGL from '@rnmapbox/maps';
import {UserMarkerIcon} from '../atoms/UserMarkerIcon';

export interface UserMarkerProps {
  readonly coordinates: number[];
}

export class UserMarker extends React.Component<UserMarkerProps> {
  state: {
    coordinates?: number[];
    markerShown: boolean;
  };

  constructor(props: UserMarkerProps) {
    super(props);
    this.state = {
      coordinates: undefined,
      markerShown: false,
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
            <UserMarkerIcon />
          </MapboxGL.MarkerView>
        )}
      </>
    );
  }
}
