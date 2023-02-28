import React from 'react';
import {ChildrenProp} from '../../../types/Home';
import {VehicleType} from '../../atoms/HomeMenu/VehicleButton';

type VehicleContextType = {
  vehicleType: React.RefObject<VehicleType>;
  toggleVehicleType: () => void;
};

const contextDefaultValue: VehicleContextType = {
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

  const vehicleContextObj: VehicleContextType = {
    vehicleType,
    toggleVehicleType,
  };

  return (
    <VehicleContext.Provider value={vehicleContextObj}>
      {props.children}
    </VehicleContext.Provider>
  );
};
