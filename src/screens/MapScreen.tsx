import React, {useState} from 'react';
import MapboxGL, {MapViewProps} from '@rnmapbox/maps';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYW5ha2JhaWstZXhlIiwiYSI6ImNsYnl4YnZkaTAzaDYzd3A3MWhrb2lqeWIifQ.JLrFLc_GxkTdET36LKjJvw',
); // Ganti dengan token akses Mapbox Anda

const MapScreen = () => {
  const [theme, setTheme] = useState('light'); // Tema awal: light

  const toggleMapTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        styleURL={`mapbox://styles/mapbox/dark-v10`}>
        {/* Konten peta lainnya */}
      </MapboxGL.MapView>

      <TouchableOpacity style={styles.themeButton} onPress={toggleMapTheme}>
        {/* Tombol untuk mengubah tema */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  themeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
  },
});

export default MapScreen;
