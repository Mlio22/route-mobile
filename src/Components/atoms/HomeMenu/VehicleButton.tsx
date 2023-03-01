import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {VehicleContext} from '../../context/UserSettings/VehicleContext';
import {ThemeContext} from '../../context/UserSettings/ThemeContext';
import {ThemeType} from '../../../types/components/atoms/HomeMenuChildren/ThemeButton';

type VehicleIconProps = {
  theme: ThemeType;
};

const CarIcon = (props: VehicleIconProps) => {
  return (
    <Svg width={30} height={30} fill="none">
      <Path
        d="m27.95 7.885-2.608-5.577C24.596.962 23.292 0 21.802 0H8.011c-1.49 0-2.795.962-3.54 2.308L1.863 7.885C.745 8.077 0 9.038 0 10v6.73c0 1.155.745 2.116 1.863 2.308v3.847c0 1.153.932 2.115 2.05 2.115H5.59c.932 0 1.863-.962 1.863-2.115V19.23H22.36v3.654c0 1.153.932 2.115 2.05 2.115h1.677c1.118 0 2.05-.962 2.05-2.115v-3.847C29.255 18.846 30 17.886 30 16.732V10c-.186-.962-.932-1.923-2.05-2.115ZM7.453 12.308c0 .577-.559 1.153-1.118 1.153H2.981c-.559 0-1.118-.576-1.118-1.153v-1.539c0-.577.56-1.154 1.118-1.154h3.354c.56 0 1.118.577 1.118 1.154v1.539Zm11.18 5H11.18v-1.923h7.454v1.923ZM3.914 7.692l2.236-4.615c.373-.77 1.118-1.154 1.863-1.154h13.79c.745 0 1.49.385 1.863 1.154L25.9 7.692H3.913Zm24.037 4.616c0 .577-.559 1.153-1.118 1.153h-3.354c-.559 0-1.118-.576-1.118-1.153v-1.539c0-.577.56-1.154 1.118-1.154h3.354c.56 0 1.118.577 1.118 1.154v1.539Z"
        fill="#000"
      />
    </Svg>
  );
};

const MotorCycleIcon = (props: VehicleIconProps) => {
  return (
    <Svg width={30} height={30} viewBox="0 0 20 30" fill="none">
      <Path
        d="M13.619 5.66c.476-.437.762-.999.762-1.623 0-.374-.095-.686-.286-.998l4.095-1.873c.477-.187.572-.561.286-.873-.285-.313-.857-.375-1.333-.188l-4.095 1.873c-.762-.5-1.81-.812-3.048-.812a6.06 6.06 0 0 0-3.048.812L2.857.105C2.381-.082 1.81-.02 1.524.293c-.286.312-.19.686.286.873L5.905 3.04c-.19.312-.286.624-.286.998 0 .624.286 1.124.762 1.623C2.761 5.91 0 7.907 0 10.278v11.11c0 2.059 2 3.806 4.857 4.43v-3.682c0-1.872 2.286-3.308 5.143-3.308 2.857 0 5.143 1.498 5.143 3.308v3.683C18 25.194 20 23.447 20 21.386V10.278c0-2.434-2.762-4.368-6.381-4.618Zm1.714 5.055c-1.81 2.06-3.524 3.12-5.428 3.12H9.81c-1.81-.062-3.524-1.06-5.048-3.12-.19-.187-.095-.437.095-.624s.476-.312.762-.312h8.857c.381 0 .667.125.857.312.19.187.19.437 0 .624Z"
        fill="#000"
      />
      <Path
        d="M10.095 20.014c-1.714 0-3.143.936-3.143 2.06v5.804c0 1.186 1.429 2.122 3.143 2.122 1.714 0 3.143-.936 3.143-2.122v-5.804c0-1.124-1.428-2.06-3.143-2.06Z"
        fill="#000"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    backgroundColor: '#2EC08C',
    textAlign: 'center',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 17,
    borderRadius: 10,
    elevation: 5,
    // alignItems: 'flex-start',
  },

  menuText: {textAlign: 'center', marginTop: 5, fontWeight: '400'},
});

const VehicleIcon = () => {
  const {vehicleType, toggleVehicleType} = React.useContext(VehicleContext);
  const [vehicleState, setVehicleState] = React.useState(vehicleType.current!);

  // todo: hubungkan juga dengan theme context
  const {theme} = React.useContext(ThemeContext);

  let icon;

  const iconProps = {
    theme,
  };

  if (vehicleState === 'car') {
    icon = <CarIcon {...iconProps} />;
  } else {
    icon = <MotorCycleIcon {...iconProps} />;
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        toggleVehicleType();
        setVehicleState(vehicleType.current!);
      }}>
      <View style={styles.menuButton}>{icon}</View>
    </TouchableWithoutFeedback>
  );
};

export const VehicleButton = () => {
  return (
    <View>
      <VehicleIcon />
      <Text style={styles.menuText}>Vehicle</Text>
    </View>
  );
};
