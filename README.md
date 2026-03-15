# AquaTrack

A React Native (Expo) water hydration reminder app that uses real-time weather to personalize your daily water goal and remind you to drink.

## Features

- **Real-time weather** via Open-Meteo API (no API key) using your device GPS
- **Personalized daily goal** (base 2500 ml + bonuses for hot, dry, or sunny conditions)
- **Local push notifications** at smart intervals (more frequent when it's hot or dry)
- **Progress tracking** with a visual ring/bar and "I drank water" log (150 / 250 / 500 ml)
- **Daily reset at midnight** with persistence in AsyncStorage

## Setup

```bash
npm install
npx expo start
```

Optional: add `assets/icon.png`, `assets/splash.png`, and `assets/adaptive-icon.png` for a custom app icon and splash (Expo uses defaults in dev if missing).

## Tech Stack

- React Native + Expo (managed workflow)
- expo-location, expo-notifications, AsyncStorage
- React Navigation (bottom tabs)
- StyleSheet styling, Ionicons

## Project Structure

```
/src
  /screens    Home, History, Settings
  /components WaterRing, WeatherCard, DrinkButton
  /hooks     useWeather, useHydration, useNotifications
  /utils     calculations.js, notifications.js
  /constants theme.js
```

## Future Features (scaffolded)

- User profile (weight, activity level)
- Caffeine/alcohol logger
- Weekly hydration history chart
- Apple Health / Google Fit
- Custom reminder schedule (quiet hours)
- Streak tracking and badges

## Permissions

- **Location**: used only to fetch local weather (Open-Meteo).
- **Notifications**: for hydration reminders.
