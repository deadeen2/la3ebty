import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { X, Calendar, MapPin, Users, DollarSign } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';

interface CreateEventModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (eventData: any) => void;
}

export default function CreateEventModal({ visible, onClose, onSubmit }: CreateEventModalProps) {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [eventData, setEventData] = useState({
    title: '',
    sport: '',
    location: '',
    date: new Date(),
    time: new Date(),
    maxParticipants: '',
    cost: '',
    description: '',
  });

  const handleSubmit = () => {
    onSubmit(eventData);
    onClose();
  };

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      padding: 20,
    },
    modalContent: {
      backgroundColor: Colors[isDark ? 'dark' : 'light'].background,
      borderRadius: 12,
      padding: 20,
      maxHeight: '80%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors[isDark ? 'dark' : 'light'].text,
    },
    closeButton: {
      padding: 5,
    },
    inputContainer: {
      marginBottom: 15,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      color: Colors[isDark ? 'dark' : 'light'].text,
    },
    input: {
      backgroundColor: Colors[isDark ? 'dark' : 'light'].inputBackground,
      borderRadius: 8,
      padding: 12,
      color: Colors[isDark ? 'dark' : 'light'].text,
    },
    button: {
      backgroundColor: Colors[isDark ? 'dark' : 'light'].primary,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    scrollContent: {
      flexGrow: 1,
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('createEvent')}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X color={Colors[isDark ? 'dark' : 'light'].text} size={24} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('eventTitle')}</Text>
              <TextInput
                style={styles.input}
                value={eventData.title}
                onChangeText={(text) => setEventData({ ...eventData, title: text })}
                placeholder={t('enterEventTitle')}
                placeholderTextColor={Colors[isDark ? 'dark' : 'light'].textSecondary}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('sport')}</Text>
              <TextInput
                style={styles.input}
                value={eventData.sport}
                onChangeText={(text) => setEventData({ ...eventData, sport: text })}
                placeholder={t('selectSport')}
                placeholderTextColor={Colors[isDark ? 'dark' : 'light'].textSecondary}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('location')}</Text>
              <TextInput
                style={styles.input}
                value={eventData.location}
                onChangeText={(text) => setEventData({ ...eventData, location: text })}
                placeholder={t('enterLocation')}
                placeholderTextColor={Colors[isDark ? 'dark' : 'light'].textSecondary}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('maxParticipants')}</Text>
              <TextInput
                style={styles.input}
                value={eventData.maxParticipants}
                onChangeText={(text) => setEventData({ ...eventData, maxParticipants: text })}
                placeholder={t('enterMaxParticipants')}
                placeholderTextColor={Colors[isDark ? 'dark' : 'light'].textSecondary}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('cost')}</Text>
              <TextInput
                style={styles.input}
                value={eventData.cost}
                onChangeText={(text) => setEventData({ ...eventData, cost: text })}
                placeholder={t('enterCost')}
                placeholderTextColor={Colors[isDark ? 'dark' : 'light'].textSecondary}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('description')}</Text>
              <TextInput
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                value={eventData.description}
                onChangeText={(text) => setEventData({ ...eventData, description: text })}
                placeholder={t('enterDescription')}
                placeholderTextColor={Colors[isDark ? 'dark' : 'light'].textSecondary}
                multiline
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>{t('createEvent')}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}