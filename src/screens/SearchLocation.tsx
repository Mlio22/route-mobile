import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {SearchLocationProps} from '../../App';
import {HideKeyboard} from '../Components/atoms/HideKeyboard';
import {
  AutocompleteRequestType,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteProps,
  GooglePlacesAutocompleteRef,
  Query,
} from 'react-native-google-places-autocomplete';

import {BackButton} from '../Components/atoms/search/BackButton';
import {ClearSearchButton} from '../Components/atoms/search/ClearSearch';
import {SearchResultItem} from '../Components/atoms/search/SearchResultItem';
import {UserLocationContext} from '../Components/context/UserLocationContext';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    margin: 'auto',
    height: '100%',
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  textInputContainer: {
    marginTop: 20,
    width: '95%',
    paddingHorizontal: 10,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderRadius: 15,
    flexDirection: 'row',
    height: 50,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    color: 'black',
    padding: 0,
  },
  row: {
    marginTop: 10,
    width: '100%',
    padding: 10,
  },
  poweredContainer: {
    display: 'none',
  },
  separator: {
    backgroundColor: 'transparent',
  },
});

const GOOGLE_PLACES_API_KEY = 'AIzaSyCjpcDm8TzqStHV2YMsPzIlnHUy8W5zDFo';
let query: Query<AutocompleteRequestType> = {
  key: GOOGLE_PLACES_API_KEY,
  language: 'id', // language of the results
};

export const SearchLocation = (props: SearchLocationProps) => {
  const {locationInfo} = useContext(UserLocationContext);

  if (locationInfo.isShown) {
    const {latitude, longitude} = locationInfo.coordinates;

    query = {
      ...query,
      location: `${latitude}, ${longitude}`,
      radius: 1000,
      components: 'country:id',
      rankby: 'distance',
    };
  }

  const autoRef = React.createRef<GooglePlacesAutocompleteRef>();
  const autoProps: GooglePlacesAutocompleteProps = {
    styles,
    placeholder: 'Search Place',
    query: query,
    onPress: (data, details) => console.log(data, details),
    onFail: error => console.log(error),
    onNotFound: () => console.log('no results'),
    renderLeftButton: () => <BackButton navigation={props.navigation} />,
    renderRightButton: () => <ClearSearchButton autoRef={autoRef} />,
    renderRow: data => <SearchResultItem data={data} />,

    textInputProps: {
      autoFocus: true,
    },
  };

  return (
    <HideKeyboard>
      <GooglePlacesAutocomplete ref={autoRef} {...autoProps} />
    </HideKeyboard>
  );
};

export type BackButtonProps = {
  navigation: SearchLocationProps['navigation'];
};

export type ClearSearchButtonProps = {
  autoRef: React.RefObject<GooglePlacesAutocompleteRef>;
};

export default SearchLocation;
