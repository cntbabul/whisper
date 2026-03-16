import React, { useState, useMemo } from 'react';
import { View, Text, SectionList, TextInput, ActivityIndicator, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useUsers } from '@/hooks/useUsers';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as Haptics from 'expo-haptics';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useGetOrCreateChat } from '@/hooks/useChats';
import { User } from '@/types';
import UserItem from '@/components/UserItem';

const NewChatScreen = () => {
    const router = useRouter();
    const { data: allUsers, isLoading } = useUsers();
    const { mutate: getOrCreateChat, isPending: isCreatingChat } = useGetOrCreateChat()
    const [searchQuery, setSearchQuery] = useState('');
    //todo:const [creatingChat, setCreatingChat] = useState<string | null>(null);

    // Group users by first letter
    const users = allUsers?.filter((u) => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase()
        return u.name?.toLowerCase().includes(query) || u.email?.toLowerCase()?.includes(query);
    })

    const sections = useMemo(() => {
        if (!users) return [];

        const groups = users.reduce((acc, user) => {
            const char = (user.name?.[0] || '?').toUpperCase();
            if (!acc[char]) acc[char] = [];
            acc[char].push(user);
            return acc;
        }, {} as Record<string, User[]>);

        return Object.keys(groups)
            .sort()
            .map(char => ({
                title: char,
                data: groups[char].sort((a, b) => (a.name || '').localeCompare(b.name || ''))
            }));
    }, [users]);


    const handleUserSelect = (user: User) => {
        getOrCreateChat(user._id, {
            onSuccess: (chat) => {
                router.dismiss()
                setTimeout(() => {
                    router.push({
                        pathname: "/chat/[id]",
                        params: {
                            id: chat._id,
                            participantId: chat.participant._id,
                            name: chat.participant.name,
                            avatar: chat.participant.avatar
                        }
                    })
                }, 100)
            }
        })
    }

    if (isLoading) {
        return (
            <View className="flex-1 bg-surface-dark items-center justify-center">
                <Animated.View entering={FadeIn}>
                    <ActivityIndicator size="large" color="#f4a261" />
                    <Text className="text-muted-foreground mt-4 font-medium">Finding friends...</Text>
                </Animated.View>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1" edges={['top', "bottom"]}>
            <View className="flex-1 bg-black/40 justify-end" >
                <View className="bg-surface rounded-t-3xl h-[95%] overflow-hidden">
                    {/* Elegant Header */}
                    <View className='px-5 pt-3 pb-3 bg-surface border-b border-surface-light flex-row items-center'>
                        <Pressable
                            className="w-9 h-9 rounded-full items-center justify-center mr-2 bg-surface-card"
                            onPress={() => {
                                Haptics.selectionAsync();
                                router.back();
                            }}
                        >
                            <Ionicons name="close" size={20} color="#f4a261" />
                        </Pressable>
                        <View className='flex-1 ml-5'>
                            <Text className="text-xl font-semibold text-foreground ">New Chat</Text>
                            <Text className="text-muted-foreground text-xs mt-0.5">Search for a user to start chatting</Text>
                        </View>
                    </View>
                    {/*  Search Bar */}
                    <View className="px-5 pt-3 pb-2 bg-surface">
                        <View className="flex-row items-center bg-surface-card rounded-full px-3 py-1.5 gap-2 border border-surface-light">
                            <Ionicons name="search" size={20} color="#f4a261" />
                            <TextInput
                                placeholder="Search for people..."
                                placeholderTextColor="#6B6B70"
                                className="flex-1 text-foreground text-sm"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                selectionColor="#f4a261"
                                autoCapitalize='none'
                            />
                            {searchQuery.length > 0 && (
                                <Pressable onPress={() => setSearchQuery('')}>
                                    <Ionicons name="close-circle" size={20} color="#6B6B70" />
                                </Pressable>
                            )}
                        </View>
                    </View>
                    {/* user list  */}
                    <View className='flex-1 bg-surface'>
                        {isCreatingChat || isLoading ? (
                            <View className='flex-1 items-center justify-center'>
                                <ActivityIndicator size="large" color="#f4a261" />
                            </View>
                        ) : (
                            <SectionList
                                sections={sections}
                                keyExtractor={(user) => user._id}
                                stickySectionHeadersEnabled={false}
                                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 50 }}
                                renderSectionHeader={({ section: { title } }) => (
                                    <Text className="text-primary font-bold text-xs mt-4 mb-2 ml-1 opacity-60">
                                        {title}
                                    </Text>
                                )}
                                renderItem={({ item: user }) => (
                                    <UserItem
                                        user={user}
                                        onPress={() => handleUserSelect(user)}
                                        disabled={isCreatingChat}
                                    />
                                )}
                                ListEmptyComponent={() => (
                                    <View className="items-center justify-center mt-20">
                                        <Ionicons name="people-outline" size={40} color="#6B6B70" />
                                        <Text className="text-muted-foreground mt-2">No users found</Text>
                                    </View>
                                )}
                            />
                        )}
                    </View>

                </View>
            </View>


        </SafeAreaView>
    );
};

export default NewChatScreen;

