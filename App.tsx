import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {mapboxSetup} from './src/utils/mapbox';

import Home from './src/screens/Home';
import SearchLocation from './src/screens/SearchLocation';

import {
  UserLocationContext,
  UserLocationContextType,
  locationInfo,
} from './src/Components/context/UserLocationContext';

// setup for mapbox
mapboxSetup();

type RootStackParamList = {
  Home: undefined;
  SearchLocation: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default function App() {
  const [locationInfo, updateLocationInfo] = React.useState<locationInfo>({
    isShown: false,
    coordinates: {
      longitude: 0,
      latitude: 0,
    },
  });

  const updateInfo = (newInfo: locationInfo) => {
    updateLocationInfo(newInfo);
  };

  const locationInfoObj: UserLocationContextType = {
    locationInfo,
    updateInfo,
  };

  return (
    <UserLocationContext.Provider value={locationInfoObj}>
      <MyStack />
    </UserLocationContext.Provider>
  );
}

export type SearchLocationProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchLocation'
>;
export type HomeStackProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
