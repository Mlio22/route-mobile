import MapboxGL, {Logger} from '@rnmapbox/maps';

export const mapboxSetup = () => {
  MapboxGL.locationManager.start(1);
  MapboxGL.setConnected(true);
  MapboxGL.setWellKnownTileServer('Mapbox');
  MapboxGL.setAccessToken(
    'pk.eyJ1IjoiYW5ha2JhaWstZXhlIiwiYSI6ImNsYnl4YnZkaTAzaDYzd3A3MWhrb2lqeWIifQ.JLrFLc_GxkTdET36LKjJvw',
  );

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
