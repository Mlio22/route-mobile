import React from 'react';
import {StyleSheet, View, TextInput, Image, TouchableOpacity ,Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MapboxGL from '@rnmapbox/maps';

import LinearGradient from 'react-native-linear-gradient'; // import LinearGradient
//import { TouchableOpacity } from 'react-native/Libraries/Components/Touchable/TouchableOpacity';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
    alignItems: 'center',
    flex: 1,
  },
  mapContainer: {
    width: '85%',
    margin: 'auto',
    marginTop: 22,
    height: '75%',
    borderRadius: 15,
    alignItems: 'center',

    overflow: 'hidden',
  },

  searchBarContainer: {
    position: 'absolute',
    top: 20,
    width: '90%',
    paddingHorizontal: 20,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderRadius: 15,
    flexDirection: 'row',
    height: 50,
  },

  searchBar: {
    color: 'black',
    width: '90%',
  },

  searchIcon: {
    width: 20,
    height: 20,
    alignItems: 'flex-end',
  },

  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  userPositionContainer: {
    backgroundColor: '#2EC08C8f',
    borderRadius: 25,
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 10,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  trackUserImage: {
    width: 20,
    height: 20,
  },
  mapSettingsContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    padding: 10,
    backgroundColor: '#2EC08C8f',
    borderRadius: 50,
  },

  mapSettings: {},

  menuButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 35,
  },

  menuButton: {
    backgroundColor: '#2EC08C',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    // alignItems: 'flex-start',
  },

  menuIcon: {
    width: 20,
    height: 20,
  },
});

const HomeScreen = ({}) => {
  return (
    <LinearGradient style={styles.container} colors={['#1B920E', '#53DED9']}>
      <View style={styles.mapContainer}>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Universitas Telkom"
          />

          <Image
            style={styles.searchIcon}
            source={require('../images/search.png')}
          />
        </View>
        <MapboxGL.MapView
          projection={'globe'}
          style={styles.map}
          attributionEnabled={false}
          logoEnabled={false}>
          <MapboxGL.Camera
            zoomLevel={15}
            animationMode={'none'}
            centerCoordinate={[107.604954, -6.934469]}
          />
        </MapboxGL.MapView>
        <TouchableOpacity style={styles.userPositionContainer}>
          <Image
            style={styles.trackUserImage}
            source={require('../images/userTrack.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.mapSettingsContainer}>
          <Image
            style={styles.mapSettings}
            source={require('../images/options1.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.menuButtonContainer}>
        <TouchableOpacity style={styles.menuButton}>
          <Image
            style={styles.menuIcon}
            source={require('../images/user.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Image
            style={styles.menuIcon}
            source={require('../images/vehicleType.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Image
            style={styles.menuIcon}
            source={require('../images/timeline.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Image
            style={styles.menuIcon}
            source={require('../images/generalSettings.png')}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;
