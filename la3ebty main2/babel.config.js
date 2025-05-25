module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
      'expo-router/babel',
      
      // Optional: for react-native-reanimated (if used)
      'react-native-reanimated/plugin',
    ],
  };
};