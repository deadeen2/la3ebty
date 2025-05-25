import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  useColorScheme,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Plus, Trophy, Users, Star } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import CreateTeamModal from '@/components/CreateTeamModal';

// Mock data for teams
const sampleTeams = [
  {
    id: 1,
    name: 'Cairo Eagles',
    sport: 'Football',
    members: 11,
    rating: 4.5,
    wins: 12,
    losses: 3,
    image: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    name: 'Alexandria Sharks',
    sport: 'Basketball',
    members: 7,
    rating: 4.2,
    wins: 8,
    losses: 4,
    image: 'https://images.pexels.com/photos/2277981/pexels-photo-2277981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    name: 'Giza Tigers',
    sport: 'Volleyball',
    members: 8,
    rating: 3.9,
    wins: 5,
    losses: 5,
    image: 'https://images.pexels.com/photos/6542311/pexels-photo-6542311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 4,
    name: 'Delta Stars',
    sport: 'Tennis',
    members: 4,
    rating: 4.7,
    wins: 14,
    losses: 2,
    image: 'https://images.pexels.com/photos/8224057/pexels-photo-8224057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export default function TeamsScreen() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [teams, setTeams] = useState(sampleTeams);
  const [filters, setFilters] = useState({
    sport: 'all',
    rating: 0,
  });

  const handleCreateTeam = (teamData: any) => {
    // Here you would typically make an API call to create the team
    // For now, we'll just add it to the local state
    const newTeam = {
      id: teams.length + 1,
      ...teamData,
      rating: 0,
      wins: 0,
      losses: 0,
      image: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
      members: 1,
    };
    setTeams([newTeam, ...teams]);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[isDark ? 'dark' : 'light'].background,
    },
    header: {
      backgroundColor: Colors[isDark ? 'dark' : 'light'].background,
      paddingTop: 50,
      paddingBottom: 10,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: Colors[isDark ? 'dark' : 'light'].border,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors[isDark ? 'dark' : 'light'].text,
      marginBottom: 16,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    searchInput: {
      flex: 1,
      height: 40,
      backgroundColor: Colors[isDark ? 'dark' : 'light'].inputBackground,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginRight: 8,
      color: Colors[isDark ? 'dark' : 'light'].text,
    },
    filterButton: {
      backgroundColor: Colors[isDark ? 'dark' : 'light'].secondary,
      width: 40,
      height: 40,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    createButtonContainer: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: Colors[isDark ? 'dark' : 'light'].primary,
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    teamCard: {
      backgroundColor: Colors[isDark ? 'dark' : 'light'].cardBackground,
      borderRadius: 12,
      marginBottom: 16,
      overflow: 'hidden',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
    },
    teamImageContainer: {
      height: 120,
      width: '100%',
    },
    teamImage: {
      height: '100%',
      width: '100%',
      resizeMode: 'cover',
    },
    teamContent: {
      padding: 16,
    },
    teamHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    teamName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors[isDark ? 'dark' : 'light'].text,
    },
    sportTag: {
      backgroundColor: Colors[isDark ? 'dark' : 'light'].primary,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    sportTagText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '500',
    },
    teamStats: {
      flexDirection: 'row',
      marginTop: 8,
    },
    statItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 16,
    },
    statText: {
      marginLeft: 4,
      color: Colors[isDark ? 'dark' : 'light'].textSecondary,
      fontSize: 14,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rating: {
      marginLeft: 4,
      color: Colors[isDark ? 'dark' : 'light'].text,
      fontWeight: '600',
    },
    record: {
      color: Colors[isDark ? 'dark' : 'light'].textSecondary,
      fontSize: 14,
    },
    buttonRow: {
      flexDirection: 'row',
      marginTop: 12,
      justifyContent: 'space-between',
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
      backgroundColor: Colors[isDark ? 'dark' : 'light'].primary,
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: Colors[isDark ? 'dark' : 'light'].primary,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: '600',
    },
    primaryButtonText: {
      color: '#fff',
    },
    secondaryButtonText: {
      color: Colors[isDark ? 'dark' : 'light'].primary,
    },
    listEmptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
    },
    listEmptyText: {
      color: Colors[isDark ? 'dark' : 'light'].textSecondary,
      fontSize: 16,
    },
  });

  const renderTeamItem = ({ item }) => (
    <View style={styles.teamCard}>
      <View style={styles.teamImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.teamImage}
        />
      </View>
      <View style={styles.teamContent}>
        <View style={styles.teamHeader}>
          <Text style={styles.teamName}>{item.name}</Text>
          <View style={styles.sportTag}>
            <Text style={styles.sportTagText}>{item.sport}</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <Star size={16} color="#F4D03F" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.record}> · {item.wins}W - {item.losses}L</Text>
        </View>
        <View style={styles.teamStats}>
          <View style={styles.statItem}>
            <Users size={16} color={Colors[isDark ? 'dark' : 'light'].textSecondary} />
            <Text style={styles.statText}>{item.members} {t('members')}</Text>
          </View>
          <View style={styles.statItem}>
            <Trophy size={16} color={Colors[isDark ? 'dark' : 'light'].textSecondary} />
            <Text style={styles.statText}>{item.wins} {t('wins')}</Text>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.primaryButton]}>
            <Text style={[styles.buttonText, styles.primaryButtonText]}>{t('joinTeam')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>{t('viewDetails')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderListEmpty = () => (
    <View style={styles.listEmptyContainer}>
      <Text style={styles.listEmptyText}>{t('noTeamsFound')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('discoverTeams')}</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={t('searchTeams')}
            placeholderTextColor={Colors[isDark ? 'dark' : 'light'].textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}
          >
            <Filter color="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={teams}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTeamItem}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={renderListEmpty}
      />

      <TouchableOpacity 
        style={styles.createButtonContainer}
        onPress={() => setShowCreateModal(true)}
      >
        <Plus color="white" size={24} />
      </TouchableOpacity>

      <CreateTeamModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateTeam}
      />
    </View>
  );
}