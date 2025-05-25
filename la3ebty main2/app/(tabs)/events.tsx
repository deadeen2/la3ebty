import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  useColorScheme,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Plus } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { sampleEvents } from '@/data/mockData';
import EventListItem from '@/components/EventListItem';
import FilterModal from '@/components/FilterModal';
import CreateEventModal from '@/components/CreateEventModal';

export default function EventsScreen() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [events, setEvents] = useState(sampleEvents);
  const [filters, setFilters] = useState({
    sport: 'all',
    maxDistance: 20,
    date: 'all',
  });

  const handleCreateEvent = (eventData: any) => {
    // Here you would typically make an API call to create the event
    // For now, we'll just add it to the local state
    const newEvent = {
      id: events.length + 1,
      ...eventData,
      image: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
      distance: '0.1 km',
      participantsCount: 0,
    };
    setEvents([newEvent, ...events]);
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setShowFilterModal(false);
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

  const renderListEmpty = () => (
    <View style={styles.listEmptyContainer}>
      <Text style={styles.listEmptyText}>{t('noEventsFound')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('discoverEvents')}</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={t('searchEvents')}
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
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EventListItem event={item} />}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={renderListEmpty}
      />

      <TouchableOpacity 
        style={styles.createButtonContainer}
        onPress={() => setShowCreateModal(true)}
      >
        <Plus color="white" size={24} />
      </TouchableOpacity>

      <FilterModal 
        visible={showFilterModal} 
        onClose={() => setShowFilterModal(false)}
        currentFilters={filters}
        onApply={applyFilters}
      />

      <CreateEventModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateEvent}
      />
    </View>
  );
}