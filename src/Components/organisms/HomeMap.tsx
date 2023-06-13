import React from 'react';

import {BasicMap} from '../molecules/BasicMap';
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

  render(): React.ReactNode {
    return (
      <>
        <BasicMap ref={this.basicMap} />
        <HomeMapUI centerToUser={() => this.centerToUser()} />
      </>
    );
  }
}
