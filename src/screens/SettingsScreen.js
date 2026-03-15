/**
 * Settings screen: placeholders for profile, reminders, and future features.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';

export function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* TODO: User profile – weight, activity level (affects goal) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.placeholder}>Weight & activity level — coming soon</Text>
      </View>

      {/* TODO: Caffeine/alcohol intake logger (deducts from hydration) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Intake logger</Text>
        <Text style={styles.placeholder}>Caffeine & alcohol — coming soon</Text>
      </View>

      {/* TODO: Custom reminder schedule (quiet hours) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reminders</Text>
        <Text style={styles.placeholder}>Quiet hours & custom schedule — coming soon</Text>
      </View>

      {/* TODO: Apple Health / Google Fit integration */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health</Text>
        <Text style={styles.placeholder}>Apple Health / Google Fit — coming soon</Text>
      </View>

      {/* TODO: Streak tracking and gamification badges */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Streaks & badges</Text>
        <Text style={styles.placeholder}>Gamification — coming soon</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.h2,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  placeholder: {
    fontSize: FONT_SIZES.body,
    color: COLORS.textSecondary,
  },
});
