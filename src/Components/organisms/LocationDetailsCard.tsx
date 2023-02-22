import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLocationDot, faRoute} from '@fortawesome/free-solid-svg-icons';
import {PreviewImage} from '../atoms/details/PreviewImage';
import {SearchContext} from '../context/SearchContext';

const GOOGLE_PLACES_API_KEY = 'AIzaSyCjpcDm8TzqStHV2YMsPzIlnHUy8W5zDFo';

const styles = StyleSheet.create({
  locationDetailContainer: {
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
  locationPreviewImage: {
    height: '40%',
  },
  locationImage: {
    width: '100%',
    height: '100%',
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

type locationDetailsCardProps = {
  
};

type placeDataType = {
  previewImageReference: string;
  placeTitle: {
    placeName: string;
    placeType: string;
  };
  locationDetails: {
    address: string;
  };
};

function extractData(jsonResponse: any): placeDataType {
  const {photos, formatted_address, name, types} = jsonResponse;

  const result: placeDataType = {
    previewImageReference: photos[0].photo_reference,
    placeTitle: {
      placeName: name,
      placeType: types[0],
    },
    locationDetails: {
      address: formatted_address,
    },
  };

  return result;
}

export const LocationDetailsCard = (props: locationDetailsCardProps) => {
  const {searchInfo} = React.useContext(SearchContext);

  const [placeData, updatePlaceData] = React.useState<placeDataType>();
  const placeId = searchInfo.selectedPlaceId;

  React.useEffect(() => {
    async function getPlaceData() {
      const API_URL = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GOOGLE_PLACES_API_KEY}`;

      const response = await fetch(API_URL, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        }),
        responseJSON = await response.json();

      updatePlaceData(extractData(responseJSON.result));
    }

    getPlaceData();
  }, [placeId]);

  return (
    <>
      {placeData && (
        <View style={styles.locationDetailContainer}>
          <PreviewImage reference={placeData.previewImageReference} />
          <View style={styles.locationDetail}>
            <View style={styles.locationTitle}>
              <Text style={styles.locationName}>
                {placeData.placeTitle.placeName}
              </Text>
              <Text style={styles.locationType}>
                {placeData.placeTitle.placeType}
              </Text>
            </View>
            <TouchableWithoutFeedback>
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
                <Text style={styles.locationAddressComplete}>
                  {placeData.locationDetails.address}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};
