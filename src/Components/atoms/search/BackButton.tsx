import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeftLong} from '@fortawesome/free-solid-svg-icons';
import {BackButtonProps} from '../../../screens/SearchLocation';

const styles = StyleSheet.create({
  backIconContainer: {
    width: 20,
    height: 20,
    padding: 17,
    backgroundColor: '#a7a7a7af',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    borderRadius: 15,
    marginRight: 10,
  },
});

export const BackButton = (props: BackButtonProps) => {
  const {navigation} = props;
  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={styles.backIconContainer}>
        <FontAwesomeIcon icon={faArrowLeftLong} />
      </View>
    </TouchableWithoutFeedback>
  );
};
