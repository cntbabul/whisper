import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = () => {
    const router = useRouter();

    return (
        <SafeAreaView edges={['top']} className="bg-surface-dark">
            <View className='px-1 pt-2 pb-4'>
                <View className='flex-row items-center justify-between'>
                    <View>
                        <Text className='text-2xl font-bold text-foreground'>Chats</Text>
                        <Text className='text-xs text-muted-foreground mt-0.5'>Your conversations</Text>
                    </View>
                    <Pressable
                        className='w-10 h-10 bg-primary rounded-full items-center justify-center active:scale-95'
                        onPress={() => router.push("/new-chat")}
                        style={{
                            shadowColor: '#F4A261',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 6,
                            elevation: 5,
                        }}
                    >
                        <Ionicons name='create-outline' size={20} color='#0D0D0F' />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Header