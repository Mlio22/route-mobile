import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faLocationArrow,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import {SearchContext} from '../../context/SearchContext';
import {PlaceRouteContext} from '../../context/locationDetails/PlaceRouteContext';

const styles = StyleSheet.create({
  routeSummaryContainer: {
    position: 'absolute',
    margin: 20,
    backgroundColor: '#FFFFFFEB',
    borderRadius: 20,
    elevation: 5,
    width: '90%',
  },
  markersContainer: {
    padding: 15,
  },
  marker: {
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
  },
  iconContainer: {
    marginRight: 15,
    justifyContent: 'center',
    width: 10,
  },
  placeNameContainer: {
    flex: 1,
  },
  placeNameInput: {
    color: 'black',
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  summaryDetailsContainer: {
    padding: 5,
    paddingBottom: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  estimatedTime: {
    textAlign: 'center',
    color: 'black',
    flex: 1,
  },
  distance: {
    color: 'black',
    flex: 1,
    textAlign: 'center',
  },
});

export const RouteSummary = () => {
  const {searchInfo} = React.useContext(SearchContext);
  const {isDataReady, routeSummaryRef} = React.useContext(PlaceRouteContext);

  if (!isDataReady) {
    return <></>;
  }

  const {distance, duration} = routeSummaryRef?.current!;

  return (
    <View style={styles.routeSummaryContainer}>
      <View style={styles.markersContainer}>
        <View style={styles.marker}>
          <View style={styles.iconContainer}>
            <FontAwesomeIcon size={20} icon={faLocationArrow} />
          </View>
          <View style={styles.placeNameContainer}>
            <Text style={styles.placeNameInput}>Your Location</Text>
          </View>
        </View>
        <View style={styles.marker}>
          <View style={styles.iconContainer}>
            <FontAwesomeIcon size={20} icon={faLocationDot} />
          </View>
          <View style={styles.placeNameContainer}>
            <Text style={styles.placeNameInput}>{searchInfo.searchQuery}</Text>
          </View>
        </View>
      </View>
      <View style={styles.summaryDetailsContainer}>
        <Text style={styles.distance}>Distance: {distance.text}</Text>
        <Text style={styles.estimatedTime}>
          Estimated Time: {duration.text}
        </Text>
      </View>
    </View>
  );
};
