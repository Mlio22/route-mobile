import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LocationDetailsProps} from '../../App';
import {BasicMap} from '../Components/molecules/BasicMap';
import {TargetMarker} from '../Components/molecules/TargetMarker';
import {LocationDetailsCard} from '../Components/organisms/LocationDetailsCard';

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: '80%',
  },
});

export default class LocationDetails extends React.Component<LocationDetailsProps> {
  constructor(props: LocationDetailsProps) {
    super(props);
  }

  render(): React.ReactNode {
    const targetCoordinates = [107.604791, -6.934023];

    return (
      <>
        <View style={styles.mapContainer}>
          <BasicMap centerCoordinates={targetCoordinates}>
            <TargetMarker coordinates={targetCoordinates} />
          </BasicMap>
        </View>
        <LocationDetailsCard />
      </>
    );
  }
}
