import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
    const router = useRouter();

    return (
        <View className='px-5 pt-2 pb-4'>
            <View className='flex-row items-center justify-between'>
                <Text className='text-2xl font-bold text-foreground'>Chats</Text>
                <Pressable className='size-10 bg-primary rounded-full items-center justify-center'
                    onPress={() => router.push("/new-chat")}
                >
                    <Ionicons name='create-outline' size={20} color='foreground' />
                </Pressable>
            </View>
        </View>
    )
}

export default Header