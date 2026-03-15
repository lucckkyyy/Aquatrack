/**
 * "I drank water" log button with amount selector (150ml, 250ml, 500ml).
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

const AMOUNTS = [150, 250, 500];

export function DrinkButton({ onLog }) {
  const [selectedMl, setSelectedMl] = useState(250);

  const handleLog = () => {
    onLog(selectedMl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I drank water</Text>
      <View style={styles.amountRow}>
        {AMOUNTS.map((ml) => (
          <TouchableOpacity
            key={ml}
            style={[styles.amountChip, selectedMl === ml && styles.amountChipSelected]}
            onPress={() => setSelectedMl(ml)}
            activeOpacity={0.8}
          >
            <Text style={[styles.amountText, selectedMl === ml && styles.amountTextSelected]}>
              {ml} ml
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLog} activeOpacity={0.8}>
        <Ionicons name="water" size={24} color="#fff" />
        <Text style={styles.buttonText}>Log {selectedMl} ml</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  amountRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  amountChip: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  amountChipSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#e0f2fe',
  },
  amountText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.textSecondary,
  },
  amountTextSelected: {
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
  },
  buttonText: {
    fontSize: FONT_SIZES.bodyLarge,
    fontWeight: '600',
    color: '#fff',
  },
});
