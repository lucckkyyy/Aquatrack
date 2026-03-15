/**
 * Local push notification scheduling for AquaTrack.
 * Frequency increases when it's hot or dry (more reminders).
 */

import * as Notifications from 'expo-notifications';

// Configure how notifications are presented when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Default interval in minutes between reminders (normal conditions).
 */
const DEFAULT_INTERVAL_MINUTES = 120; // 2 hours

/**
 * Aggressive interval when hot or dry (more frequent reminders).
 */
const AGGRESSIVE_INTERVAL_MINUTES = 60; // 1 hour

/**
 * Decide reminder interval in minutes based on weather.
 * @param {Object} weather - { temperature_2m, relative_humidity_2m }
 * @returns {number} Interval in minutes
 */
export function getReminderIntervalMinutes(weather) {
  if (!weather) return DEFAULT_INTERVAL_MINUTES;
  const temp = weather.temperature_2m ?? 20;
  const humidity = weather.relative_humidity_2m ?? 50;
  if (temp > 30 || humidity < 30) return AGGRESSIVE_INTERVAL_MINUTES;
  return DEFAULT_INTERVAL_MINUTES;
}

/**
 * Schedule a single local notification.
 * @param {string} title
 * @param {string} body
 * @param {number} triggerSeconds - delay in seconds
 * @returns {Promise<string|null>} identifier or null
 */
export async function scheduleNotification(title, body, triggerSeconds) {
  try {
    const trigger = { seconds: Math.max(1, triggerSeconds) };
    if (Notifications.SchedulableTriggerInputTypes?.TIME_INTERVAL != null) {
      trigger.type = Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL;
    }
    const id = await Notifications.scheduleNotificationAsync({
      content: { title, body, sound: true },
      trigger,
    });
    return id;
  } catch (e) {
    console.warn('scheduleNotification failed', e);
    return null;
  }
}

/**
 * Cancel all scheduled notifications (e.g. before rescheduling).
 */
export async function cancelAllScheduledNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/**
 * Request notification permissions (required on iOS/Android).
 * @returns {Promise<boolean>} true if granted
 */
export async function requestNotificationPermissions() {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}
