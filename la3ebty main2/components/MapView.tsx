import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useColorScheme, Platform } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import Colors from '@/constants/Colors';

interface MapProps {
  events: Array<{
    id: number;
    title: string;
    location: string;
    sport: string;
  }>;
}

export default function MapView({ events }: MapProps) {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();

  // This is a placeholder for web platforms
  // For native platforms, you would use react-native-maps
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      borderRadius: 12,
      overflow: 'hidden',
    },
    mapImageContainer: {
      width: '100%',
      height: '100%',
    },
    mapImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      zIndex: 1,
    },
    mapPins: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 2,
    },
    pin: {
      position: 'absolute',
      alignItems: 'center',
    },
    pinIcon: {
      backgroundColor: Colors[colorScheme ?? 'light'].primary,
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'white',
    },
    pinLabel: {
      color: Colors[colorScheme ?? 'light'].text,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 10,
      fontSize: 10,
      marginTop: 4,
      maxWidth: 80,
      textAlign: 'center',
    },
    cta: {
      position: 'absolute',
      bottom: 10,
      alignSelf: 'center',
      backgroundColor: 'white',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      zIndex: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    ctaText: {
      marginLeft: 8,
      color: Colors[colorScheme ?? 'light'].primary,
      fontWeight: '600',
    },
  });

  // Mock pin positions for the placeholder map
  const pinPositions = [
    { top: '20%', left: '30%' },
    { top: '50%', left: '70%' },
    { top: '35%', left: '55%' },
    { top: '70%', left: '25%' },
    { top: '60%', left: '45%' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.mapImageContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
          style={styles.mapImage}
        />
        <View style={styles.overlay} />
      </View>

      <View style={styles.mapPins}>
        {events.slice(0, 5).map((event, index) => (
          <View
            key={event.id}
            style={[
              styles.pin,
              { top: pinPositions[index].top, left: pinPositions[index].left },
            ]}
          >
            <View style={styles.pinIcon}>
              <MapPin size={18} color="white" />
            </View>
            <Text style={styles.pinLabel} numberOfLines={1}>
              {event.title}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.cta}>
        <MapPin size={16} color={Colors[colorScheme ?? 'light'].primary} />
        <Text style={styles.ctaText}>{t('viewFullMap')}</Text>
      </TouchableOpacity>
    </View>
  );
}