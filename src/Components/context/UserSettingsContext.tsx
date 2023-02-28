import React from 'react';
import {ThemeContextProvider} from './UserSettings/ThemeContext';
import {VehicleContextProvider} from './UserSettings/VehicleContext';

export const UserSettingsContextProvider = (props: any) => {
  return (
    <ThemeContextProvider>
      <VehicleContextProvider>{props.children}</VehicleContextProvider>
    </ThemeContextProvider>
  );
};
