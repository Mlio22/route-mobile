import AsyncStorage from '@react-native-async-storage/async-storage';

// Menyimpan nilai vehicle ke AsyncStorage
export const saveValueToAsyncStorage = async (value: string) => {
  try {
    await AsyncStorage.setItem('VehicleValue', JSON.stringify(value));
    console.log('Value saved successfully', 'vehicle', value);
  } catch (error) {
    console.log('Error saving value: ', error);
  }
};

// Mendapatkan nilai vehicle dari AsyncStorage
export const getValueFromAsyncStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('VehicleValue');
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
export const resetValueInAsyncStorage = async () => {
  try {
    await AsyncStorage.removeItem('VehicleValue');
    console.log('Vehicle Value reset successfully');
  } catch (error) {
    console.log('Error resetting value: ', error);
  }
};
