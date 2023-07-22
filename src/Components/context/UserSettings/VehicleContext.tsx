import React from 'react';
import {ChildrenProp} from '../../../types/Home';
import {VehicleType} from '../../../types/components/atoms/HomeMenuChildren/VehicleButton';
import {VehicleContextDefaultType} from '../../../types/components/context/UserSettings/VehicleContext';
import {
  getValueFromAsyncStorage,
  saveValueToAsyncStorage,
} from '../../../storages/vehiclevalue';

const contextDefaultValue: VehicleContextDefaultType = {
  vehicleType: null as unknown as React.RefObject<VehicleType>,
  toggleVehicleType: () => {},
};

export const VehicleContext = React.createContext(contextDefaultValue);

export const VehicleContextProvider = (props: any) => {
  const vehicleType = React.useRef<VehicleType>('car');

  const toggleVehicleType = () => {
    if (vehicleType.current === 'car') {
      vehicleType.current = 'motorcycle';
    } else {
      vehicleType.current = 'car';
    }

    saveValueToAsyncStorage(vehicleType.current);
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
