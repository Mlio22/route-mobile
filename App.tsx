import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapboxGL from '@rnmapbox/maps';



import HomeScreen from './src/screens/Home';
import Pencarian1 from './src/screens/Searchbarreccomend1';
import { SearchBar } from 'react-native-screens';

MapboxGL.setConnected(true);
MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYW5ha2JhaWstZXhlIiwiYSI6ImNsYnl4YnZkaTAzaDYzd3A3MWhrb2lqeWIifQ.JLrFLc_GxkTdET36LKjJvw',
);


const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='home' screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Home"
          component={Pencarian1}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="Searchbar1"
          component={Pencarian1}
          options={{title: 'Searchbar1'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
