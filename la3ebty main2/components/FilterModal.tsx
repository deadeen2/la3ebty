import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { X } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import Slider from '@react-native-community/slider';
import Colors from '@/constants/Colors';

// Sample sport types
const sportTypes = [
  'all',
  'football',
  'basketball',
  'volleyball',
  'tennis',
  'squash',
  'swimming',
  'tabletennis',
];

// Sample date filters
const dateFilters = ['all', 'today', 'tomorrow', 'thisWeek', 'thisMonth'];

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  currentFilters: {
    sport: string;
    maxDistance: number;
    date: string;
  };
  onApply: (filters: { sport: string; maxDistance: number; date: string }) => void;
}

export default function FilterModal({
  visible,
  onClose,
  currentFilters,
  onApply,
}: FilterModalProps) {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();

  const [filters, setFilters] = useState(currentFilters);

  const handleSelectSport = (sport: string) => {
    setFilters({ ...filters, sport });
  };

  const handleSelectDate = (date: string) => {
    setFilters({ ...filters, date });
  };

  const handleApply = () => {
    onApply(filters);
  };

  const handleReset = () => {
    setFilters({
      sport: 'all',
      maxDistance: 20,
      date: 'all',
    });
  };

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 30,
      maxHeight: '80%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors[colorScheme ?? 'light'].text,
    },
    closeButton: {
      padding: 5,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: Colors[colorScheme ?? 'light'].text,
      marginBottom: 12,
      marginTop: 16,
    },
    optionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    optionButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 8,
      marginBottom: 8,
      borderWidth: 1,
    },
    optionText: {
      fontSize: 14,
    },
    sliderContainer: {
      marginTop: 8,
      marginBottom: 16,
    },
    sliderValue: {
      textAlign: 'center',
      marginTop: 8,
      fontSize: 14,
      color: Colors[colorScheme ?? 'light'].textSecondary,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 24,
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    resetButton: {
      marginRight: 8,
      borderWidth: 1,
      borderColor: Colors[colorScheme ?? 'light'].border,
    },
    resetButtonText: {
      color: Colors[colorScheme ?? 'light'].text,
      fontWeight: '500',
    },
    applyButton: {
      marginLeft: 8,
      backgroundColor: Colors[colorScheme ?? 'light'].primary,
    },
    applyButtonText: {
      color: 'white',
      fontWeight: '600',
    },
  });

  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{t('filters')}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <X size={24} color={Colors[colorScheme ?? 'light'].text} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>{t('sportType')}</Text>
                <View style={styles.optionsContainer}>
                  {sportTypes.map((sport) => (
                    <TouchableOpacity
                      key={sport}
                      style={[
                        styles.optionButton,
                        {
                          borderColor:
                            filters.sport === sport
                              ? Colors[colorScheme ?? 'light'].primary
                              : Colors[colorScheme ?? 'light'].border,
                          backgroundColor:
                            filters.sport === sport
                              ? Colors[colorScheme ?? 'light'].primary
                              : 'transparent',
                        },
                      ]}
                      onPress={() => handleSelectSport(sport)}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          {
                            color:
                              filters.sport === sport
                                ? 'white'
                                : Colors[colorScheme ?? 'light'].text,
                          },
                        ]}
                      >
                        {t(sport)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.sectionTitle}>{t('maxDistance')}</Text>
                <View style={styles.sliderContainer}>
                  <Slider
                    minimumValue={1}
                    maximumValue={50}
                    step={1}
                    value={filters.maxDistance}
                    onValueChange={(value) => setFilters({ ...filters, maxDistance: value })}
                    minimumTrackTintColor={Colors[colorScheme ?? 'light'].primary}
                    maximumTrackTintColor={Colors[colorScheme ?? 'light'].border}
                    thumbTintColor={Colors[colorScheme ?? 'light'].primary}
                  />
                  <Text style={styles.sliderValue}>
                    {filters.maxDistance} {t('km')}
                  </Text>
                </View>

                <Text style={styles.sectionTitle}>{t('date')}</Text>
                <View style={styles.optionsContainer}>
                  {dateFilters.map((date) => (
                    <TouchableOpacity
                      key={date}
                      style={[
                        styles.optionButton,
                        {
                          borderColor:
                            filters.date === date
                              ? Colors[colorScheme ?? 'light'].primary
                              : Colors[colorScheme ?? 'light'].border,
                          backgroundColor:
                            filters.date === date
                              ? Colors[colorScheme ?? 'light'].primary
                              : 'transparent',
                        },
                      ]}
                      onPress={() => handleSelectDate(date)}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          {
                            color:
                              filters.date === date
                                ? 'white'
                                : Colors[colorScheme ?? 'light'].text,
                          },
                        ]}
                      >
                        {t(date)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
                    <Text style={styles.resetButtonText}>{t('reset')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, styles.applyButton]} onPress={handleApply}>
                    <Text style={styles.applyButtonText}>{t('apply')}</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}