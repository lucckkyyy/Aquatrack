/**
 * Hydration goal and weather-based calculations for AquaTrack.
 * Open-Meteo weather codes: https://open-meteo.com/en/docs#api_form
 * Clear/sunny codes: 0 (clear), 1 (mainly clear), 2 (partly cloudy) – we treat 0,1 as "sun"
 */

const BASE_ML = 2500;
const BONUS_HOT_ML = 300;   // temp > 30°C
const BONUS_DRY_ML = 200;   // humidity < 30%
const BONUS_SUN_ML = 200;   // clear/sunny weather

/**
 * Weather codes that indicate clear/sunny (0 = clear, 1 = mainly clear)
 */
const SUNNY_WEATHER_CODES = [0, 1];

/**
 * Calculate daily water goal in ml based on weather.
 * @param {Object} weather - { temperature_2m, relative_humidity_2m, weather_code }
 * @returns {number} Daily goal in ml
 */
export function getDailyGoalMl(weather) {
  if (!weather) return BASE_ML;

  const temp = weather.temperature_2m ?? 20;
  const humidity = weather.relative_humidity_2m ?? 50;
  const weatherCode = weather.weather_code ?? 2;

  let goal = BASE_ML;
  if (temp > 30) goal += BONUS_HOT_ML;
  if (humidity < 30) goal += BONUS_DRY_ML;
  if (SUNNY_WEATHER_CODES.includes(weatherCode)) goal += BONUS_SUN_ML;

  return goal;
}

/**
 * Get a human-readable weather description from WMO code.
 * @param {number} code - Open-Meteo weather_code
 * @returns {string}
 */
export function getWeatherLabel(code) {
  const map = {
    0: 'Clear',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Foggy',
    51: 'Drizzle',
    53: 'Drizzle',
    55: 'Drizzle',
    61: 'Light rain',
    63: 'Rain',
    65: 'Heavy rain',
    71: 'Snow',
    73: 'Snow',
    75: 'Snow',
    80: 'Rain showers',
    81: 'Rain showers',
    82: 'Rain showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm',
    99: 'Thunderstorm',
  };
  return map[code] ?? 'Unknown';
}

/**
 * Check if it's a new day (for midnight reset).
 * @param {string} lastDateKey - e.g. "2025-03-14"
 * @returns {boolean}
 */
export function isNewDay(lastDateKey) {
  const today = new Date().toISOString().slice(0, 10);
  return !lastDateKey || lastDateKey !== today;
}

/**
 * Get today's date key for storage (YYYY-MM-DD).
 */
export function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}
