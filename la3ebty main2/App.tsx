import 'react-native-url-polyfill/auto';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';
import { ExpoRoot } from 'expo-router';
import './i18n'; // Initialize i18n

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    // Hide the splash screen when the app is ready
    SplashScreen.hideAsync();
  }, []);

  return <ExpoRoot />;
}