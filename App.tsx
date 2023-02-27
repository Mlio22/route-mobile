import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {mapboxSetup} from './src/utils/mapbox';

import Home from './src/screens/Home';
import SearchLocation from './src/screens/SearchLocation';
import LocationDetails from './src/screens/LocationDetail';

import {UserLocationContextProvider} from './src/Components/context/UserLocationContext';
import {SearchContextProvider} from './src/Components/context/SearchContext';

import {RootStackParamList} from './src/types/App';

// setup for mapbox
mapboxSetup();

const Stack = createNativeStackNavigator<RootStackParamList>();

const MyStack = React.memo(() => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SearchLocation" component={SearchLocation} />
        <Stack.Screen name="LocationDetails" component={LocationDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default function App(): React.ReactNode {
  return (
    <UserLocationContextProvider>
      <SearchContextProvider>
        <MyStack />
      </SearchContextProvider>
    </UserLocationContextProvider>
  );
}
