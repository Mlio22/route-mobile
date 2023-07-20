import AsyncStorage from '@react-native-async-storage/async-storage';

// Fungsi untuk menyimpan data array
const saveDataArray = async (key: string, data: string[]) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log('Failed to save data array:', error);
  }
};

// Fungsi untuk mengambil data array
const getDataArray = async (key: string): Promise<string[] | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log('Failed to get data array:', error);
    return null;
  }
};

// Fungsi untuk menghapus data array
const removeDataArray = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Failed to remove data array:', error);
  }
};

export {saveDataArray, getDataArray, removeDataArray};
