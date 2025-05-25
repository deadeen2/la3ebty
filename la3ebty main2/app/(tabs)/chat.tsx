import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  useColorScheme,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Search, MoveVertical as MoreVertical, Phone, Video } from 'lucide-react-native';
import Colors from '@/constants/Colors';

// Mock data for chats
const sampleChats = [
  {
    id: 1,
    name: 'Cairo Eagles',
    lastMessage: 'Are we still on for the match tomorrow?',
    time: '10:30 AM',
    unread: 2,
    isGroup: true,
    avatar: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    name: 'Ahmed Mohamed',
    lastMessage: 'Great game yesterday!',
    time: '9:15 AM',
    unread: 0,
    isGroup: false,
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    name: 'Volleyball Group',
    lastMessage: 'I found a great court we can book for Sunday',
    time: 'Yesterday',
    unread: 5,
    isGroup: true,
    avatar: 'https://images.pexels.com/photos/6542311/pexels-photo-6542311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 4,
    name: 'Sarah Ahmed',
    lastMessage: 'Are you interested in joining our basketball team?',
    time: 'Yesterday',
    unread: 0,
    isGroup: false,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 5,
    name: 'Tennis Club',
    lastMessage: 'Tournament registration starts next week',
    time: 'Monday',
    unread: 1,
    isGroup: true,
    avatar: 'https://images.pexels.com/photos/8224057/pexels-photo-8224057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export default function ChatScreen() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState(sampleChats);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
    },
    header: {
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      paddingTop: 50,
      paddingBottom: 10,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: Colors[colorScheme ?? 'light'].border,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors[colorScheme ?? 'light'].text,
      marginBottom: 16,
    },
    searchInput: {
      height: 40,
      backgroundColor: Colors[colorScheme ?? 'light'].inputBackground,
      borderRadius: 20,
      paddingHorizontal: 16,
      color: Colors[colorScheme ?? 'light'].text,
    },
    chatItem: {
      flexDirection: 'row',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: Colors[colorScheme ?? 'light'].border,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
    },
    chatContent: {
      flex: 1,
      justifyContent: 'center',
    },
    chatHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
      color: Colors[colorScheme ?? 'light'].text,
    },
    time: {
      fontSize: 12,
      color: Colors[colorScheme ?? 'light'].textSecondary,
    },
    messageRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    lastMessage: {
      fontSize: 14,
      color: Colors[colorScheme ?? 'light'].textSecondary,
      flex: 1,
    },
    unreadBadge: {
      backgroundColor: Colors[colorScheme ?? 'light'].primary,
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 2,
      marginLeft: 8,
    },
    unreadText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '600',
    },
    actionsContainer: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      flexDirection: 'row',
    },
    actionButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    videoCallButton: {
      backgroundColor: Colors[colorScheme ?? 'light'].secondary,
    },
    callButton: {
      backgroundColor: Colors[colorScheme ?? 'light'].primary,
    },
    listEmptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
    },
    listEmptyText: {
      color: Colors[colorScheme ?? 'light'].textSecondary,
      fontSize: 16,
    },
  });

  const renderChatItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.messageRow}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderListEmpty = () => (
    <View style={styles.listEmptyContainer}>
      <Text style={styles.listEmptyText}>{t('noChatsFound')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('messages')}</Text>
        <TextInput
          style={styles.searchInput}
          placeholder={t('searchMessages')}
          placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderChatItem}
        ListEmptyComponent={renderListEmpty}
      />

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={[styles.actionButton, styles.videoCallButton]}>
          <Video color="white" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.callButton]}>
          <Phone color="white" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}