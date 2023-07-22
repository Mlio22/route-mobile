import React from 'react';

import {BasicMap} from '../Map/BasicMap';
import HomeMapUI from '../perScreen/Home/HomeMap/HomeMapUI';
import {ThemeContext} from '../context/UserSettings/ThemeContext';

export class HomeMap extends React.Component {
  basicMap: React.RefObject<BasicMap>;

  // @ts-ignore
  context: React.Context<typeof ThemeContext>;

  constructor(props: any) {
    super(props);

    this.basicMap = React.createRef<BasicMap>();
    this.state = {
      isOverlayVisible: false,
    };
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
        <BasicMap ref={this.basicMap} theme={this.context.theme} />
        <HomeMapUI
          toggleTraffic={() => this.toggleTrafficView()}
          centerToUser={() => this.centerToUser()}
        />
      </>
    );
  }
}

HomeMap.contextType = ThemeContext;
