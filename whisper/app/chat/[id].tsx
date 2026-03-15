import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'

const ChatScreen = () => {
    const router = useRouter();
    const { id, participantId, name, avatar } = useLocalSearchParams();



    return (
        <View className="flex-1 bg-surface-dark items-center justify-center">
            <Text className="text-white text-xl">Chat Screen for ID: {id}</Text>
            <Text className="text-white text-xl">Chat Screen for name: {name}</Text>

            <TouchableOpacity
                onPress={() => router.back()}
                className="mt-4 bg-primary px-6 py-2 rounded-full"
            >
                <Text className="text-surface-dark font-bold">Go Back</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ChatScreen
