import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ThemeButton} from '../atoms/HomeMenu/ThemeButton';
import {VehicleButton} from '../atoms/HomeMenu/VehicleButton';
import {HistoryButton} from '../atoms/HomeMenu/HistoryButton';
import {SettingsButton} from '../atoms/HomeMenu/SettingsButton';

const styles = StyleSheet.create({
  menuButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
    backgroundColor: '#B9E3DA',
    padding: 10,
    borderRadius: 20,
    elevation: 20,
  },
});

export const HomeMenu = (props: any) => {
  const navigation = props.navigation;
  return (
    <View style={styles.menuButtonContainer}>
      <ThemeButton />
      <VehicleButton />
      <HistoryButton navigation={navigation} />
      <SettingsButton navigation={navigation} />
    </View>
  );
};
