/**
 * Manages daily water intake: load/save from AsyncStorage, reset at midnight.
 */

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDailyGoalMl } from '../utils/calculations';

const STORAGE_KEY = '@aquatrack_daily';
const LAST_DATE_KEY = '@aquatrack_last_date';

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Load persisted intake for today; reset if it's a new day.
 */
async function loadTodayIntake() {
  const today = getTodayKey();
  const lastDate = await AsyncStorage.getItem(LAST_DATE_KEY);
  if (lastDate !== today) {
    await AsyncStorage.setItem(LAST_DATE_KEY, today);
    await AsyncStorage.setItem(STORAGE_KEY, '0');
    return 0;
  }
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return parseInt(raw || '0', 10);
}

/**
 * Persist intake for today.
 */
async function saveTodayIntake(ml) {
  await AsyncStorage.setItem(STORAGE_KEY, String(ml));
  await AsyncStorage.setItem(LAST_DATE_KEY, getTodayKey());
}

/**
 * useHydration(weather) – intake state + goal from weather, persisted.
 * Returns: { intakeMl, goalMl, addIntake, loading, refresh }.
 */
export function useHydration(weather) {
  const [intakeMl, setIntakeMl] = useState(0);
  const [loading, setLoading] = useState(true);

  const goalMl = weather ? getDailyGoalMl(weather) : 2500;

  const refresh = useCallback(async () => {
    setLoading(true);
    const value = await loadTodayIntake();
    setIntakeMl(value);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addIntake = useCallback(async (ml) => {
    const next = intakeMl + ml;
    setIntakeMl(next);
    await saveTodayIntake(next);
  }, [intakeMl]);

  return { intakeMl, goalMl, addIntake, loading, refresh };
}
