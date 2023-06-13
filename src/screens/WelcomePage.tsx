import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WelcomePageProps} from '../types/App';
import LinearGradient from 'react-native-linear-gradient';

import {checkIfFirstTime} from '../utils/FirstTimeUtils';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  Welcome: {
    color: 'black',
    fontSize: 48,
    lineHeight: 48,
    fontFamily: 'Krub, sans-serif', //font nya blom ada
    fontWeight: '700',
  },
});

const WelcomePage = (props: WelcomePageProps) => {
  const navigation = props.navigation;

  useEffect(() => {
    const handleFirstTimeCheck = async () => {
      const isFirstTime = await checkIfFirstTime();
      if (isFirstTime) {
        // Pengguna pertama kali melihat halaman ini
        navigation.navigate('PreferencesVehicleFirst');
      } else {
        // Pengguna telah melihat halaman ini sebelumnya
        navigation.navigate('Home');
      }
    };

    // Panggil fungsi pengecekan isFirstTime setelah beberapa detik delay
    const delay = 4000; // 3000 milidetik = 3 detik
    const timer = setTimeout(handleFirstTimeCheck, delay);

    return () => clearTimeout(timer); // Membersihkan timer saat komponen unmount
  }, [navigation]);

  return (
    <LinearGradient style={styles.container} colors={['#1B920E', '#53DED9']}>
      <View>
        <Text style={styles.Welcome}>WELCOME</Text>
      </View>
    </LinearGradient>
  );
};

export default WelcomePage;
