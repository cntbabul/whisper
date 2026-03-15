# Ai generated readme file
# Whisper Project

Welcome to the **Whisper** project! This repository contains the complete source code for our cross-platform application. It is structured as a monorepo setup consisting of three main components: a mobile app, a web app, and a backend server.

## Overview of the Project Structure

- `whisper/` - The mobile application built with React Native and Expo.
- `web/` - The frontend web application built with React and Vite.
- `backend/` - The API server built with Express and Bun.

---

## 1. Whisper / Expo App (Mobile)

The mobile application is located in the `whisper` directory. It uses Expo Router for file-based navigation and NativeWind for Tailwind styling.

### Key Tools & Libraries
- **Framework:** React Native with Expo (SDK 54)
- **Routing:** Expo Router
- **Styling:** NativeWind (TailwindCSS v3)
- **Authentication:** Clerk (`@clerk/expo`)
- **Data Fetching/Mutation:** React Query (`@tanstack/react-query`) & Axios
- **Error Tracking:** Sentry (`@sentry/react-native`)

### Development Notes
- The app uses file-based routing within the `app/` directory.
- Ensure that environment variables for Clerk (e.g., publishable key) and your backend API URL are set in your `.env` file within the `whisper/` directory.

---

## 2. Web App (Frontend)

The web application is located in the `web` directory. It is a React 19 application utilizing Vite for extremely fast builds and hot module replacement (HMR).

### Key Tools & Libraries
- **Framework:** React 19
- **Bundler:** Vite
- **Authentication:** Clerk (`@clerk/react`)
- **Linting:** ESLint

### Development Notes
- The entry configurations are managed by Vite.
- Just like the mobile app, set up your `.env` file with Clerk publishable keys to ensure authentication processes correctly.

---

## 3. Backend (API)

The backend server is located in the `backend` directory. It offers REST API endpoints and real-time WebSocket connections to support the client apps.

### Key Tools & Libraries
- **Runtime:** Bun
- **Framework:** Express (v5)
- **Database:** MongoDB & Mongoose
- **Real-time:** Socket.io
- **Authentication:** Clerk (`@clerk/express`)
- **Language:** TypeScript

### Development Notes
- The server runs natively on Bun which provides fantastic performance and built-in, out-of-the-box TypeScript support.
- Ensure your MongoDB connection string (and Clerk secret key) is configured in your `.env` before attempting to boot up the server.

---

## Project Tech Stack Reminder

To recap, here is your core project tech stack:
- **Language:** TypeScript across all three environments for type safety.
- **Frontend / Mobile:** React, React Native, Expo, TailwindCSS (NativeWind), Vite.
- **Backend:** Bun, Express, Socket.io.
- **Database:** MongoDB (via Mongoose).
- **Authentication:** Clerk ecosystem (`@clerk/expo`, `@clerk/react`, `@clerk/express`).
- **Data Fetching:** React Query and Axios.
- **Package Manager:** `bun` or `npm`.

---

## Development Workflow

Here is the standard workflow to get up and running locally:

### Prerequisites
Make sure you have [Bun](https://bun.sh/) installed, as it is heavily used to run the backend and install packages quickly. A running MongoDB instance is also required.

### 1. Start the Backend API
Open a terminal, navigate to the `backend` directory, install dependencies, and start the development server:
```bash
cd backend
bun install
bun run dev
```

### 2. Start the Web App
Open a second terminal, navigate to the `web` directory, install dependencies, and start the Vite dev server:
```bash
cd web
bun install
bun run dev
```

### 3. Start the Expo Mobile App
Open a third terminal, navigate to the `whisper` directory, install dependencies, and start the Expo development environment:
```bash
cd whisper
bun install
bunx expo start
```
From the Expo terminal, you can press `i` to open the iOS simulator, `a` for the Android emulator, or scan the generated QR code to open the app on your physical device using the Expo Go application.
