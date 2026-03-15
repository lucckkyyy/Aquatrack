/**
 * Circular progress ring showing daily water intake vs goal.
 * Smooth animation when progress changes. Uses a circular track with
 * an animated fill bar for compatibility without SVG.
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';

const RING_SIZE = 200;
const STROKE_WIDTH = 14;
const BAR_WIDTH = 240;
const BAR_HEIGHT = 12;

export function WaterRing({ intakeMl, goalMl }) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const progress = goalMl > 0 ? Math.min(1, intakeMl / goalMl) : 0;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: progress,
      useNativeDriver: false,
      tension: 50,
      friction: 8,
    }).start();
  }, [progress, animatedValue]);

  const fillWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, BAR_WIDTH],
  });

  return (
    <View style={styles.container}>
      {/* Circular track (visual ring) with center stats */}
      <View style={[styles.ringWrapper, { width: RING_SIZE, height: RING_SIZE }]}>
        <View
          style={[
            styles.track,
            {
              width: RING_SIZE,
              height: RING_SIZE,
              borderRadius: RING_SIZE / 2,
              borderWidth: STROKE_WIDTH,
            },
          ]}
        />
        <View style={styles.center}>
          <Text style={styles.intakeText}>{intakeMl}</Text>
          <Text style={styles.unitText}>ml</Text>
          <Text style={styles.goalText}>of {goalMl} ml</Text>
        </View>
      </View>
      {/* Animated progress bar (smooth fill) */}
      <View style={[styles.barTrack, { width: BAR_WIDTH, height: BAR_HEIGHT }]}>
        <Animated.View
          style={[
            styles.barFill,
            {
              width: fillWidth,
              height: BAR_HEIGHT,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
  },
  ringWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
    borderColor: COLORS.progressTrack,
  },
  barTrack: {
    marginTop: SPACING.md,
    borderRadius: BAR_HEIGHT / 2,
    backgroundColor: COLORS.progressTrack,
    overflow: 'hidden',
  },
  barFill: {
    borderRadius: BAR_HEIGHT / 2,
    backgroundColor: COLORS.progressFill,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  intakeText: {
    fontSize: FONT_SIZES.h1,
    fontWeight: '700',
    color: COLORS.text,
  },
  unitText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.textSecondary,
  },
  goalText: {
    fontSize: FONT_SIZES.caption,
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
  },
});
