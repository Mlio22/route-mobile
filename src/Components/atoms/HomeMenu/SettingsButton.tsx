import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Svg, {Defs, Image, Path, Pattern, Use} from 'react-native-svg';

const styles = StyleSheet.create({
  menuButton: {
    backgroundColor: '#2EC08C',
    padding: 10,
    marginHorizontal: 17,
    borderRadius: 10,
    elevation: 5,
    // alignItems: 'flex-start',
  },

  menuText: {textAlign: 'center', marginTop: 5, fontWeight: '400'},
});

const SettingsIcon = () => {
  return (
    <Svg width={30} height={30} fill="none">
      <Path fill="url(#a)" d="M0 0h30v30H0z" />
      <Defs>
        <Pattern
          id="a"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}>
          <Use xlinkHref="#b" transform="scale(.00195)" />
        </Pattern>
        <Image
          id="b"
          width={512}
          height={512}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};

export const SettingsButton = () => {
  // todo: hubungkan dengan theme context

  return (
    <TouchableOpacity>
      <View style={styles.menuButton}>
        <SettingsIcon />
      </View>
      <Text style={styles.menuText}>Settings</Text>
    </TouchableOpacity>
  );
};
