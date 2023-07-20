import React from 'react';
import {View, StyleSheet, Modal, TouchableWithoutFeedback} from 'react-native';

import {BasicMap} from '../molecules/BasicMap';
import HomeMapUI from '../perScreen/Home/HomeMap/HomeMapUI';
import {ThemeContext} from '../context/UserSettings/ThemeContext';
import ToggleSwitch from '../molecules/Mapsettingsinside/Toggleswitch';

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

  // style overlay
  overlayContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '67%',
    left: 0,
    right: '-20%',
    bottom: '23%',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  overlayContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
  },

  overlayText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

interface HomeMapState {
  isOverlayVisible: boolean;
}

export class HomeMap extends React.Component<{}, HomeMapState> {
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

  // bagian modal
  toggleOverlay() {
    this.setState(prevState => ({
      isOverlayVisible: !prevState.isOverlayVisible,
    }));
  }

  closeOverlay() {
    this.setState({
      isOverlayVisible: false,
    });
  }

  handleOverlayPress() {
    // Tidak melakukan apa-apa ketika overlay ditekan
  }

  handleOutsidePress() {
    this.closeOverlay();
  }

  renderOverlay() {
    if (!this.state.isOverlayVisible) {
      return null;
    }

    return (
      <Modal visible={this.state.isOverlayVisible} transparent>
        <TouchableWithoutFeedback onPress={() => this.handleOutsidePress()}>
          <View style={styles.overlayContainer}>
            <TouchableWithoutFeedback onPress={() => this.handleOverlayPress()}>
              <View style={styles.overlayContent}>
                <ToggleSwitch></ToggleSwitch>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
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
