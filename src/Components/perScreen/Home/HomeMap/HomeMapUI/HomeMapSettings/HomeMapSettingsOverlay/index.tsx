import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ToggleSwitch from './ToggleSwitch';

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    position: 'absolute',
    right: 10,
    width: '60%',
    bottom: 40,
  },
  overlayContent: {
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  OverlayResolusiPeta: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    borderColor: 'rgba(0,0,0,1)',
  },
  FrameToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  TrafficDisplay: {
    color: 'black',
    fontSize: 15,
    lineHeight: 15,
    fontFamily: 'Lato, sans-serif',
    fontWeight: '700',
  },
});

const HomeMapSettingsOverlay = (props: any) => {
  const toggleTraffic = props.toggleTraffic;

  return (
    <View style={styles.overlayContainer}>
      <View style={styles.overlayContent}>
        <View style={styles.FrameToggle}>
          <Text style={styles.TrafficDisplay}>Traffic Display</Text>
          <ToggleSwitch toggleTraffic={toggleTraffic} />
        </View>
      </View>
    </View>
  );
};

export default HomeMapSettingsOverlay;
