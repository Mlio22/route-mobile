import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity
      style={[styles.switch, isChecked && styles.switchChecked]}
      onPress={handleToggle}
    >
      <View style={[styles.slider, isChecked && styles.sliderChecked]}>
        <View style={styles.sliderInner} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switch: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 51,
    height: 29,
    borderRadius: 100,
    backgroundColor: '#ffffff2b',
    margin: 10,
    cursor: 'pointer',
    position: 'relative',
  },
  switchChecked: {
    // Style when the switch is checked
  },
  slider: {
    width: 26,
    height: 26,
    borderRadius: 200,
    backgroundColor: '#e3e3e3',
    position: 'absolute',
    top: 2.3,
    left: 2,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 6,
    shadowOpacity: 1,
    transitionProperty: 'left, background-color',
    transitionDuration: 300,
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  sliderChecked: {
    left: 24, // Adjust the position when the switch is checked
    backgroundColor: '#22cc3f', // Adjust the background color when the switch is checked
  },
  sliderInner: {
    flex: 1,
  },
});

export default ToggleSwitch;
