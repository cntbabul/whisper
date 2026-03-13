import React from 'react'
import { Redirect, Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@clerk/expo';

const TabsLayout = () => {
    const { isSignedIn, isLoaded } = useAuth()
    if (!isLoaded) return null
    if (!isSignedIn) return <Redirect href="/(auth)" />
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#0d0d0f" }}>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: "#0d0d0f",
                        borderTopColor: "#1a1a1d",
                        borderTopWidth: 1,
                        height: 88,
                    },
                    tabBarActiveTintColor: "#f4a261",
                    tabBarInactiveTintColor: "#6b6b70",
                    tabBarLabelStyle: { fontSize: 12, fontWeight: "600" }
                }}
            >
                <Tabs.Screen name="index" options={{
                    headerShown: false,
                    title: "Chats", tabBarIcon: ({ color, focused, size }) => (
                        <Ionicons name={focused ? "chatbubbles" : "chatbubbles-outline"} size={size} color={color} />
                    )
                }} />
                <Tabs.Screen
                    name="profile"
                    options={{
                        headerShown: false,
                        title: "Profile",
                        tabBarIcon: ({ color, focused, size }) => (
                            <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
                        )
                    }} />
            </Tabs>
        </SafeAreaView>
    )
}

export default TabsLayout