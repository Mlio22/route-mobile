import React, {useEffect} from 'react';
import {View} from 'react-native';

import CompassHeading from 'react-native-compass-heading';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLocationArrow} from '@fortawesome/free-solid-svg-icons/';

export const Marker: React.FunctionComponent = () => {
  const degree_update_rate = 2;

  CompassHeading.start(1, ({heading, accuracy}) => {
    console.log('abnc');
    console.log('CompassHeading: ', heading, accuracy);
  });

  return (
    <View>
      <FontAwesomeIcon icon={faLocationArrow} />
    </View>
  );
};
