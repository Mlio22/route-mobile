import React from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {SearchContext} from '../../context/SearchContext';
import ICONS from '../../../images';

const styles = StyleSheet.create({
  searchBarContainer: {
    position: 'absolute',
    top: 20,
    width: '90%',
    paddingHorizontal: 20,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderRadius: 15,
    flexDirection: 'row',
    height: 50,
    borderColor: '#a1a1a1',
    borderWidth: 2,
  },

  searchBar: {
    color: 'black',
    width: '90%',
  },

  searchIcon: {
    width: 20,
    height: 20,
    alignItems: 'flex-end',
  },
});

const FakeSearchBar = (props: any) => {
  const navigation = props.navigation;
  const {searchInfo, clearSearch} = React.useContext(SearchContext);

  return (
    <TouchableWithoutFeedback
      onPressIn={() => {
        navigation.navigate('SearchLocation');
        clearSearch();
      }}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          editable={false}
          placeholderTextColor={'#959595'}
          placeholder="Universitas Telkom"
          value={searchInfo.searchQuery}
        />
        <Image style={styles.searchIcon} source={ICONS.SEARCH} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FakeSearchBar;
