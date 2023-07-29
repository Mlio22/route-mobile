import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
  ToastAndroid,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLocationDot, faRoute} from '@fortawesome/free-solid-svg-icons';
import {PreviewImage} from '../atoms/details/PreviewImage';
import {PlaceDetailContext} from '../context/locationDetails/PlaceDetailsContext';
import {PreviewModeContext} from '../context/locationDetails/PreviewModeContext';
import {PlaceRouteContext} from '../context/locationDetails/PlaceRouteContext';

const styles = StyleSheet.create({
  locationDetailContainerFull: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#2EC08CEF',
    height: '50%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  locationDetailContainerHalf: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#2EC08CEF',
    height: '30%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  locationDetail: {
    display: 'flex',
    alignItems: 'center',
  },
  locationTitle: {
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
  },
  locationName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  locationType: {
    fontSize: 16,
  },

  routeButton: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 20,
    elevation: 5,
    backgroundColor: '#2EC08C',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  routeIcon: {
    marginRight: 30,
  },
  routeText: {
    fontSize: 16,
  },

  locationAddress: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-around',
    marginTop: 10,
    padding: 10,
  },
  addressIcon: {
    justifyContent: 'center',
  },
  locationAddressDetail: {
    marginLeft: 10,
    width: '90%',
    justifyContent: 'center',
  },
  locationAddressComplete: {},
  locationAddressCoordinates: {},
});

export const LocationDetailsCard = () => {
  const {updatePreviewMode} = React.useContext(PreviewModeContext);
  const {isDataReady, placeData} = React.useContext(PlaceDetailContext);
  const {isDataReady: isRouteReady, isRouteFoundRef} =
    React.useContext(PlaceRouteContext);

  if (isDataReady && placeData) {
    const {
      previewImageReference,
      placeTitle: {placeName, placeType},
      locationDetails: {address},
    } = placeData.current!;

    const locationDetailContainerStyle = previewImageReference
      ? styles.locationDetailContainerFull
      : styles.locationDetailContainerHalf;

    return (
      <>
        <View style={locationDetailContainerStyle}>
          <PreviewImage reference={previewImageReference} />
          <View style={styles.locationDetail}>
            <View style={styles.locationTitle}>
              <Text style={styles.locationName}>{placeName}</Text>
              <Text style={styles.locationType}>{placeType}</Text>
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                if (!isRouteReady) {
                  ToastAndroid.show('requesting route, please wait', 500);
                } else if (!isRouteFoundRef?.current) {
                  ToastAndroid.show("Route not found, we're sorry", 500);
                } else {
                  updatePreviewMode('route');
                }
              }}>
              <View style={styles.routeButton}>
                <View style={styles.routeIcon}>
                  <FontAwesomeIcon size={20} icon={faRoute} />
                </View>
                <Text style={styles.routeText}>Routing Now</Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.locationAddress}>
              <View style={styles.addressIcon}>
                <FontAwesomeIcon size={30} icon={faLocationDot} />
              </View>
              <View style={styles.locationAddressDetail}>
                <Text style={styles.locationAddressComplete}>{address}</Text>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }

  return <></>;
};
