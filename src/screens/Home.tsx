import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient'; // import LinearGradient
import {HomeMap} from '../Components/organisms/HomeMap';

import {SearchContext} from '../Components/context/SearchContext';
import {HomeStackProps} from '../types/App';
import {HomeMenu} from '../Components/molecules/HomeMenu';

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

const Home = (props: HomeStackProps) => {
  const {searchInfo} = React.useContext(SearchContext);

  const navigation = props.navigation;

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
              value={searchInfo.searchQuery}
            />
            <Image
              style={styles.searchIcon}
              source={require('../images/search.png')}
            />
          </View>
        </TouchableWithoutFeedback>
        <HomeMap />
      </View>
      <HomeMenu navigation={navigation} />
    </LinearGradient>
  );
};

export default Home;
