import React from 'react';

import {BasicMap} from '../molecules/BasicMap';
import HomeMapUI from '../perScreen/Home/HomeMap/HomeMapUI';
import {ThemeContext} from '../context/UserSettings/ThemeContext';

export class HomeMap extends React.Component {
  basicMap: React.RefObject<BasicMap>;

  // @ts-ignore
  context: React.Context<typeof ThemeContext>;

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
        <BasicMap ref={this.basicMap} theme={this.context.theme} />
        <HomeMapUI centerToUser={() => this.centerToUser()} />
      </>
    );
  }
}

HomeMap.contextType = ThemeContext;
