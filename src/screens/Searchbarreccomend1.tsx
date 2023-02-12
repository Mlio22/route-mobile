import React, { Component } from 'react';
import {StyleSheet, View, TextInput, Image, TouchableOpacity, } from 'react-native';
import MapboxGL from '@rnmapbox/maps';



import LinearGradient from 'react-native-linear-gradient'; // import LinearGradient
import { SearchBar } from 'react-native-screens';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
    alignItems: 'center',
    flex: 1,
  },

  SearchmapContainer: {
    width: '90%',
    margin: 'auto',
    marginTop: 22,
    height: '90%',
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',

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

  Savedicon: {
    width: 50,
    height: 50,
    alignItems: 'flex-end',
  },

  savedbar: {
    position: 'absolute',
    top: 90,
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderRadius: 0,
    flexDirection: 'row',
    height: 70,
  }
  
});

export const Pencarian1 = ({}) => {
  return (
    <LinearGradient style={styles.container} colors={['#1B920E', '#53DED9']}>
      
        <View style={styles.SearchmapContainer}>
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchBar}
              //accessToken={'pk.eyJ1IjoiYW5ha2JhaWstZXhlIiwiYSI6ImNsYnl4YnZkaTAzaDYzd3A3MWhrb2lqeWIifQ.JLrFLc_GxkTdET36LKjJvw'}
              placeholder="Universitas Telkom"
            />

            <Image
              style={styles.searchIcon}
              source={require('../images/search.png')}
            />
          </View>
          <View style={styles.savedbar}>
            <TouchableOpacity>
              <Image
                style={styles.Savedicon}
                source={require('../images/home3.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.Savedicon}
                source={require('../images/homehashtag.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.Savedicon}
                source={require('../images/galleryfavorite.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.Savedicon}
                source={require('../images/galleryfavorite.png')}
              />
            </TouchableOpacity>
          </View>
        
        </View>
      
    </LinearGradient>
  );
};

export default Pencarian1;
