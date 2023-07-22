import React from 'react';
import {TargetMarker} from '../Components/molecules/TargetMarker';
import {LocationMap} from '../Components/organisms/LocationMap';
import {LocationDetailsContextProvider} from '../Components/context/LocationDetailContext';
import {LocationDetailsUI} from '../Components/organisms/LocationDetailsUI';
import {LocationDetailsProps} from '../types/App';
import {ThemeContext} from '../Components/context/UserSettings/ThemeContext';

const LocationDetails = (props: LocationDetailsProps) => {
  const {selectedPlaceId} = props.route.params;
  const {theme} = React.useContext(ThemeContext);

  return (
    <LocationDetailsContextProvider placeId={selectedPlaceId}>
      <LocationMap theme={theme}>
        <TargetMarker />
      </LocationMap>

      <LocationDetailsUI />
    </LocationDetailsContextProvider>
  );
};

export default LocationDetails;
