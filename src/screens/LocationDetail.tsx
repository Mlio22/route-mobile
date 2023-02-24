import React from 'react';
import {TargetMarker} from '../Components/molecules/TargetMarker';
import {RouteMap} from '../Components/organisms/RouteMap';
import {LocationDetailsContextProvider} from '../Components/context/LocationDetailContext';
import {LocationDetailsUI} from '../Components/organisms/LocationDetailsUI';
import {LocationDetailsProps} from '../../App';

const LocationDetails = (props: LocationDetailsProps) => {
  const {selectedPlaceId} = props.route.params;

  return (
    <LocationDetailsContextProvider placeId={selectedPlaceId}>
      <RouteMap>
        <TargetMarker />
      </RouteMap>

      <LocationDetailsUI />
    </LocationDetailsContextProvider>
  );
};

export default LocationDetails;
