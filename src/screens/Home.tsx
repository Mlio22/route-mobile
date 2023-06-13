import React from 'react';
import {StyleSheet, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient'; // import LinearGradient
import {HomeMap} from '../Components/organisms/HomeMap';

import {HomeStackProps} from '../types/App';
import {HomeMenu} from '../Components/molecules/HomeMenu';
import FakeSearchBar from '../Components/perScreen/Home/FakeSearchBar';

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
    elevation: 20,
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

const Home = (props: HomeStackProps) => {
  const navigation = props.navigation;

  return (
    <LinearGradient style={styles.container} colors={['#1B920E', '#53DED9']}>
      <View style={styles.mapContainer}>
        <FakeSearchBar navigation={navigation} />
        <HomeMap />
      </View>
      <HomeMenu navigation={navigation} />
    </LinearGradient>
  );
};

export default Home;
