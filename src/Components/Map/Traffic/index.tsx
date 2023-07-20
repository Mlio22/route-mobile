import React from 'react';
import MERCATOR from '../../../utils/Mercator';
import {coordinatesArrToObj} from '../../../utils/Coordinates';
import TrafficLineLayerTile from './TrafficLineLayerTile';

interface TrafficViewProps {
  initialCoordinates: number[];
}

interface TrafficViewState {
  viewTraffic: boolean;
}

class TrafficView extends React.Component<TrafficViewProps, TrafficViewState> {
  tileLineLayer: React.RefObject<TrafficLineLayerTile>;

  // approaches:
  // 0. get settings
  // 1. get bounds
  // 2. request to server (/traffic)
  // 3. generate linelayers

  // 0. get settings

  currentTargetCoordinates: number[];
  currentZoomLevel: number;

  currentCenterTile: {
    x: number;
    y: number;
    z: number;
  };

  tileRefs: React.RefObject<TrafficLineLayerTile>[] = [];
  tileComponents: any[] = [];

  constructor(props: any) {
    super(props);

    this.tileLineLayer = React.createRef<TrafficLineLayerTile>();
    this.state = {
      viewTraffic: false,
    };

    // contains current information about map and tiles
    this.currentZoomLevel = 15;
    this.currentTargetCoordinates = props.initialCoordinates;
    this.currentCenterTile = this.__getTile(
      this.currentTargetCoordinates,
      this.currentZoomLevel,
    );
  }

  toggleTraffic() {
    const prev = this.state.viewTraffic;
    this.setState({viewTraffic: !prev});

    setTimeout(() => {
      if (this.state.viewTraffic) {
        this.__initLayerTiles();
      }
    }, 100);
  }

  __getTile(coordinatesArr: number[], zoomLevel: number) {
    const coordinatesObj = coordinatesArrToObj(coordinatesArr);
    const tile = MERCATOR.getTileAtLatLng(coordinatesObj, zoomLevel);

    return tile;
  }

  __checkTileChange(newTile: any): boolean {
    if (this.currentCenterTile.x !== newTile.x) return true;
    if (this.currentCenterTile.y !== newTile.y) return true;

    return false;
  }

  __initLayerTiles() {
    console.log('initing tiles');

    // create refs of tiles
    const {x, y, z} = this.currentCenterTile;

    let refIdx = 0;

    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        const newRef = React.createRef<TrafficLineLayerTile>();

        this.tileRefs[refIdx] = newRef;
        this.tileComponents[refIdx] = (
          <TrafficLineLayerTile
            id={refIdx}
            key={refIdx}
            ref={newRef}
            x={i}
            y={j}
            z={z}
          />
        );

        refIdx++;
      }
    }
  }

  __setLayerTiles() {
    const {x, y, z} = this.currentCenterTile;

    let refIdx = 0;

    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        this.tileRefs[refIdx++].current?.setTile(i, j, z);
      }
    }
  }

  regionChange(centerCoordinates: number[], zoomLevel: number) {
    if (!this.state.viewTraffic) return;
    const newTile = this.__getTile(centerCoordinates, zoomLevel);
    if (this.__checkTileChange(newTile)) {
      this.currentTargetCoordinates = centerCoordinates;
      this.currentZoomLevel = zoomLevel;

      this.currentCenterTile = newTile;

      this.__setLayerTiles();
    }
  }

  render() {
    console.log(this.state.viewTraffic);

    return (
      <>
        {this.state.viewTraffic && this.tileComponents.map((tile, _) => tile)}
      </>
    );
  }

  // 1. get bounds
}

export default TrafficView;
