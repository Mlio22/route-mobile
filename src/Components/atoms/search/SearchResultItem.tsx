import {faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
  searchResultItem: {
    flex: 1,
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },

  placeIcon: {
    paddingHorizontal: 10,
    marginRight: 28,
    width: 20,
    height: 20,
  },

  placeDetails: {
    flex: 1,
    maxWidth: '60%',
  },

  placeName: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
    flex: 1,
    flexWrap: 'wrap',
  },

  placeAddress: {
    color: 'black',
    flexWrap: 'wrap',
    flex: 1,
  },
});

type searchResultItemProps = {
  data: {
    structured_formatting: {
      main_text: string;
      secondary_text: string;
    };
  };
};

export const SearchResultItem = (props: searchResultItemProps): JSX.Element => {
  const {
    structured_formatting: {main_text: placename, secondary_text: address},
  } = props.data;

  return (
    <View style={styles.searchResultItem}>
      <View style={styles.placeIcon}>
        <FontAwesomeIcon size={28} icon={faLocationDot} />
      </View>
      <View style={styles.placeDetails}>
        <Text style={styles.placeName}>{placename}</Text>
        <Text style={styles.placeAddress}>{address}</Text>
      </View>
    </View>
  );
};
