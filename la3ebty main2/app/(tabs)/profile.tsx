import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { CreditCard as Edit, Settings, LogOut, Moon, Sun, Flag, Trophy, Star, Users, Calendar } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import i18next from '@/i18n';
import { useTheme } from '@/context/ThemeContext';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { theme, setTheme, isDark } = useTheme();
  const [isArabic, setIsArabic] = useState(i18next.language === 'ar');

  // Mock user data
  const user = {
    name: 'Ahmed Mohamed',
    username: '@ahmed_m',
    location: 'Cairo, Egypt',
    bio: 'Football enthusiast | Midfielder | Weekend warrior',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stats: {
      matches: 24,
      wins: 18,
      rating: 4.8,
      teamCount: 2,
    },
    achievements: [
      { id: 1, title: t('topScorer'), icon: 'trophy' },
      { id: 2, title: t('teamPlayer'), icon: 'users' },
      { id: 3, title: t('monthlyMVP'), icon: 'award' },
    ],
    upcomingMatches: [
      {
        id: 1,
        title: 'El Gezira vs Al Ahly',
        time: '10:00 AM',
        date: 'Tomorrow',
        location: 'El Gezira Club',
      },
      {
        id: 2,
        title: 'Friendly Match',
        time: '6:30 PM',
        date: 'Saturday',
        location: 'Maadi Club',
      },
    ],
    teams: [
      {
        id: 1,
        name: 'Cairo Eagles',
        role: t('captain'),
        image: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        id: 2,
        name: 'Maadi Stars',
        role: t('player'),
        image: 'https://images.pexels.com/photos/8224057/pexels-photo-8224057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    ],
  };

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const toggleLanguage = async () => {
    try {
      const newLang = isArabic ? 'en' : 'ar';
      await i18next.changeLanguage(newLang);
      setIsArabic(!isArabic);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[isDark ? 'dark' : 'light'].background,
    },
    header: {
      backgroundColor: Colors[isDark ? 'dark' : 'light'].primary,
      paddingTop: 60,
      paddingBottom: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      alignItems: 'center',
    },
    avatarContainer: {
      position: 'relative',
      marginBottom: 10,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: 'white',
    },
    editButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: Colors[isDark ? 'dark' : 'light'].secondary,
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    userName: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 5,
    },
    userHandle: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: 16,
    },
    location: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: 14,
      marginTop: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    bio: {
      color: 'white',
      textAlign: 'center',
      marginHorizontal: 30,
      marginTop: 10,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginHorizontal: 20,
      marginTop: 20,
      marginBottom: 10,
      backgroundColor: Colors[isDark ? 'dark' : 'light'].cardBackground,
      borderRadius: 12,
      padding: 16,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
        },
        android: {
          elevation: 2,
        },
        web: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        },
      }),
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors[isDark ? 'dark' : 'light'].text,
    },
    statLabel: {
      fontSize: 12,
      color: Colors[isDark ? 'dark' : 'light'].textSecondary,
      marginTop: 4,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors[isDark ? 'dark' : 'light'].text,
      marginTop: 20,
      marginBottom: 10,
      marginHorizontal: 20,
    },
    teamsContainer: {
      marginHorizontal: 20,
    },
    teamCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors[isDark ? 'dark' : 'light'].cardBackground,
      borderRadius: 12,
      padding: 12,
      marginBottom: 10,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
        },
        android: {
          elevation: 2,
        },
        web: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        },
      }),
    },
    teamImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
    },
    teamInfo: {
      flex: 1,
    },
    teamName: {
      fontSize: 16,
      fontWeight: '600',
      color: Colors[isDark ? 'dark' : 'light'].text,
    },
    teamRole: {
      fontSize: 14,
      color: Colors[isDark ? 'dark' : 'light'].textSecondary,
    },
    matchCard: {
      backgroundColor: Colors[isDark ? 'dark' : 'light'].cardBackground,
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 20,
      marginBottom: 10,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
        },
        android: {
          elevation: 2,
        },
        web: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        },
      }),
    },
    matchTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: Colors[isDark ? 'dark' : 'light'].text,
      marginBottom: 8,
    },
    matchDetail: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    matchDetailText: {
      fontSize: 14,
      color: Colors[isDark ? 'dark' : 'light'].textSecondary,
      marginLeft: 8,
    },
    settingsContainer: {
      marginHorizontal: 20,
      marginTop: 10,
      marginBottom: 30,
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: Colors[isDark ? 'dark' : 'light'].border,
    },
    settingLabel: {
      fontSize: 16,
      color: Colors[isDark ? 'dark' : 'light'].text,
      flexDirection: 'row',
      alignItems: 'center',
    },
    settingIcon: {
      marginRight: 10,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f44336',
      borderRadius: 8,
      padding: 12,
      marginTop: 20,
    },
    logoutText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editButton}>
              <Edit size={16} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userHandle}>{user.username}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Flag size={14} color="rgba(255, 255, 255, 0.8)" style={{ marginRight: 4 }} />
            <Text style={styles.location}>{user.location}</Text>
          </View>
          <Text style={styles.bio}>{user.bio}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.stats.matches}</Text>
            <Text style={styles.statLabel}>{t('matches')}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.stats.wins}</Text>
            <Text style={styles.statLabel}>{t('wins')}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.stats.rating}</Text>
            <Text style={styles.statLabel}>{t('rating')}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.stats.teamCount}</Text>
            <Text style={styles.statLabel}>{t('teams')}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{t('myTeams')}</Text>
        <View style={styles.teamsContainer}>
          {user.teams.map((team) => (
            <TouchableOpacity key={team.id} style={styles.teamCard}>
              <Image source={{ uri: team.image }} style={styles.teamImage} />
              <View style={styles.teamInfo}>
                <Text style={styles.teamName}>{team.name}</Text>
                <Text style={styles.teamRole}>{team.role}</Text>
              </View>
              <Users size={20} color={Colors[isDark ? 'dark' : 'light'].primary} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>{t('upcomingMatches')}</Text>
        {user.upcomingMatches.map((match) => (
          <View key={match.id} style={styles.matchCard}>
            <Text style={styles.matchTitle}>{match.title}</Text>
            <View style={styles.matchDetail}>
              <Calendar size={16} color={Colors[isDark ? 'dark' : 'light'].textSecondary} />
              <Text style={styles.matchDetailText}>{match.date} · {match.time}</Text>
            </View>
            <View style={styles.matchDetail}>
              <Flag size={16} color={Colors[isDark ? 'dark' : 'light'].textSecondary} />
              <Text style={styles.matchDetailText}>{match.location}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>{t('settings')}</Text>
        <View style={styles.settingsContainer}>
          <View style={styles.settingRow}>
            <View style={styles.settingLabel}>
              {isDark ? (
                <Moon size={20} color={Colors[isDark ? 'dark' : 'light'].text} style={styles.settingIcon} />
              ) : (
                <Sun size={20} color={Colors[isDark ? 'dark' : 'light'].text} style={styles.settingIcon} />
              )}
              <Text style={{ color: Colors[isDark ? 'dark' : 'light'].text }}>{t('darkMode')}</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ 
                false: Colors[isDark ? 'dark' : 'light'].border, 
                true: Colors[isDark ? 'dark' : 'light'].primary 
              }}
              thumbColor="white"
            />
          </View>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLabel}>
              <Flag size={20} color={Colors[isDark ? 'dark' : 'light'].text} style={styles.settingIcon} />
              <Text style={{ color: Colors[isDark ? 'dark' : 'light'].text }}>
                {isArabic ? 'English' : 'العربية'}
              </Text>
            </View>
            <Switch
              value={isArabic}
              onValueChange={toggleLanguage}
              trackColor={{ 
                false: Colors[isDark ? 'dark' : 'light'].border, 
                true: Colors[isDark ? 'dark' : 'light'].primary 
              }}
              thumbColor="white"
            />
          </View>

          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color="white" />
            <Text style={styles.logoutText}>{t('logout')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}