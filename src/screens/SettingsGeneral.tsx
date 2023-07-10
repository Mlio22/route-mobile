import React from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';

import {SettingsGeneralprops} from '../types/App';

// Tombol reset
import {resetFirstTime} from '../utils/FirstTimeUtils';
import {resetUserPosition} from '../storages/Coordinatesstorage(manual)';
import {resetValueInAsyncStorage} from '../storages/vehiclevalue';
import {resetPreferenceInAsyncStorage} from '../storages/Preferecevalue';

const styles = StyleSheet.create({
  HalamanSetting: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 66,
    paddingBottom: 77,
    backgroundColor: '#43D8C9',
  },
  Containergreen: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  Settingsmenus: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingRight: 2,
    paddingBottom: 2,
    marginBottom: 10,
  },
  Logosettings: {
    width: 30,
    height: '100%',
    marginRight: 20,
    marginBottom: 20,
  },
  Settings: {
    color: 'rgba(0,0,0,1)',
    fontSize: 24,
    lineHeight: 24,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '400',
    marginTop: 5,
  },
  Containerwhite: {
    width: '100%',
    height: '100%',
    paddingLeft: 14,
    paddingRight: 77,
    paddingTop: 41,
    paddingBottom: 470,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.92)',
    // backgroundColor: "yellow",
  },
  Containsettings: {
    width: '100%',
    height: '100%',
  },
  Containsettingspil: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingRight: 35,
    paddingBottom: 4,
    // backgroundColor: "red",
  },
  TextSettings: {
    color: 'rgba(0,0,0,1)',
    fontSize: 22,
    lineHeight: 22,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
  },
  framebuttonsettings: {
    marginTop: 40,
  },
});

const SettingsGeneral = (props: SettingsGeneralprops) => {
  const navigation = props.navigation;

  const handleReset = async () => {
    resetFirstTime(); // reset penggunan pertama kali
    resetUserPosition(); // reset user position
    resetValueInAsyncStorage('VehicleValue'); // reset vehicle value
    resetPreferenceInAsyncStorage('preference'); // // reset preferensi
  };

  return (
    <View style={styles.HalamanSetting}>
      <View style={styles.Containergreen}>
        <View style={styles.Settingsmenus}>
          <Image
            style={styles.Logosettings}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/7f6tmwcwqya-414%3A446?alt=media&token=afb8c830-05e2-4f55-91e7-324b19609681',
            }}
          />
          <Text style={styles.Settings}>SETTINGS</Text>
        </View>
        <View style={styles.Containerwhite}>
          <View style={styles.Containsettings}>
            <View style={styles.Containsettingspil}>
              <TouchableOpacity
                onPressIn={() => {
                  navigation.navigate('PreferencesSettingsFirst');
                }}>
                <Text style={styles.TextSettings}>Preferences settings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.framebuttonsettings}
                onPressIn={() => {
                  navigation.navigate('ManualLocation');
                }}>
                <Text style={styles.TextSettings}>Manual Location</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.framebuttonsettings}
                onPress={handleReset}>
                <Text style={styles.TextSettings}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SettingsGeneral;
