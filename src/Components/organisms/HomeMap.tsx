import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

import {BasicMap} from '../molecules/BasicMap';
import OverlayResolusiPeta from '../molecules/Mapsettings';

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
    // display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    right: "6%",
    bottom: "27%",
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  overlayContent: {
    backgroundColor: 'white',
    width: "75%",
    height: "100%",
  
    // padding: 50,
    // borderRadius: 100,
  },
});

interface HomeMapState {
  isOverlayVisible: boolean;
}

export class HomeMap extends React.Component<{}, HomeMapState> {
  basicMap: React.RefObject<BasicMap>;

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
      // <Modal visible={this.state.isOverlayVisible} transparent>
      //   <TouchableOpacity
      //     style={styles.overlayContainer}
      //     onPress={() => this.toggleOverlay()}>
      //     <OverlayResolusiPeta/>
      //   </TouchableOpacity>
      // </Modal>
      <Modal visible={this.state.isOverlayVisible} transparent>
        <TouchableWithoutFeedback onPress={() => this.handleOutsidePress()}>
          <View style={styles.overlayContainer}>
            <TouchableWithoutFeedback onPress={() => this.handleOverlayPress()}>
              <View style={styles.overlayContent}>
                <OverlayResolusiPeta/>
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
        <BasicMap ref={this.basicMap} />

        {/* Pisahkan komponen ini */}
        <TouchableOpacity
          style={styles.userPositionContainer}
          onPress={() => this.centerToUser()}>
          <Image
            style={styles.trackUserImage}
            source={require('../../images/userTrack.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mapSettingsContainer}
          onPress={() => this.toggleOverlay()}>
          <Image
            style={styles.mapSettings}
            source={require('../../images/options1.png')}
          />
        </TouchableOpacity>

        {this.renderOverlay()}
      </>
    );
  }
}
