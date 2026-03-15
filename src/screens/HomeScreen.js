/**
 * Home screen: weather card, daily goal, progress ring, and drink log button.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { WeatherCard } from '../components/WeatherCard';
import { WaterRing } from '../components/WaterRing';
import { DrinkButton } from '../components/DrinkButton';
import { useWeather } from '../hooks/useWeather';
import { useHydration } from '../hooks/useHydration';
import { useNotifications } from '../hooks/useNotifications';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';

export function HomeScreen() {
  const { weather, loading: weatherLoading, error, refresh: refreshWeather } = useWeather();
  const { intakeMl, goalMl, addIntake, loading: hydrationLoading, refresh: refreshHydration } = useHydration(weather);

  // Schedule reminders based on weather (hot/dry = more frequent).
  useNotifications(weather);

  const onRefresh = () => {
    refreshWeather();
    refreshHydration();
  };

  const handleLog = (ml) => {
    addIntake(ml);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={weatherLoading} onRefresh={onRefresh} tintColor={COLORS.primary} />
      }
    >
      <Text style={styles.title}>Today's hydration</Text>
      <WeatherCard weather={weather} loading={weatherLoading} error={error} />
      <WaterRing intakeMl={intakeMl} goalMl={goalMl} />
      <DrinkButton onLog={handleLog} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  title: {
    fontSize: FONT_SIZES.h2,
    fontWeight: '700',
    color: COLORS.text,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
});
