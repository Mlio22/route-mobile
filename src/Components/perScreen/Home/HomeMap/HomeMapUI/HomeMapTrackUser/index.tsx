import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import ICONS from '../../../../../../images';

const styles = StyleSheet.create({
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
});

const HomeMapTrackUser = (props: any) => {
  const centerToUser = props.centerToUser;

  return (
    <TouchableOpacity
      style={styles.userPositionContainer}
      onPress={() => centerToUser()}>
      <Image style={styles.trackUserImage} source={ICONS.TRACK_USER} />
    </TouchableOpacity>
  );
};

export default HomeMapTrackUser;
