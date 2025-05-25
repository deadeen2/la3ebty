import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  useColorScheme,
  RefreshControl,
  Modal,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { MapPin, User, Calendar, Star } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { sampleEvents, sampleNearbyPlayers } from '@/data/mockData';
import EventCard from '@/components/EventCard';
import PlayerCard from '@/components/PlayerCard';
import MapView from '@/components/MapView';

export default function HomeScreen() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [refreshing, setRefreshing] = useState(false);
  const [featuredEvents, setFeaturedEvents] = useState(sampleEvents.slice(0, 5));
  const [nearbyPlayers, setNearbyPlayers] = useState(sampleNearbyPlayers);
  const [showFullMap, setShowFullMap] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // In a real app, you would fetch fresh data here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[isDark ? 'dark' : 'light'].background,
    },
    headerContainer: {
      backgroundColor: Colors[isDark ? 'dark' : 'light'].primary,
      paddingTop: 60,
      paddingBottom: 20,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    header: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
    headerSubtitle: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: 16,
      marginTop: 5,
    },
    section: {
      marginTop: 20,
      paddingHorizontal: 16,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors[isDark ? 'dark' : 'light'].text,
    },
    seeAll: {
      color: Colors[isDark ? 'dark' : 'light'].primary,
      fontSize: 14,
    },
    mapContainer: {
      height: 200,
      borderRadius: 12,
      overflow: 'hidden',
      marginTop: 10,
    },
    horizontalList: {
      paddingRight: 16,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: Colors[isDark ? 'dark' : 'light'].background,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{t('welcome')}</Text>
          <Text style={styles.headerSubtitle}>{t('findNearbyMatches')}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('upcomingEvents')}</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>{t('seeAll')}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
            {featuredEvents.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('nearbyActivities')}</Text>
            <TouchableOpacity onPress={() => setShowFullMap(true)}>
              <Text style={styles.seeAll}>{t('viewMap')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mapContainer}>
            <MapView events={featuredEvents} />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('playersNearYou')}</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>{t('seeAll')}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
            {nearbyPlayers.map((player, index) => (
              <PlayerCard key={index} player={player} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <Modal
        visible={showFullMap}
        animationType="slide"
        onRequestClose={() => setShowFullMap(false)}
      >
        <View style={styles.modalContainer}>
          <MapView
            events={sampleEvents}
            fullScreen
            onClose={() => setShowFullMap(false)}
          />
        </View>
      </Modal>
    </View>
  );
}