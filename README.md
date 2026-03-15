💧 AquaTrack – Smart Hydration Reminder App
📘 Building a Practical Mobile App with React Native

I created AquaTrack to address a simple but common issue — forgetting to drink enough water during the day. The app uses real-time weather data and personalized user inputs to recommend a daily hydration goal and send reminders throughout the day.

This project helped me gain hands-on experience building a complete mobile application using React Native and Expo, integrating external APIs, and managing persistent user data on a real device.

🎯 Development Journey
Timeline & Approach

Duration: Built iteratively as a personal project

Process: Feature-by-feature development with real-device testing

Focus: Practical functionality, responsive UI, and reliable notifications

Platform: iOS testing via Expo Go

Throughout development, I focused on creating a realistic user experience while learning how mobile apps manage state, notifications, and external data.

🧠 Skills I Developed Through This Project
Mobile App Development

Building multi-screen mobile applications with React Native

Navigation between screens using React Navigation

Managing application state across components

Creating reusable components and modular project structure

Debugging and testing on a physical device

API Integration

Fetching real-time weather data from the Open-Meteo API

Using device GPS coordinates to determine location

Handling API loading states and error conditions

Implementing manual refresh and data updates

Data Persistence

Storing hydration data locally using AsyncStorage

Saving user preferences such as weight and activity level

Persisting hydration history and streak tracking

Managing daily reset logic for hydration tracking

Notification Systems

Scheduling local push notifications

Implementing reminder logic based on user behavior

Preventing notification spam using time checks

Supporting customizable quiet hours

Feature Engineering & App Logic

Calculating personalized hydration goals based on user profile

Applying weather-based adjustments to daily water intake

Tracking hydration progress throughout the day

Implementing achievement badges and streak tracking

⚡ Technical Focus Areas
What I Worked On

Designing a complete mobile application architecture

Integrating real-time weather data with user personalization

Implementing reminder systems that adapt to user activity

Creating hydration progress visualization

Managing persistent user data across app sessions

Skills I Leveled Up

React Native component design

Custom React hooks for reusable logic

Mobile notification scheduling

API consumption and data handling

Project organization and GitHub workflow

🚀 How to Run the Project
Prerequisites

Node.js (v18 or higher)

Expo CLI

Expo Go installed on your mobile device

Both computer and phone connected to the same WiFi network

Installation
git clone https://github.com/lucckkyyy/aquatrack.git
cd aquatrack
npm install --legacy-peer-deps
Run the Application
npx expo start --lan

Scan the QR code using your phone camera and open the project in Expo Go.

🏗️ Project Structure
├── App.js
├── app.json
└── src
    ├── screens
    ├── components
    ├── hooks
    ├── utils
    └── constants

This structure keeps UI components, logic, and utilities organized for scalability.

✨ Key Features

💧 Personalized hydration goals based on user profile

🌡 Real-time weather data integration

📍 Location-based weather insights

🔔 Smart hydration reminders

📊 Hydration progress tracking and history

🔥 Daily streak tracking and achievements

↩ Undo last hydration entry

🌙 Customizable quiet hours

👤 User profile customization

🛣️ Future Improvements

Potential features planned for future iterations:

Apple Health integration

Social hydration challenges

Custom bottle size tracking

Advanced hydration analytics

App Store / TestFlight release

🌱 Learning Outcome

AquaTrack represents one of my most complete personal projects. It helped me understand how to take an idea from concept to a working mobile application, integrate live data sources, and design features that solve a real-world problem.

Through this project, I significantly improved my understanding of mobile development, API integration, and real-world application architecture.

Author: Aryan Rajguru
