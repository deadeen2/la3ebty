import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// English translations
const enTranslations = {
  // General
  welcome: 'Welcome to La3ebty',
  findNearbyMatches: 'Find and join sports activities near you',
  seeAll: 'See All',
  viewMap: 'View Map',
  viewFullMap: 'View Full Map',
  join: 'Join',
  details: 'Details',
  invite: 'Invite',
  free: 'Free',
  egp: 'EGP',
  km: 'km',
  filters: 'Filters',
  apply: 'Apply',
  reset: 'Reset',

  // Tab navigation
  home: 'Home',
  events: 'Events',
  teams: 'Teams',
  chat: 'Chat',
  profile: 'Profile',

  // Home screen
  upcomingEvents: 'Upcoming Events',
  nearbyActivities: 'Nearby Activities',
  playersNearYou: 'Players Near You',

  // Events screen
  discoverEvents: 'Discover Events',
  searchEvents: 'Search events',
  noEventsFound: 'No events found',
  participants: 'participants',
  full: 'Full',
  almostFull: 'Almost Full',
  available: 'Available',

  // Teams screen
  discoverTeams: 'Discover Teams',
  searchTeams: 'Search teams',
  noTeamsFound: 'No teams found',
  members: 'members',
  wins: 'wins',
  joinTeam: 'Join Team',
  viewDetails: 'View Details',

  // Chat screen
  messages: 'Messages',
  searchMessages: 'Search messages',
  noChatsFound: 'No messages found',

  // Profile screen
  matches: 'Matches',
  rating: 'Rating',
  teams: 'Teams',
  myTeams: 'My Teams',
  upcomingMatches: 'Upcoming Matches',
  settings: 'Settings',
  darkMode: 'Dark Mode',
  logout: 'Logout',
  captain: 'Captain',
  player: 'Player',
  
  // Achievements
  topScorer: 'Top Scorer',
  teamPlayer: 'Team Player',
  monthlyMVP: 'Monthly MVP',

  // Filters
  sportType: 'Sport Type',
  maxDistance: 'Maximum Distance',
  date: 'Date',
  
  // Sports
  all: 'All',
  football: 'Football',
  basketball: 'Basketball',
  volleyball: 'Volleyball',
  tennis: 'Tennis',
  squash: 'Squash',
  swimming: 'Swimming',
  tabletennis: 'Table Tennis',
  
  // Dates
  today: 'Today',
  tomorrow: 'Tomorrow',
  thisWeek: 'This Week',
  thisMonth: 'This Month',
};

// Arabic translations
const arTranslations = {
  // General
  welcome: 'مرحباً بك في لعيبتي',
  findNearbyMatches: 'ابحث وانضم إلى الأنشطة الرياضية القريبة منك',
  seeAll: 'عرض الكل',
  viewMap: 'عرض الخريطة',
  viewFullMap: 'عرض الخريطة كاملة',
  join: 'انضم',
  details: 'التفاصيل',
  invite: 'دعوة',
  free: 'مجاني',
  egp: 'ج.م',
  km: 'كم',
  filters: 'تصفية',
  apply: 'تطبيق',
  reset: 'إعادة ضبط',

  // Tab navigation
  home: 'الرئيسية',
  events: 'الفعاليات',
  teams: 'الفرق',
  chat: 'الدردشة',
  profile: 'الملف الشخصي',

  // Home screen
  upcomingEvents: 'الفعاليات القادمة',
  nearbyActivities: 'الأنشطة القريبة',
  playersNearYou: 'اللاعبون بالقرب منك',

  // Events screen
  discoverEvents: 'اكتشف الفعاليات',
  searchEvents: 'ابحث عن فعاليات',
  noEventsFound: 'لم يتم العثور على فعاليات',
  participants: 'مشاركين',
  full: 'مكتمل',
  almostFull: 'شبه مكتمل',
  available: 'متاح',

  // Teams screen
  discoverTeams: 'اكتشف الفرق',
  searchTeams: 'ابحث عن فرق',
  noTeamsFound: 'لم يتم العثور على فرق',
  members: 'أعضاء',
  wins: 'انتصارات',
  joinTeam: 'انضم للفريق',
  viewDetails: 'عرض التفاصيل',

  // Chat screen
  messages: 'الرسائل',
  searchMessages: 'ابحث في الرسائل',
  noChatsFound: 'لم يتم العثور على رسائل',

  // Profile screen
  matches: 'مباريات',
  rating: 'تقييم',
  teams: 'فرق',
  myTeams: 'فرقي',
  upcomingMatches: 'المباريات القادمة',
  settings: 'الإعدادات',
  darkMode: 'الوضع الداكن',
  logout: 'تسجيل خروج',
  captain: 'كابتن',
  player: 'لاعب',
  
  // Achievements
  topScorer: 'الهداف',
  teamPlayer: 'لاعب الفريق',
  monthlyMVP: 'أفضل لاعب شهري',

  // Filters
  sportType: 'نوع الرياضة',
  maxDistance: 'أقصى مسافة',
  date: 'التاريخ',
  
  // Sports
  all: 'الكل',
  football: 'كرة القدم',
  basketball: 'كرة السلة',
  volleyball: 'كرة الطائرة',
  tennis: 'التنس',
  squash: 'الاسكواش',
  swimming: 'السباحة',
  tabletennis: 'تنس الطاولة',
  
  // Dates
  today: 'اليوم',
  tomorrow: 'غداً',
  thisWeek: 'هذا الأسبوع',
  thisMonth: 'هذا الشهر',
};

const LANGUAGE_PERSISTENCE_KEY = 'app_language';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      const persistedLanguage = await AsyncStorage.getItem(LANGUAGE_PERSISTENCE_KEY);
      if (persistedLanguage) {
        callback(persistedLanguage);
      } else {
        callback('en'); // Default to English
      }
    } catch (error) {
      console.error('Error reading language from AsyncStorage:', error);
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_PERSISTENCE_KEY, lng);
    } catch (error) {
      console.error('Error saving language to AsyncStorage:', error);
    }
  }
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: enTranslations,
      },
      ar: {
        translation: arTranslations,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18next;