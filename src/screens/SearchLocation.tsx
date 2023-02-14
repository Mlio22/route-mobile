import React from 'react';
import {StyleSheet} from 'react-native';
import {SearchLocationProps} from '../../App';
import {HideKeyboard} from '../Components/atoms/HideKeyboard';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteProps,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';

import {BackButton} from '../Components/atoms/search/BackButton';
import {ClearSearchButton} from '../Components/atoms/search/ClearSearch';
import {SearchResultItem} from '../Components/atoms/search/SearchResultItem';

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

export class SearchLocation extends React.Component<SearchLocationProps> {
  autoRef: React.RefObject<GooglePlacesAutocompleteRef>;

  constructor(props: SearchLocationProps) {
    super(props);

    this.autoRef = React.createRef<GooglePlacesAutocompleteRef>();
  }

  render(): React.ReactNode {
    const GOOGLE_PLACES_API_KEY = 'AIzaSyCjpcDm8TzqStHV2YMsPzIlnHUy8W5zDFo';
    const query = {
      key: GOOGLE_PLACES_API_KEY,
      language: 'id', // language of the results
    };

    const autoCompleteProps: GooglePlacesAutocompleteProps = {
      query,
      styles,
      placeholder: 'Search Place',
      onPress: (data, details) => console.log(data, details),
      onFail: error => console.log(error),
      onNotFound: () => console.log('no results'),
      renderLeftButton: () => <BackButton navigation={this.props.navigation} />,
      renderRightButton: () => <ClearSearchButton autoRef={this.autoRef} />,
      renderRow: data => <SearchResultItem data={data} />,
    };

    return (
      <HideKeyboard>
        <GooglePlacesAutocomplete ref={this.autoRef} {...autoCompleteProps} />
      </HideKeyboard>
    );
  }
}

export type BackButtonProps = {
  navigation: SearchLocationProps['navigation'];
};

export type ClearSearchButtonProps = {
  autoRef: React.RefObject<GooglePlacesAutocompleteRef>;
};

export default SearchLocation;
