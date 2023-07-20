type latLng = {
  latitude: number;
  longitude: number;
};

type point = {
  x: number;
  y: number;
};

type tilePoint = point & {
  z: number;
};

const MERCATOR = {
  fromLatLngToPoint: function (latLng: latLng) {
    var siny = Math.min(
      Math.max(Math.sin(latLng.latitude * (Math.PI / 180)), -0.9999),
      0.9999,
    );
    return {
      x: 128 + latLng.longitude * (256 / 360),
      y: 128 + 0.5 * Math.log((1 + siny) / (1 - siny)) * -(256 / (2 * Math.PI)),
    };
  },

  fromPointToLatLng: function (point: point) {
    return {
      latitude:
        (2 * Math.atan(Math.exp((point.y - 128) / -(256 / (2 * Math.PI)))) -
          Math.PI / 2) /
        (Math.PI / 180),
      longitude: (point.x - 128) / (256 / 360),
    };
  },

  getTileAtLatLng: function (latLng: latLng, zoom: number) {
    var t = Math.pow(2, zoom),
      s = 256 / t,
      p = this.fromLatLngToPoint(latLng);
    return {x: Math.floor(p.x / s), y: Math.floor(p.y / s), z: zoom};
  },

  getTileBounds: function (tile: tilePoint) {
    tile = this.normalizeTile(tile);
    var t = Math.pow(2, tile.z),
      s = 256 / t,
      sw = {x: tile.x * s, y: tile.y * s + s},
      ne = {x: tile.x * s + s, y: tile.y * s};
    return {sw: this.fromPointToLatLng(sw), ne: this.fromPointToLatLng(ne)};
  },
  normalizeTile: function (tile: tilePoint) {
    var t = Math.pow(2, tile.z);
    tile.x = ((tile.x % t) + t) % t;
    tile.y = ((tile.y % t) + t) % t;
    return tile;
  },
  coordinate_to_tile_start: function (
    latitude: number,
    longitude: number,
    zoom: number,
  ) {
    const lat_rad = (latitude * Math.PI) / 180.0;
    const n = Math.pow(2, zoom);
    const x_tile = n * ((longitude + 180) / 360.0);
    const y_tile =
      (n *
        (1 - Math.log(Math.tan(lat_rad) + 1 / Math.cos(lat_rad)) / Math.PI)) /
      2.0;

    return [Math.floor(x_tile), Math.floor(y_tile)];
  },
  coordinate_to_tile_end: function (
    latitude: number,
    longitude: number,
    zoom: number,
  ) {
    const lat_rad = (latitude * Math.PI) / 180.0;
    const n = Math.pow(2, zoom);
    const x_tile = n * ((longitude + 180) / 360.0);
    const y_tile =
      (n *
        (1 - Math.log(Math.tan(lat_rad) + 1 / Math.cos(lat_rad)) / Math.PI)) /
      2.0;

    return [Math.ceil(x_tile), Math.ceil(y_tile)];
  },
  build_tile_region: function (
    lat_start: number,
    lon_start: number,
    lat_end: number,
    lon_end: number,
    zoom: number,
  ) {
    const [x_start, y_start] = this.coordinate_to_tile_start(
      lat_start,
      lon_start,
      zoom,
    );
    const [x_end, y_end] = this.coordinate_to_tile_end(lat_end, lon_end, zoom);

    return {
      x_start,
      x_end,
      y_start,
      y_end,
    };
  },
};

export default MERCATOR;
