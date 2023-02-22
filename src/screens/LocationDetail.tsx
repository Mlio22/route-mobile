import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TargetMarker} from '../Components/molecules/TargetMarker';
import {LocationDetailsCard} from '../Components/organisms/LocationDetailsCard';
import {RouteUI} from '../Components/organisms/RouteUI';
import {SearchContext} from '../Components/context/SearchContext';
import {RouteMap} from '../Components/organisms/RouteMap';

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: '100%',
  },
});

const LocationDetails = () => {
  const routeMapRef = React.useRef() as React.RefObject<RouteMap>;
  const targetMarkerRef = React.useRef() as React.RefObject<TargetMarker>;

  const [isRouteMode, updateRouteMode] = React.useState(false);

  const {searchInfo} = React.useContext(SearchContext);
  const {coordinates, bounds} = searchInfo.selectedPlaceDetail!;

  React.useEffect(() => {
    if (isRouteMode) {
      routeMapRef.current?.boundUserAndTarget();
    } else {
      setTimeout(async () => {
        routeMapRef.current?.centerMapToTarget({
          coordinates,
          bounds,
          addPadding: true,
        });

        targetMarkerRef.current?.moveTo(coordinates);
      }, 500);
    }
  }, [bounds, coordinates, isRouteMode]);

  const routeUI = <RouteUI mapRef={routeMapRef} />;
  const detailsCard = (
    <LocationDetailsCard changeModeHandler={() => updateRouteMode(true)} />
  );

  const UIView = isRouteMode ? routeUI : detailsCard;

  return (
    <>
      <View style={styles.mapContainer}>
        <RouteMap ref={routeMapRef}>
          <TargetMarker ref={targetMarkerRef} />
        </RouteMap>
      </View>
      {UIView}
    </>
  );
};

export default LocationDetails;
