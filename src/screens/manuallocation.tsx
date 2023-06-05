import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import {TargetMarker} from '../Components/molecules/TargetMarker';
import {LocationMap} from '../Components/organisms/LocationMap';
import {LocationDetailsContextProvider} from '../Components/context/LocationDetailContext';
import {LocationDetailsUI} from '../Components/organisms/LocationDetailsUI';
import {LocationDetailsProps, Manuallocationprops} from '../types/App';
import {BasicMap} from '../Components/molecules/BasicMap';

import StatusLokasiDanTujuan from '../Components/molecules/detaillocationmanual';

const styles = StyleSheet.create({
    
})  

const Manuallocation = (props:Manuallocationprops) => {
    
  return (
      <LocationDetailsContextProvider>
        <LocationMap>

        
        </LocationMap>

        <StatusLokasiDanTujuan/>
      </LocationDetailsContextProvider>
    );
};

export default Manuallocation;
