import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {mapboxSetup} from './src/utils/mapbox';

import WelcomePage from './src/screens/WelcomePage';
import PreferencesVehicleFirst from './src/screens/PreferencesVehicleFirst';
import PreferencesSettingsFirst from './src/screens/PreferencesSettingsFirst';
import Home from './src/screens/Home';
import SettingsGeneral from './src/screens/SettingsGeneral';
import History from './src/screens/History';
import SearchLocation from './src/screens/SearchLocation';
import LocationDetails from './src/screens/LocationDetail';
import ManualLocation from './src/screens/ManualLocation';

import {UserLocationContextProvider} from './src/Components/context/UserLocationContext';
import {SearchContextProvider} from './src/Components/context/SearchContext';

import {RootStackParamList} from './src/types/App';
import {UserSettingsContextProvider} from './src/Components/context/UserSettingsContext';

// setup for mapbox
mapboxSetup();

const Stack = createNativeStackNavigator<RootStackParamList>();

const MyStack = React.memo(() => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomePage"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen
          name="PreferencesVehicleFirst"
          component={PreferencesVehicleFirst}
        />
        <Stack.Screen
          name="PreferencesSettingsFirst"
          component={PreferencesSettingsFirst}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SettingsGeneral" component={SettingsGeneral} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="SearchLocation" component={SearchLocation} />
        <Stack.Screen name="LocationDetails" component={LocationDetails} />
        <Stack.Screen name="ManualLocation" component={ManualLocation} />
        {/* <Stack.Screen
          name='MapScreen'
          component={MapScreen}
          /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default function App(): React.ReactNode {
  return (
    <UserSettingsContextProvider>
      <UserLocationContextProvider>
        <SearchContextProvider>
          <MyStack />
        </SearchContextProvider>
      </UserLocationContextProvider>
    </UserSettingsContextProvider>
  );
}
