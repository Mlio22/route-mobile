import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import MapboxGL from '@rnmapbox/maps';
import {LocationDetailsContextProvider} from '../Components/context/LocationDetailContext';
import {saveUserPosition} from '../storages/Coordinatesstorage(manual)';
import {UserLocationContext} from '../Components/context/UserLocationContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  pinpoint: {
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
    zIndex: 3,
    // backgroundColor:"red",
  },
  pinpointtext: {
    color: 'black',
  },
  containerstatus: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 20,
    alignSelf: 'center',
    // backgroundColor: 'white',
  },
  StatusLokasiDanTujuan: {
    width: '90%',
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 18,
    paddingBottom: 18,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,1)',
    // bottom: "100%",
  },
  Framedetailmanualalocation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    // backgroundColor: "red",
  },
  Vector: {
    width: 20,
    height: '100%',
  },
  Koordinat: {
    color: 'rgba(0,0,0,1)',
    fontSize: 12,
    lineHeight: 12,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '400',
  },
  Vector1: {
    width: 20,
    height: 20,
  },
});

type coordinate = {
  latitude: number;
  longitude: number;
};

const ManualLocation = (props: any) => {
  const navigation = props.navigation;

  const [coordinates, setCoordinates] = useState<coordinate>({
    longitude: 107.6351264,
    latitude: -6.972025,
  });
  const mapview = React.createRef<MapboxGL.MapView>();

  const forsaveUserPosition = () => {
    navigation.navigate('SettingsGeneral');
    ToastAndroid.show('Manually Set', 1000);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.pinpoint}>
        <Image source={require('../images/pinpoint.png')} />
      </View>

      <MapboxGL.MapView
        style={{flex: 1}}
        ref={mapview}
        onTouchMove={async e => {
          try {
            const center = await mapview.current!.getCenter();
            const [longitude, latitude] = center;

            setCoordinates({latitude, longitude});
          } catch (e) {}
        }}>
        <MapboxGL.Camera
          defaultSettings={{
            centerCoordinate: [coordinates.longitude, coordinates.latitude],
            zoomLevel: 15,
          }}
        />
      </MapboxGL.MapView>

      {coordinates && (
        <View style={styles.containerstatus}>
          <View style={styles.StatusLokasiDanTujuan}>
            <View style={styles.Framedetailmanualalocation}>
              <Image
                style={styles.Vector}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/sarxv8i0j8-292%3A346?alt=media&token=a83a79db-83c7-4d00-a7e8-1ee766d12def',
                }}
              />
              <View>
                <Text style={styles.pinpointtext}>
                  Latitude: {coordinates.latitude.toFixed(5)}
                </Text>
                <Text style={styles.pinpointtext}>
                  Longitude: {coordinates.longitude.toFixed(5)}
                </Text>
              </View>
              <TouchableOpacity onPress={forsaveUserPosition}>
                <Image
                  style={styles.Vector1}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/sarxv8i0j8-292%3A342?alt=media&token=53678b45-4651-4d97-8a6a-a7459e322ab4',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ManualLocation;
