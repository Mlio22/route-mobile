import MapboxGL, {Logger} from '@rnmapbox/maps';
import {MAPBOX_API_TOKEN} from '@env';

export const mapboxSetup = () => {
  MapboxGL.locationManager.start(1);
  MapboxGL.setConnected(true);
  MapboxGL.setWellKnownTileServer('Mapbox');
  MapboxGL.setAccessToken(MAPBOX_API_TOKEN);

  // edit logging messages
  Logger.setLogCallback(log => {
    const {message} = log;

    // expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
    if (
      message.match('Request failed due to a permanent error: Canceled') ||
      message.match('Request failed due to a permanent error: Socket Closed')
    ) {
      return true;
    }
    return false;
  });
};
