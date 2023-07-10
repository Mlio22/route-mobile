import React from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';

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

class PreferencesSettingsFirst2 extends React.Component {
  state: {
    is_data_retrieved: boolean;
    currentOrder: string[];
    text: string;
  };
  // @ts-ignore
  props: any;

  constructor(props: any) {
    super(props);

    this.state = {
      is_data_retrieved: false,
      currentOrder: [],
      text: 'belum',
    };

    this.retrieve_data();
  }

  async retrieve_data() {
    let currentOrder: string[] = [];
    let newText = '';

    try {
      currentOrder = await getPreferenceToAsyncStorage('preference');

      if (currentOrder.length > 0) {
        newText = 'udah';
      } else {
        newText = 'belum';
      }
    } catch (e) {
      newText = 'belum';
    }

    this.setState({is_data_retrieved: true, text: newText, currentOrder});
  }

  setOrder(newOrder: string[]) {
    this.setState({currentOrder: newOrder});
  }

  handleSubmitPress() {
    savePreferenceToAsyncStorage('preference', this.state.currentOrder);
    this.props.navigation.navigate('Home');
  }

  render() {
    if (!this.state.is_data_retrieved) return <></>;

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
            <Text style={styles.SetYourPreferencesFi}>{this.state.text}</Text>
          </View>
          <View style={styles.Containertop2}>
            <Text style={styles.WeNeedToKnowYourPref}>
              we need to know your preferences first
            </Text>
          </View>
          <View style={styles.Containertop3}>
            <Text style={styles.Importanttext}>Most Important</Text>
          </View>
          <View style={styles.containerpref}>
            <View style={styles.Vectorline}>{/* buat garis importance */}</View>
            <View style={styles.containerpref2}>
              <Framepreferensi
                setOrder={(newOrder: string[]) => {
                  this.setOrder(newOrder);
                }}></Framepreferensi>
            </View>
          </View>
          <View style={styles.Containerbot}>
            <Text style={styles.Importanttext}>Less Important</Text>
          </View>
          <View style={styles.Containerbot2}>
            <TouchableOpacity
              onPress={() => {
                this.handleSubmitPress();
              }}>
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
  }
}

const PreferencesSettingsFirst = (props: PreferencesSettingsFirstprops) => {
  const navigation = props.navigation;

  // import asyncStorage yang preference
  // ambil preference menggunakan getValuePreference
  // cek prefence nilainya ada atau ngga
  // klo nilainya ngga ada tulisan "Set your preferences first"
  // klo nilainya ada tulisan "re-setSet your preferences"

  let currentOrder: string[] = [];
  function setOrder(newOrder: any) {
    currentOrder = newOrder;
  }

  const handleSubmitPress = () => {
    console.log(currentOrder);
    savePreferenceToAsyncStorage('preference', currentOrder);
    navigation.navigate('Home');
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
          <Text style={styles.SetYourPreferencesFi}></Text>
        </View>
        <View style={styles.Containertop2}>
          <Text style={styles.WeNeedToKnowYourPref}>
            we need to know your preferences first
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
