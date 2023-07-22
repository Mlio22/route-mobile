import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import {PreferencesSettingsFirstprops} from '../types/App';

import {
  savePreferenceToAsyncStorage,
  getPreferenceToAsyncStorage,
} from '../storages/Preferecevalue';

import Framepreferensi from '../Components/organisms/preferenceframe';

const styles = StyleSheet.create({
  HalamanPemilihanPreferensiAwalVer2: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 65,
    paddingBottom: 65,
    backgroundColor: '#43D8C9',
  },
  Containercontent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    // backgroundColor: "white",
  },
  Containertop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '6%',
    paddingRight: 1,
    // backgroundColor: "red",
  },
  Containertop2: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '10%',
    // backgroundColor: "blue",
  },
  Choose1: {
    width: '10%',
    height: '100%',
  },
  SetYourPreferencesFi: {
    color: 'rgba(0,0,0,1)',
    fontSize: 24,
    lineHeight: 24,
    marginTop: 5,
    fontFamily: 'Lato, sans-serif',
    fontWeight: '400',
  },
  WeNeedToKnowYourPref: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'rgba(0,0,0,1)',
    fontSize: 22,
    lineHeight: 22,
    fontFamily: 'Lato, sans-serif',
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 10,
  },
  Containertop3: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: "flex-start",
    alignItems: 'flex-end',
    width: '100%',
    height: '5%',
    // backgroundColor: "green",
  },
  Containerbot: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: "flex-start",
    width: '100%',
    height: '10%',
    //  backgroundColor: "red",
  },
  Containerbot2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    height: '5%',
    // backgroundColor: "green",
  },
  Importanttext: {
    color: 'rgba(0,0,0,1)',
    fontSize: 14,
    lineHeight: 14,
    fontFamily: 'Lato, sans-serif',
    fontWeight: '400',
  },
  containerpref: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: 375,
    height: '60%',
    //  backgroundColor: "white",
  },
  containerpref2: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    height: '100%',
    // backgroundColor: "green",
  },
  Vectorline: {
    display: 'flex',
    flexDirection: 'row',
    width: '2%',
    height: '95%',
    backgroundColor: 'black',
    marginLeft: 10,
    marginTop: 10,
  },
  Vectorsubmit: {
    width: 35,
    height: 35,
  },
});

const PreferencesSettingsFirst = (props: PreferencesSettingsFirstprops) => {
  const navigation = props.navigation;

  const [preference, _] = useState<any>(null);

  let currentOrder: string[] = [];
  function setOrder(newOrder: any) {
    currentOrder = newOrder;
  }

  const handleSubmitPress = () => {
    console.log(currentOrder);
    savePreferenceToAsyncStorage('preference', currentOrder);
    navigation.navigate('Home');
    ToastAndroid.show('Preferences Set', 1000);
  };

  return (
    <View style={styles.HalamanPemilihanPreferensiAwalVer2}>
      <View style={styles.Containercontent}>
        <View style={styles.Containertop}>
          <Image
            style={styles.Choose1}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/j8m5rtm1zr-414%3A378?alt=media&token=d6320b25-2574-4472-a5a5-1cf15ce74c07',
            }}
          />
          <Text style={styles.SetYourPreferencesFi}>
            {preference
              ? 'Re-Set your preferences'
              : 'Set your preferences first!'}
          </Text>
        </View>
        <View style={styles.Containertop2}>
          <Text style={styles.WeNeedToKnowYourPref}>
            we need to know your preferences
          </Text>
        </View>
        <View style={styles.Containertop3}>
          <Text style={styles.Importanttext}>Most Important</Text>
        </View>
        <View style={styles.containerpref}>
          <View style={styles.Vectorline}>{/* buat garis importance */}</View>
          <View style={styles.containerpref2}>
            <Framepreferensi setOrder={setOrder}></Framepreferensi>
          </View>
        </View>
        <View style={styles.Containerbot}>
          <Text style={styles.Importanttext}>Less Important</Text>
        </View>
        <View style={styles.Containerbot2}>
          <TouchableOpacity onPress={handleSubmitPress}>
            <Image
              style={styles.Vectorsubmit}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/1grlufro641i-414%3A421?alt=media&token=84a011c0-6cd1-4322-9876-4d5a477c48ac',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PreferencesSettingsFirst;
