import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { MapPin, Calendar, Users, Clock } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface EventProps {
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

export default function EventListItem({ event }: EventProps) {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors[colorScheme ?? 'light'].cardBackground || Colors[colorScheme ?? 'light'].background,
      borderRadius: 12,
      marginBottom: 16,
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
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors[colorScheme ?? 'light'].text,
      marginBottom: 10,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    detailText: {
      marginLeft: 8,
      color: Colors[colorScheme ?? 'light'].textSecondary,
      fontSize: 14,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
    },
    button: {
      flex: 1,
      paddingVertical: 8,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      marginHorizontal: 4,
    },
    primaryButton: {
      backgroundColor: Colors[colorScheme ?? 'light'].primary,
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: Colors[colorScheme ?? 'light'].primary,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: '600',
    },
    primaryButtonText: {
      color: '#fff',
    },
    secondaryButtonText: {
      color: Colors[colorScheme ?? 'light'].primary,
    },
    participantsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    participantsText: {
      color: Colors[colorScheme ?? 'light'].textSecondary,
      fontSize: 14,
      marginLeft: 8,
    },
    availabilityText: {
      fontSize: 14,
      fontWeight: '500',
      color: 
        event.participantsCount >= event.maxParticipants 
        ? '#f44336' 
        : event.participantsCount >= event.maxParticipants * 0.8 
          ? '#ff9800' 
          : '#4caf50',
      marginLeft: 'auto',
    },
  });

  return (
    <View style={styles.container}>
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
        <Text style={styles.title}>{event.title}</Text>
        
        <View style={styles.detailRow}>
          <Calendar size={16} color={Colors[colorScheme ?? 'light'].textSecondary} />
          <Text style={styles.detailText}>
            {event.date} · {event.time}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <MapPin size={16} color={Colors[colorScheme ?? 'light'].textSecondary} />
          <Text style={styles.detailText}>
            {event.location} · {event.distance}
          </Text>
        </View>
        
        <View style={styles.participantsContainer}>
          <Users size={16} color={Colors[colorScheme ?? 'light'].textSecondary} />
          <Text style={styles.participantsText}>
            {event.participantsCount}/{event.maxParticipants} {t('participants')}
          </Text>
          <Text style={styles.availabilityText}>
            {event.participantsCount >= event.maxParticipants 
              ? t('full') 
              : event.participantsCount >= event.maxParticipants * 0.8 
                ? t('almostFull') 
                : t('available')}
          </Text>
        </View>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.primaryButton]}>
            <Text style={[styles.buttonText, styles.primaryButtonText]}>{t('join')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>{t('details')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}