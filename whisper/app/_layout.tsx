import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import { ClerkProvider } from '@clerk/expo'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { tokenCache } from "@clerk/expo/token-cache";
import AuthSync from "@/components/AuthSync";
import { StatusBar } from "react-native";
import * as Sentry from '@sentry/react-native';
import SocketConnection from "@/components/SocketConnection";

Sentry.init({
  dsn: 'https://798d4293072d4d83a0186793a8725459@o4511035269513216.ingest.us.sentry.io/4511035547516928',

  // Controls collection of PII (Personable Identifiable Information) like IP addresses.
  // Defaults to false for privacy compliance. Opt-in via EXPO_PUBLIC_SENTRY_SEND_DEFAULT_PII='true' environment variable.
  sendDefaultPii: process.env.EXPO_PUBLIC_SENTRY_SEND_DEFAULT_PII === 'true',

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration({ maskAllImages: false, maskAllText: false, })],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

const queryClient = new QueryClient();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file')
}

export default Sentry.wrap(function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <AuthSync />
            <SocketConnection />
            <StatusBar barStyle="light-content" />
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#0d0d0f" } }} >
              <Stack.Screen name="(auth)" options={{ animation: "fade" }} />
              <Stack.Screen name="(tab)" options={{ animation: "fade" }} />
              <Stack.Screen
                name="new-chat"
                options={{
                  animation: "slide_from_bottom",
                  presentation: "modal",
                  gestureEnabled: true,
                  gestureDirection: "vertical",
                  fullScreenGestureEnabled: true,
                  animationDuration: 300
                }}
              />
            </Stack>
          </SafeAreaProvider>
        </QueryClientProvider>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
});
