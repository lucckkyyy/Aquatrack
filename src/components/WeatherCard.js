/**
 * Displays current temperature, humidity, and weather icon (Ionicons).
 */

import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';
import { getWeatherLabel } from '../utils/calculations';

// Map Open-Meteo weather_code to Ionicons name (simplified set).
function getWeatherIconName(code) {
  if (code === 0 || code === 1) return 'sunny';
  if (code === 2) return 'partly-sunny';
  if (code === 3 || code === 45 || code === 48) return 'cloudy';
  if (code >= 51 && code <= 67) return 'rainy';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 80 && code <= 82) return 'rainy';
  if (code >= 95 && code <= 99) return 'thunderstorm';
  return 'partly-sunny';
}

export function WeatherCard({ weather, loading, error }) {
  if (loading) {
    return (
      <View style={styles.card}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Getting weather…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.card}>
        <Ionicons name="cloud-offline-outline" size={40} color={COLORS.textMuted} />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!weather) return null;

  const temp = Math.round(weather.temperature_2m ?? 0);
  const humidity = weather.relative_humidity_2m ?? 0;
  const code = weather.weather_code ?? 2;
  const iconName = getWeatherIconName(code);
  const label = getWeatherLabel(code);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Ionicons name={iconName} size={44} color={COLORS.primary} />
        </View>
        <View style={styles.main}>
          <Text style={styles.temp}>{temp}°</Text>
          <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.humidityWrap}>
          <Ionicons name="water-outline" size={22} color={COLORS.textSecondary} />
          <Text style={styles.humidity}>{humidity}%</Text>
          <Text style={styles.humidityLabel}>Humidity</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SPACING.sm,
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.body,
  },
  errorText: {
    marginTop: SPACING.sm,
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.body,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  iconWrap: {
    marginRight: SPACING.md,
  },
  main: {
    flex: 1,
  },
  temp: {
    fontSize: FONT_SIZES.h2,
    fontWeight: '700',
    color: COLORS.text,
  },
  label: {
    fontSize: FONT_SIZES.body,
    color: COLORS.textSecondary,
  },
  humidityWrap: {
    alignItems: 'center',
  },
  humidity: {
    fontSize: FONT_SIZES.bodyLarge,
    fontWeight: '600',
    color: COLORS.text,
  },
  humidityLabel: {
    fontSize: FONT_SIZES.caption,
    color: COLORS.textMuted,
  },
});
