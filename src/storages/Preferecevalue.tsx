import AsyncStorage from '@react-native-async-storage/async-storage';

function convertPreferenceIntoNumber(preferences: string[]) {
  // congestion,duration,quality,distance
  let numberString = '';
  for (const preference of preferences) {
    if (preference === 'distance') {
      numberString += 1;
    }
    if (preference === 'duration') {
      numberString += 2;
    }
    if (preference === 'congestion') {
      numberString += 3;
    }
    if (preference === 'quality') {
      numberString += 4;
    }
  }

  return numberString;
}

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

export const getPreferenceToAsyncStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('preference');

    if (value !== null) {
      const priorities = JSON.parse(value);
      const convertedPriorities = convertPreferenceIntoNumber(priorities);
      return convertedPriorities;
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
