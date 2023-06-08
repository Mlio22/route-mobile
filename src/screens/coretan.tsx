import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FirstTimeScreen = ({ navigation }) => {
  useEffect(() => {
    checkIfFirstTime();
  }, []);

  const checkIfFirstTime = async () => {
    try {
      const isFirstTime = await AsyncStorage.getItem('isFirstTime');
      if (isFirstTime !== null) {
        // Pengguna telah melihat halaman ini sebelumnya, alihkan ke halaman lain
        navigation.navigate('HomeScreen');
      } else {
        // Pengguna pertama kali melihat halaman ini, set status isFirstTime ke 'true'
        await AsyncStorage.setItem('isFirstTime', 'true');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // Tampilan halaman FirstTimeScreen
  );
};

export default FirstTimeScreen;
