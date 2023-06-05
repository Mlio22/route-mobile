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
import {LocationDetailsProps} from '../types/App';
import {BasicMap} from '../Components/molecules/BasicMap';

const styles = StyleSheet.create({
    
})  

const manuallocation = (props:any) => {
    const {selectedPlaceId} = props.route.params;
    
    return (
        <LocationDetailsContextProvider placeId={selectedPlaceId}>
          <LocationMap>
            <TargetMarker />
          </LocationMap>
    
          <LocationDetailsUI />
        </LocationDetailsContextProvider>
      );
};
