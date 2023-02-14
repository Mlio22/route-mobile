import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import MapboxGL, {Logger} from '@rnmapbox/maps';

import LinearGradient from 'react-native-linear-gradient'; // import LinearGradient
import {Map} from '../Components/organisms/Map';

import type {HomeStackProps} from '../../App';

MapboxGL.locationManager.start(1);

// edit logging messages
Logger.setLogCallback(log => {
  const {message} = log;

  // expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
  if (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed')
  ) {
    return true;
  }
  return false;
});

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
    borderColor: '#a1a1a1',
    borderWidth: 2,
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

class Home extends React.Component<HomeStackProps> {
  constructor(props: HomeStackProps) {
    super(props);
  }

  render(): React.ReactNode {
    const navigation = this.props.navigation;

    return (
      <LinearGradient style={styles.container} colors={['#1B920E', '#53DED9']}>
        <View style={styles.mapContainer}>
          <TouchableWithoutFeedback
            onPressIn={() => {
              navigation.navigate('SearchLocation');
            }}>
            <View style={styles.searchBarContainer}>
              <TextInput
                style={styles.searchBar}
                editable={false}
                placeholderTextColor={'#959595'}
                placeholder="Universitas Telkom"
              />
              <Image
                style={styles.searchIcon}
                source={require('../images/search.png')}
              />
            </View>
          </TouchableWithoutFeedback>
          <Map />
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
  }
}

export default Home;
