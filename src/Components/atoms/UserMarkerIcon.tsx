import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import CompassHeading from 'react-native-compass-heading';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLocationArrow} from '@fortawesome/free-solid-svg-icons/';

export const UserMarkerIcon: React.FunctionComponent = () => {
  const [compassHeading, setCompassHeading] = useState(0);

  useEffect(() => {
    const degree_update_rate = 3;

    CompassHeading.start(degree_update_rate, ({heading}) => {
      setCompassHeading(heading);
    });

    return () => {
      CompassHeading.stop();
    };
  }, []);

  return (
    <View style={{transform: [{rotate: `${compassHeading}deg`}]}}>
      <FontAwesomeIcon size={28} icon={faLocationArrow} />
    </View>
  );
};
