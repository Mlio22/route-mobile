import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapboxGL from '@rnmapbox/maps';

import Home from './src/screens/Home';
import Pencarian1 from './src/screens/Searchbarreccomend1';

MapboxGL.setConnected(true);
MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYW5ha2JhaWstZXhlIiwiYSI6ImNsYnl4YnZkaTAzaDYzd3A3MWhrb2lqeWIifQ.JLrFLc_GxkTdET36LKjJvw',
);

export type RootStackParamList = {
  Home: undefined;
  SearchBar: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SearchBar" component={Pencarian1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
