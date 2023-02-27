import React from 'react';
import {TargetMarker} from '../Components/molecules/TargetMarker';
import {LocationMap} from '../Components/organisms/LocationMap';
import {LocationDetailsContextProvider} from '../Components/context/LocationDetailContext';
import {LocationDetailsUI} from '../Components/organisms/LocationDetailsUI';
import {LocationDetailsProps} from '../types/App';

const LocationDetails = (props: LocationDetailsProps) => {
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

export default LocationDetails;
