import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {ClearSearchButtonProps} from '../../../screens/SearchLocation';

const styles = StyleSheet.create({
  clearIconContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginRight: 5,
  },
});

export const ClearSearchButton = (props: ClearSearchButtonProps) => {
  const {autoRef} = props;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        autoRef.current?.setAddressText('');
        autoRef.current?.focus();
      }}>
      <View style={styles.clearIconContainer}>
        <FontAwesomeIcon size={20} icon={faXmark} />
      </View>
    </TouchableWithoutFeedback>
  );
};
