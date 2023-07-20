import React from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';

import {PreferencesVehicleFirstprops} from '../types/App';

import {saveValueToAsyncStorage} from '../storages/vehiclevalue';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#43D8C9',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  basecontainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '100%',
  },
  Title: {
    flexDirection: 'row',
    width: '80%',
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  LogoChose: {
    width: 30,
    height: '80%',
    marginRight: 10,
  },
  Chooseyourvehicle_view: {
    flex: 1,
    justifyContent: 'center',
  },
  ChooseYourVehicle: {
    color: 'black',
    fontSize: 24,
    lineHeight: 24,
    fontFamily: 'Lato, sans-serif',
    fontWeight: '600',
  },
  TombolPilihMotor: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 120,
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(241,241,241,0.8)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  FrameTombolMotor: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  LogoMotor: {
    width: 35,
    height: 50,
    marginRight: 10,
    marginBottom: 10,
  },
  Motorcycle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'rgba(0,0,0,1)',
    fontSize: 24,
    lineHeight: 24,
    fontFamily: 'Lato, sans-serif',
    fontWeight: '600',
    textAlign: 'center',
  },
  TombolPilihMobil: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 120,
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(241,241,241,0.8)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  FrameTombolMobil: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 10,
  },
  LogoMobil: {
    width: 50,
    height: 40,
    marginRight: 5,
    marginBottom: 10,
  },
  Car: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'rgba(0,0,0,1)',
    fontSize: 24,
    lineHeight: 24,
    fontFamily: 'Lato, sans-serif',
    fontWeight: '600',
    textAlign: 'center',
  },
});

const PreferencesVehicleFirst = (props: PreferencesVehicleFirstprops) => {
  const navigation = props.navigation;

  const handleMotorcyclePress = () => {
    saveValueToAsyncStorage('VehicleValue', 0);
    navigation.navigate('PreferencesSettingsFirst');
  };

  const handleCarPress = () => {
    saveValueToAsyncStorage('VehicleValue', 1);
    navigation.navigate('PreferencesSettingsFirst');
  };

  return (
    <View style={styles.container}>
      <View style={styles.basecontainer}>
        <View style={styles.Title}>
          <Image
            style={styles.LogoChose}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/x8h4r94gqu-420%3A586?alt=media&token=af2c9239-d2ab-46a3-a343-b78cd66590c2',
            }}
          />
          <View style={styles.Chooseyourvehicle_view}>
            <Text style={styles.ChooseYourVehicle}>Choose your Vehicle</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.TombolPilihMotor}
          onPress={handleMotorcyclePress}>
          {/* klo mencet ntar masuk ke input buat preferensi motor ato mobil ama landsung ke menu setting preferensi awalan */}
          <View>
            <View style={styles.FrameTombolMotor}>
              <Image
                style={styles.LogoMotor}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/x8h4r94gqu-420%3A593?alt=media&token=4e6a4634-663b-452f-8a5e-3cf527a0b0a7',
                }}
              />
              <Text style={styles.Motorcycle}>Motorcycle</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.TombolPilihMobil}
          onPress={handleCarPress}>
          {/* klo mencet ntar masuk ke input buat preferensi motor ato mobil ama landsung ke menu setting preferensi awalan */}
          <View>
            <View style={styles.FrameTombolMobil}>
              <Image
                style={styles.LogoMobil}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/x8h4r94gqu-420%3A589?alt=media&token=23da697b-6ee7-4783-9d61-5bdf27c685bd',
                }}
              />
              <Text style={styles.Car}>Car</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PreferencesVehicleFirst;
