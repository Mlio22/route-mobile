import React from 'react';
import TrafficLineLayerMulti from './TrafficLineLayerMulti';

// const TRAFFIC_URL = 'http://10.0.2.2:3000/traffic';
const TRAFFIC_URL = 'https://route.ii-api.net//traffic';

const loaded_list: any = {};

type props = {x: number; y: number; z: number; id: number};
type states = {x: number; y: number; z: number; isGeometryLoaded: boolean};

class TrafficLineLayerTile extends React.Component<props, states> {
  // tile: contains geometry data of 3 Multilines (light, moderate, heavy traffics)

  abortController: AbortController = new AbortController();
  currentLoadedGeometry: any = {};

  multiLight?: any;
  multiModerate?: any;
  multiHeavy?: any;

  constructor(props: any) {
    super(props);

    this.state = {
      x: props.x || 0,
      y: props.y || 0,
      z: props.z || 0,
      isGeometryLoaded: false,
    };

    setTimeout(() => {
      this.__loadGeometry();
    }, 500);
  }

  setTile(new_x: number, new_y: number, new_z: number) {
    try {
      this.setState({x: new_x, y: new_y, z: new_z});

      this.__loadGeometry();
    } catch (e) {}
  }

  __createRequest(url: string) {
    this.abortController = new AbortController();
    const {signal} = this.abortController;

    return fetch(url, {signal});
  }

  __abortPreviousRequest() {
    this.abortController.abort();
  }

  async __requestGeometry() {
    const {x, y, z} = this.state;
    const tileString = `${x}|${y}|${z}`;

    this.__abortPreviousRequest();
    console.log('requesting', tileString);

    // request to server
    const url = `${TRAFFIC_URL}?x=${x}&y=${y}&zoom=${z}`,
      request = this.__createRequest(url);

    try {
      const response = await request,
        responseJSON = await response.json();

      loaded_list[tileString] = responseJSON.geometries_response;

      console.log('downloaded: ', tileString);
    } catch (e) {
      console.log(e);
      console.log('aborted: ', tileString);
    }
  }

  async __loadGeometry() {
    this.setState({isGeometryLoaded: false});

    const {x, y, z} = this.state;
    const id = `${x}|${y}|${z}`;

    if (!loaded_list[id]) {
      await this.__requestGeometry();
    }

    this.currentLoadedGeometry = loaded_list[id];

    this.__insertGeometryToChild();

    this.setState({isGeometryLoaded: true});
  }

  __insertGeometryToChild() {
    const id = this.props.id;

    if (this.currentLoadedGeometry) {
      const {light, moderate, heavy} = this.currentLoadedGeometry;

      this.multiLight = (
        <TrafficLineLayerMulti id={id} geometries={light} type={'light'} />
      );
      this.multiModerate = (
        <TrafficLineLayerMulti
          id={id}
          geometries={moderate}
          type={'moderate'}
        />
      );
      this.multiHeavy = (
        <TrafficLineLayerMulti id={id} geometries={heavy} type={'heavy'} />
      );
    }
  }

  render() {
    return (
      <>
        {this.state.isGeometryLoaded && (
          <>
            {this.multiLight}
            {this.multiModerate}
            {this.multiHeavy}
          </>
        )}
      </>
    );
  }
}

export default TrafficLineLayerTile;
