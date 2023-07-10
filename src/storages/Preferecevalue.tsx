import AsyncStorage from '@react-native-async-storage/async-storage';

export const savePreferenceToAsyncStorage = async (
  key: string,
  value: any,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log('Data berhasil disimpan.', value);
  } catch (error) {
    console.log('Terjadi kesalahan saat menyimpan data: ', error);
  }
};

export const getPreferenceToAsyncStorage = async (
  key: string,
): Promise<any> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (error) {
    console.log('Terjadi kesalahan saat mengambil data: ', error);
    return null;
  }
};

export const resetPreferenceInAsyncStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Value reset successfully', key);
  } catch (error) {
    console.log('Error resetting value: ', error);
  }
};
