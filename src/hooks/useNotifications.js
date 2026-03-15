/**
 * Schedules and reschedules hydration reminder notifications based on weather.
 */

import { useEffect, useRef, useCallback } from 'react';
import {
  getReminderIntervalMinutes,
  scheduleNotification,
  cancelAllScheduledNotifications,
  requestNotificationPermissions,
} from '../utils/notifications';

const REMINDER_TITLE = 'AquaTrack';
const REMINDER_BODY = "Time to sip some water! Stay hydrated.";

/**
 * Schedules repeating reminders at intervalMinutes.
 * Cancels existing ones first. Schedules next 5 reminders (enough for ~half day at 2h).
 */
async function scheduleReminders(intervalMinutes) {
  await cancelAllScheduledNotifications();
  const intervalSeconds = intervalMinutes * 60;
  for (let i = 1; i <= 5; i++) {
    await scheduleNotification(REMINDER_TITLE, REMINDER_BODY, intervalSeconds * i);
  }
}

/**
 * useNotifications(weather) – requests permission and schedules reminders when weather changes.
 */
export function useNotifications(weather) {
  const scheduled = useRef(false);
  const lastInterval = useRef(null);

  const setup = useCallback(async (intervalMinutes) => {
    const granted = await requestNotificationPermissions();
    if (!granted) return;
    await scheduleReminders(intervalMinutes);
    scheduled.current = true;
    lastInterval.current = intervalMinutes;
  }, []);

  useEffect(() => {
    if (!weather) return;
    const interval = getReminderIntervalMinutes(weather);
    if (lastInterval.current === interval && scheduled.current) return;
    setup(interval);
  }, [weather, setup]);

  return { scheduleReminders: setup };
}
