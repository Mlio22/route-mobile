import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
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
import {SearchContext} from '../Components/context/SearchContext';
import {SearchLocationProps} from '../types/App';

import {GOOGLE_API_TOKEN} from '@env';

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

let query: Query<AutocompleteRequestType> = {
  key: GOOGLE_API_TOKEN,
  language: 'id', // language of the results
};

export const SearchLocation = (props: SearchLocationProps) => {
  const {isEnabled, userCoordinates} = useContext(UserLocationContext);
  const {searchInfo, updateInfo, clearSearch} = useContext(SearchContext);

  let isSearchAutoFilled = false;

  if (isEnabled.current) {
    const {latitude, longitude} = userCoordinates.current!;

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
    placeholder: 'Telkom University',
    query: query,
    onPress: async data => {
      const {
        structured_formatting: {main_text},
        place_id,
      } = data;

      autoRef.current?.setAddressText(main_text);
      updateInfo({
        searchQuery: main_text,
        selectedPlaceId: place_id,
      });

      props.navigation.navigate('LocationDetails', {selectedPlaceId: place_id});
    },
    onFail: error => console.log(error),
    onNotFound: () => console.log('no results'),
    renderLeftButton: () => <BackButton navigation={props.navigation} />,
    renderRightButton: () => (
      <ClearSearchButton autoRef={autoRef} clearSearch={clearSearch} />
    ),
    renderRow: data => <SearchResultItem data={data} />,
    keepResultsAfterBlur: true,

    textInputProps: {
      autoFocus: true,
      onFocus: () => {
        if (!isSearchAutoFilled) {
          autoRef.current?.setAddressText(searchInfo.searchQuery!);
          isSearchAutoFilled = true;
        }
      },
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
  clearSearch: () => void;
};

export default SearchLocation;
