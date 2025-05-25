import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';
import { MapPin, Star } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import Colors from '@/constants/Colors';

interface PlayerCardProps {
  player: {
    id: number;
    name: string;
    avatar: string;
    location: string;
    distance: string;
    rating: number;
    sports: string[];
  };
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      width: 150,
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
    avatarContainer: {
      alignItems: 'center',
      padding: 16,
      paddingBottom: 8,
    },
    avatar: {
      width: 70,
      height: 70,
      borderRadius: 35,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors[colorScheme ?? 'light'].text,
      marginTop: 8,
      textAlign: 'center',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 4,
    },
    rating: {
      marginLeft: 4,
      color: Colors[colorScheme ?? 'light'].text,
      fontSize: 14,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 4,
      paddingHorizontal: 16,
    },
    location: {
      marginLeft: 4,
      color: Colors[colorScheme ?? 'light'].textSecondary,
      fontSize: 12,
      textAlign: 'center',
    },
    sportsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 8,
      paddingHorizontal: 12,
    },
    sportTag: {
      backgroundColor: Colors[colorScheme ?? 'light'].secondaryBackground || Colors[colorScheme ?? 'light'].border,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      margin: 2,
    },
    sportTagText: {
      color: Colors[colorScheme ?? 'light'].text,
      fontSize: 10,
    },
    inviteButton: {
      backgroundColor: Colors[colorScheme ?? 'light'].primary,
      margin: 12,
      paddingVertical: 8,
      borderRadius: 8,
      alignItems: 'center',
    },
    inviteButtonText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '600',
    },
  });

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: player.avatar }} style={styles.avatar} />
        <Text style={styles.name} numberOfLines={1}>{player.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Star size={14} color="#F4D03F" />
          <Text style={styles.rating}>{player.rating}</Text>
        </View>
        
        <View style={styles.locationContainer}>
          <MapPin size={12} color={Colors[colorScheme ?? 'light'].textSecondary} />
          <Text style={styles.location} numberOfLines={1}>
            {player.distance}
          </Text>
        </View>
      </View>
      
      <View style={styles.sportsContainer}>
        {player.sports.map((sport, index) => (
          <View key={index} style={styles.sportTag}>
            <Text style={styles.sportTagText}>{sport}</Text>
          </View>
        ))}
      </View>
      
      <TouchableOpacity style={styles.inviteButton}>
        <Text style={styles.inviteButtonText}>{t('invite')}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}