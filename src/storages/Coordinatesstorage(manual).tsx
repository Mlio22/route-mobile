import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUserPosition = async (coordinates: any) => {
  try {
    await AsyncStorage.setItem('userPosition', JSON.stringify(coordinates));
    console.log('Posisi pengguna disimpan:', coordinates);
  } catch (error) {
    console.log('Gagal menyimpan posisi pengguna:', error);
  }
};

export const getUserPosition = async () => {
  try {
    const userPosition = await AsyncStorage.getItem('userPosition');
    if (userPosition) {
      const parsedPosition = JSON.parse(userPosition);
      console.log('Koordinat pengguna:', parsedPosition);
      return parsedPosition;
    } else {
      console.log('Koordinat pengguna belum disimpan.');
      return null;
    }
  } catch (error) {
    console.log('Gagal mengambil koordinat pengguna:', error);
    return null;
  }
};

export const resetUserPosition = async () => {
  try {
    await AsyncStorage.removeItem('userPosition');
    console.log('Koordinat pengguna berhasil direset.');
  } catch (error) {
    console.log('Gagal mereset koordinat pengguna:', error);
  }
};
