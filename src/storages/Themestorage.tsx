import AsyncStorage from '@react-native-async-storage/async-storage';

// Menyimpan Theme ke AsyncStorage
export const saveThemeToAsyncStorage = async (value: string) => {
  try {
    await AsyncStorage.setItem('Theme', JSON.stringify(value));
    console.log('Value saved successfully', 'vehicle', value);
  } catch (error) {
    console.log('Error saving value: ', error);
  }
};

// Mendapatkan Theme dari AsyncStorage
export const getThemeFromAsyncStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('Theme');
    if (value !== null) {
      return JSON.parse(value);
    } else {
      console.log('Value not found');
      return null;
    }
  } catch (error) {
    console.log('Error retrieving value: ', error);
    return null;
  }
};
