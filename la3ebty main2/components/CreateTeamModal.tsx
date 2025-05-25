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
import { X, Users } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface CreateTeamModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (teamData: any) => void;
}

export default function CreateTeamModal({ visible, onClose, onSubmit }: CreateTeamModalProps) {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [teamData, setTeamData] = useState({
    name: '',
    sport: '',
    description: '',
    maxMembers: '',
  });

  const handleSubmit = () => {
    onSubmit(teamData);
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
            <Text style={styles.title}>{t('createTeam')}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X color={Colors[isDark ? 'dark' : 'light'].text} size={24} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('teamName')}</Text>
              <TextInput
                style={styles.input}
                value={teamData.name}
                onChangeText={(text) => setTeamData({ ...teamData, name: text })}
                placeholder={t('enterTeamName')}
                placeholderTextColor={Colors[isDark ? 'dark' : 'light'].textSecondary}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('sport')}</Text>
              <TextInput
                style={styles.input}
                value={teamData.sport}
                onChangeText={(text) => setTeamData({ ...teamData, sport: text })}
                placeholder={t('selectSport')}
                placeholderTextColor={Colors[isDark ? 'dark' : 'light'].textSecondary}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('maxMembers')}</Text>
              <TextInput
                style={styles.input}
                value={teamData.maxMembers}
                onChangeText={(text) => setTeamData({ ...teamData, maxMembers: text })}
                placeholder={t('enterMaxMembers')}
                placeholderTextColor={Colors[isDark ? 'dark' : 'light'].textSecondary}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('description')}</Text>
              <TextInput
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                value={teamData.description}
                onChangeText={(text) => setTeamData({ ...teamData, description: text })}
                placeholder={t('enterTeamDescription')}
                placeholderTextColor={Colors[isDark ? 'dark' : 'light'].textSecondary}
                multiline
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>{t('createTeam')}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}