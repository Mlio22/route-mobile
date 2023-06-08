import AsyncStorage from '@react-native-async-storage/async-storage';

// Menyimpan nilai vehicle ke AsyncStorage
export const saveValueToAsyncStorage = async (key: string, value: number) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log('Value saved successfully',key,value);
  } catch (error) {
    console.log('Error saving value: ', error);
  }
};

// Mendapatkan nilai vehicle dari AsyncStorage
export const getValueFromAsyncStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
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

// Mereset nilai vehicle dalam AsyncStorage
export const resetValueInAsyncStorage = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log('Value reset successfully', key);
    } catch (error) {
      console.log('Error resetting value: ', error);
    }
  };
