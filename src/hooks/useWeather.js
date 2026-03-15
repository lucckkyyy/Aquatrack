/**
 * Fetches real-time weather from Open-Meteo using device coordinates.
 * No API key required.
 */

import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';

const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast';

async function fetchWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code',
  });
  const res = await fetch(`${OPEN_METEO_URL}?${params}`);
  if (!res.ok) throw new Error('Weather fetch failed');
  const data = await res.json();
  return data.current;
}

/**
 * Returns weather data, loading and error state.
 * Requests location permission and fetches weather on mount and when refresh() is called.
 */
export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied');
        setLoading(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const { latitude, longitude } = location.coords;
      const current = await fetchWeather(latitude, longitude);
      setWeather(current);
    } catch (e) {
      setError(e.message || 'Failed to load weather');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { weather, loading, error, refresh: load };
}
