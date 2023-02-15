import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';

import {BasicMap} from '../molecules/BasicMap';

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  userPositionContainer: {
    backgroundColor: '#2EC08C8f',
    borderRadius: 25,
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 10,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  trackUserImage: {
    width: 20,
    height: 20,
  },
  mapSettingsContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    padding: 10,
    backgroundColor: '#2EC08C8f',
    borderRadius: 50,
  },

  mapSettings: {},
});

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

        <TouchableOpacity
          style={styles.userPositionContainer}
          onPress={() => this.centerToUser()}>
          <Image
            style={styles.trackUserImage}
            source={require('../../images/userTrack.png')}
          />
        </TouchableOpacity>

        <View style={styles.mapSettingsContainer}>
          <Image
            style={styles.mapSettings}
            source={require('../../images/options1.png')}
          />
        </View>
      </>
    );
  }
}
