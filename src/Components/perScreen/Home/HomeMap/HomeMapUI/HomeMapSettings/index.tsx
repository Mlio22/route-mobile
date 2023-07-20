import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import ICONS from '../../../../../../images';
import HomeMapSettingsOverlay from './HomeMapSettingsOverlay';

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  mapSettingsContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    padding: 10,
    backgroundColor: '#2EC08C8f',
    borderRadius: 50,
  },
});

interface HomeMapSettingsState {
  isOverlayVisible: boolean;
}

class HomeMapSettings extends React.Component<any, HomeMapSettingsState> {
  constructor(props: any) {
    super(props);
    this.state = {isOverlayVisible: false};
  }

  // bagian modal
  toggleOverlay() {
    this.setState(prevState => ({
      isOverlayVisible: !prevState.isOverlayVisible,
    }));
  }

  render(): React.ReactNode {
    const toggleTraffic = this.props.toggleTraffic;

    return (
      <>
        <TouchableOpacity
          style={styles.mapSettingsContainer}
          onPress={() => this.toggleOverlay()}>
          <Image source={ICONS.MAP_OPTIONs} />
        </TouchableOpacity>
        {this.state.isOverlayVisible && (
          <HomeMapSettingsOverlay toggleTraffic={toggleTraffic} />
        )}
      </>
    );
  }
}

export default HomeMapSettings;
