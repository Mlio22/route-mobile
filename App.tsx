import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {mapboxSetup} from './src/utils/mapbox';

import Home from './src/screens/Home';
import SearchLocation from './src/screens/SearchLocation';

import {UserLocationContextProvider} from './src/Components/context/UserLocationContext';
import LocationDetails from './src/screens/LocationDetail';
import {SearchContextProvider} from './src/Components/context/SearchContext';

// setup for mapbox
mapboxSetup();

type RootStackParamList = {
  Home: undefined;
  SearchLocation: undefined;
  LocationDetails: undefined;
};

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

export type SearchLocationProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchLocation'
>;
export type HomeStackProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type LocationDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'LocationDetails'
>;
