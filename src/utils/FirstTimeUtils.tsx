import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkIfFirstTime = async () => {
  try {
    const isFirstTime = await AsyncStorage.getItem('isFirstTime');
    if (isFirstTime !== null) {
      // Pengguna telah melihat halaman ini sebelumnya
      return false;
    } else {
      // Pengguna pertama kali melihat halaman ini, set status isFirstTime ke 'true'
      await AsyncStorage.setItem('isFirstTime', 'true');
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const resetFirstTime = async () => {
  try {
    await AsyncStorage.removeItem('isFirstTime');
    console.log('Status isFirstTime telah direset');
  } catch (error) {
    console.log(error);
  }
};
