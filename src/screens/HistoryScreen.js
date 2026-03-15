/**
 * History screen: daily intake list. Scaffold for weekly chart (TODO).
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';

export function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hydration history</Text>
      <Text style={styles.placeholder}>
        {/* TODO: Weekly hydration history chart */}
        Your daily intake history will appear here. Weekly chart coming soon.
      </Text>
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
    marginBottom: SPACING.md,
  },
  placeholder: {
    fontSize: FONT_SIZES.body,
    color: COLORS.textSecondary,
  },
});
