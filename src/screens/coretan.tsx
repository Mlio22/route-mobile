import AsyncStorage from '@react-native-async-storage/async-storage';

// Fungsi untuk menyimpan data array
export const saveData = async (key: string, data: string[]) => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
    console.log('Data berhasil disimpan');
  } catch (error) {
    console.log('Gagal menyimpan data:', error);
  }
};

// Fungsi untuk mengambil data array
export const getData = async (key: string): Promise<string[] | null> => {
  try {
    const jsonData = await AsyncStorage.getItem(key);
    if (jsonData) {
      const data = JSON.parse(jsonData);
      return data;
    }
    return null;
  } catch (error) {
    console.log('Gagal mengambil data:', error);
    return null;
  }
};

// Fungsi untuk menghapus data
export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Data berhasil dihapus');
  } catch (error) {
    console.log('Gagal menghapus data:', error);
  }
};
