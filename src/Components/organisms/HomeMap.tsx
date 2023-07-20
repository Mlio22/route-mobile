import React from 'react';

import {BasicMap} from '../Map/BasicMap';
import HomeMapUI from '../perScreen/Home/HomeMap/HomeMapUI';

export class HomeMap extends React.Component {
  basicMap: React.RefObject<BasicMap>;

  constructor(props: any) {
    super(props);

    this.basicMap = React.createRef<BasicMap>();
  }

  centerToUser() {
    this.basicMap.current?.centerMapToUser();
  }

  toggleTrafficView() {
    this.basicMap.current?.toggleTrafficView();
  }

  render(): React.ReactNode {
    return (
      <>
        <BasicMap ref={this.basicMap} />
        <HomeMapUI
          toggleTraffic={() => this.toggleTrafficView()}
          centerToUser={() => this.centerToUser()}
        />
      </>
    );
  }
}
