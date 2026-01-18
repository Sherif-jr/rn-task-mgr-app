# Task Manager App

A modern, cross-platform task management application built with React Native and Expo. Manage your daily tasks with an intuitive interface and smooth user experience.

## Features

- **Task Management**: Create, read, mark complete, and delete tasks (with undo option)
- **Offline Support**: Works without an internet connection
- **Cross-Platform**: Runs on iOS, Android, and web
- **Dark/Light Theme**: Built-in theme support
- **Haptic Feedback**: Tactile response for better user interaction

## Prerequisites

- Node.js
- npm or yarn
- A mobile device with `Expo Go` app,

or an emulator/simulator + android studio or xcode

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sherif-jr/rn-task-mgr-app.git
   cd rn-task-mgr-app
   ```

2. **Install dependencies**

   ```bash
   yarn
   # or
   npm install
   ```

3. **Start the development server**

   ```bash
   yarn start
   ```

4. **Run the app**
   - Scan the QR code with your device's camera (Expo Go app required)
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser

## Project Structure

```
/app
  /(tabs)         # Main tab navigation
    tasks.tsx     # Tasks screen
    settings.tsx  # App settings
  _layout.tsx     # Root layout
  modal.tsx       # Modal screens
/components       # Reusable UI components
/constants        # App constants and themes
/hooks            # Custom React hooks
/services         # API and service layer
/utils            # Utility functions
```

## Third-Party Libraries

- **Expo**: Framework for building cross-platform apps
- **Expo Router**: Routing and navigation (built on top of react-navigation)
- **AsyncStorage**: Persistent storage for tasks
- **React Native Reanimated**: Smooth animations and gestures
- **Expo Haptics**: Haptic feedback for better UX
- **Expo Vector Icons**: Beautiful icons for the UI
- **React Native Gesture Handler**: Native gestures and touch handling

## Available Scripts

- `yarn start`: Start the development server
- `yarn android`: Run on Android
- `yarn ios`: Run on iOS
- `yarn web`: Run on web
- `yarn lint`: Run ESLint

## Screenshots
<img title="Screenshot 1" height="400" src="https://github.com/user-attachments/assets/2f5d6ef6-8fe9-447c-b826-0aa8f8779541" >
<img title="Screenshot 2" height="400" src="https://github.com/user-attachments/assets/7233957b-906d-4d9d-92d0-73053f591997" >
<img title="Screenshot 3" height="400" src="https://github.com/user-attachments/assets/f95b1187-5185-4c31-ad8b-adaa16aa317d" >
<img title="Screenshot 4" height="400" src="https://github.com/user-attachments/assets/e43e42a3-e840-4448-8a2b-6de94c251850" >
<img title="Screenshot 5" height="400" src="https://github.com/user-attachments/assets/a61ee0d0-1c21-4572-9c7c-473e15214512" >
