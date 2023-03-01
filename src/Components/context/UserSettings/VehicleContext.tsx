import React from 'react';
import {ChildrenProp} from '../../../types/Home';
import {VehicleType} from '../../../types/components/atoms/HomeMenuChildren/VehicleButton';
import {VehicleContextDefaultType} from '../../../types/components/context/UserSettings/VehicleContext';

const contextDefaultValue: VehicleContextDefaultType = {
  vehicleType: null as unknown as React.RefObject<VehicleType>,
  toggleVehicleType: () => {},
};

export const VehicleContext = React.createContext(contextDefaultValue);

export const VehicleContextProvider = (props: ChildrenProp) => {
  const vehicleType = React.useRef<VehicleType>('car');

  const toggleVehicleType = () => {
    if (vehicleType.current === 'car') {
      vehicleType.current = 'motorcycle';
    } else {
      vehicleType.current = 'car';
    }
  };

  const vehicleContextObj: VehicleContextDefaultType = {
    vehicleType,
    toggleVehicleType,
  };

  return (
    <VehicleContext.Provider value={vehicleContextObj}>
      {props.children}
    </VehicleContext.Provider>
  );
};
