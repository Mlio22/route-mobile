import React from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import {Historyprops} from '../types/App';

// Import Fungsi Storage

const styles = StyleSheet.create({
  Historycontainer: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    width: '100%',
    height: '100%',
    // paddingLeft: 20,
    // paddingRight: 20,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#43D8C9',
  },
  Historylogo: {
    width: 33,
    height: '85%',
    marginRight: 20,
    // marginBottom: 20,
    marginLeft: 20,
  },
  Historytext: {
    color: 'rgba(0,0,0,1)',
    fontSize: 24,
    lineHeight: 24,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '400',
    marginTop: 7,
  },
  Containergreen: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  Historymenus: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '5%',
    marginTop: 20,
    // backgroundColor: 'blue',
  },
  ContainerHistorymenus: {
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  containermid: {
    display: 'flex',
    // backgroundColor: 'blue',
    width: '100%',
    height: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  Containerlisthistory: {
    width: '90%',
    height: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.92)',
    // backgroundColor: 'yellow',
  },
  containerinfo: {
    height: '10%',
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: -2, height: -2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 20,
  },
  containerinfoinside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    // alignContent: 'space-between',
    // alignItems: 'stretch',
    marginHorizontal: 8,
    marginBottom: 6,
    // backgroundColor: 'blue',
  },
  Containsettings: {
    width: '100%',
    height: '100%',
  },
  containercontext: {},
  Icons: {
    marginTop: 5,
    height: 25,
    width: 25,
  },
  destinationtxtp: {
    color: 'rgba(0,0,0,1)',
    fontSize: 18,
    lineHeight: 18,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '400',
  },
  destinationtxtS: {
    color: 'rgba(0,0,0,1)',
    fontSize: 11,
    lineHeight: 11,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '400',
  },
  destinationinfo: {
    // backgroundColor: 'red',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

const History = (props: Historyprops) => {
  return (
    <View style={styles.Historycontainer}>
      <View style={styles.Containergreen}>
        <View style={styles.Historymenus}>
          <View style={styles.ContainerHistorymenus}>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/fcgar61qblr-630%3A305?alt=media&token=6b644130-16c3-4b26-b3a2-fd39ad597672',
              }}
              style={styles.Historylogo}
            />
            <Text style={styles.Historytext}>HISTORY</Text>
          </View>
        </View>
        <View style={styles.containermid}>
          <View style={styles.Containerlisthistory}>
            <TouchableOpacity style={styles.containerinfo}>
              <View style={styles.containerinfoinside}>
                <Image
                  style={styles.Icons}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/fuqt46aeqsd-630%3A319?alt=media&token=8532f11c-6819-4801-bbd7-023a2bc42c26',
                  }}
                />
                <View style={styles.destinationinfo}>
                  <Text style={styles.destinationtxtp}>Yogya Bojongsoang</Text>
                  <Text style={styles.destinationtxtS}>
                    Jl Buah batu bojongsoang
                  </Text>
                </View>
                <Image
                  style={styles.Icons}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/71v9lw3k4zm-272%3A492?alt=media&token=4adb996f-f229-4aa6-8d5e-75addcf1b0d8',
                  }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerinfo}>
              <View style={styles.containerinfoinside}>
                <Image
                  style={styles.Icons}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/fuqt46aeqsd-630%3A319?alt=media&token=8532f11c-6819-4801-bbd7-023a2bc42c26',
                  }}
                />
                <View style={styles.destinationinfo}>
                  <Text style={styles.destinationtxtp}>Yogya Bojongsoang</Text>
                  <Text style={styles.destinationtxtS}>
                    Jl Buah batu bojongsoang
                  </Text>
                </View>
                <Image
                  style={styles.Icons}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/b5slvk3gsxr-272%3A520?alt=media&token=840bab73-a55d-4984-bf77-10beb0d03745',
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default History;
