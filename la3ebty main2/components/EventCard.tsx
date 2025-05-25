import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { MapPin, Calendar, Users } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import Colors from '@/constants/Colors';

interface EventCardProps {
  event: {
    id: number;
    title: string;
    sport: string;
    image: string;
    location: string;
    distance: string;
    date: string;
    time: string;
    participantsCount: number;
    maxParticipants: number;
    cost: number | null;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const cardWidth = Dimensions.get('window').width * 0.75;

  const styles = StyleSheet.create({
    container: {
      width: cardWidth,
      backgroundColor: Colors[colorScheme ?? 'light'].cardBackground || Colors[colorScheme ?? 'light'].background,
      borderRadius: 12,
      marginRight: 16,
      overflow: 'hidden',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
    },
    imageContainer: {
      height: 150,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    sportTag: {
      position: 'absolute',
      top: 12,
      left: 12,
      backgroundColor: Colors[colorScheme ?? 'light'].primary,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
    },
    sportTagText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '600',
    },
    costTag: {
      position: 'absolute',
      top: 12,
      right: 12,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
    },
    costTagText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '600',
    },
    content: {
      padding: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors[colorScheme ?? 'light'].text,
      marginBottom: 8,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
    },
    detailText: {
      marginLeft: 6,
      color: Colors[colorScheme ?? 'light'].textSecondary,
      fontSize: 12,
    },
    participantsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    participantsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    participantsText: {
      marginLeft: 6,
      color: Colors[colorScheme ?? 'light'].textSecondary,
      fontSize: 12,
    },
    joinButton: {
      backgroundColor: Colors[colorScheme ?? 'light'].primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    },
    joinButtonText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '600',
    },
  });

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: event.image }} style={styles.image} />
        <View style={styles.sportTag}>
          <Text style={styles.sportTagText}>{event.sport}</Text>
        </View>
        {event.cost !== null && (
          <View style={styles.costTag}>
            <Text style={styles.costTagText}>
              {event.cost === 0 ? t('free') : `${event.cost} ${t('egp')}`}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{event.title}</Text>
        
        <View style={styles.detailRow}>
          <Calendar size={14} color={Colors[colorScheme ?? 'light'].textSecondary} />
          <Text style={styles.detailText} numberOfLines={1}>
            {event.date} · {event.time}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <MapPin size={14} color={Colors[colorScheme ?? 'light'].textSecondary} />
          <Text style={styles.detailText} numberOfLines={1}>
            {event.location} · {event.distance}
          </Text>
        </View>

        <View style={styles.participantsRow}>
          <View style={styles.participantsContainer}>
            <Users size={14} color={Colors[colorScheme ?? 'light'].textSecondary} />
            <Text style={styles.participantsText}>
              {event.participantsCount}/{event.maxParticipants}
            </Text>
          </View>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>{t('join')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}