import React from 'react';
import { View, StyleSheet } from 'react-native';

const AnimatedIconloading = () => {
  return (
    <View style={styles.ping}>
      <View style={[styles.circle, styles.before]} />
      <View style={[styles.circle, styles.after]} />
    </View>
  );
};

const styles = StyleSheet.create({
  ping: {
    position: 'relative',
    height: 50,
    width: 50,
  },
  circle: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    borderRadius: 25,
  },
  before: {
    backgroundColor: '#3950cf',
    transform: [{ scale: 0 }],
    opacity: 0,
    animationDuration: '1s',
    animationName: 'pulse7132',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
  after: {
    backgroundColor: '#3950cf',
    animationDelay: '-0.5s',
    transform: [{ scale: 0 }],
    opacity: 0,
    animationDuration: '1s',
    animationName: 'pulse7132',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
});

export default AnimatedIconloading;
