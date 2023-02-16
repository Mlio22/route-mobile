import React from 'react';
import {View} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons/';

export const TargetMarkerIcon: React.FunctionComponent = () => {
  return (
    <View>
      <FontAwesomeIcon color="#ff3f3f" size={40} icon={faLocationDot} />
    </View>
  );
};
