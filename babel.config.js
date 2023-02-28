module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: ['GOOGLE_API_TOKEN', 'MAPBOX_API_TOKEN'],
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
