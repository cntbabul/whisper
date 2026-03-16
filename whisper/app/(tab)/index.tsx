import { Text, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useRouter } from 'expo-router';
import { useChats } from '@/hooks/useChats';
import { ChatTabLoading } from '@/components/ChatSkeleton';
import Header from '@/components/Header';
import ChatItem from '@/components/ChatItem';
import type { Chat } from '@/types';
import EmptyUI from '@/components/EmptyUI';
import { useSocketStore } from '@/lib/socket';

const ChatsTab = () => {
    const router = useRouter();
    const { data: chats, isLoading, error, refetch } = useChats();
    const { onlineUsers, typingUsers, unreadChats, isConnected } = useSocketStore();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);

    if (isLoading) {
        return <ChatTabLoading />;
    }

    if (error) {
        return (
            <View className='flex-1 bg-surface-dark items-center justify-center p-6'>
                <Text className='text-red-400 text-xl font-bold mb-3'>Oops! Something went wrong.</Text>
                <Text className='text-white/60 text-center mb-6'>
                    {error?.message || 'Failed to load chats. Please try again.'}
                </Text>
                <TouchableOpacity
                    className='bg-primary px-6 py-3 rounded-full'
                    onPress={() => refetch()}
                >
                    <Text className='text-surface-dark font-semibold'>Retry</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const handleChatPress = (chat: Chat) => {
        router.push({
            pathname: "/chat/[id]",
            params: {
                id: chat._id,
                participantId: chat.participant._id,
                name: chat.participant.name,
                avatar: chat.participant.avatar,
            }
        });
    }

    return (
        <View className="flex-1 bg-surface-dark">
            <FlatList
                data={chats}
                keyExtractor={(item) => item._id}
                extraData={{ onlineUsers, typingUsers, unreadChats }}
                renderItem={({ item }) => (
                    <ChatItem
                        chat={item}
                        onPress={() => handleChatPress(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
                ListHeaderComponent={<Header />}
                ListEmptyComponent={<EmptyUI
                    title="No chats yet"
                    subtitle="Start a new conversation !"
                    buttonLabel="New Chat"
                    onPressButton={() => router.push("/new-chat")}
                />}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#F4A261"
                        colors={["#F4A261"]}
                        progressBackgroundColor="#1a1a1d"
                    />
                }
                ItemSeparatorComponent={() => (
                    <View className="h-px bg-surface-light/15 ml-[70px]" />
                )}
            />

            {/* Connection status bar */}
            {!isConnected && (
                <View className="absolute bottom-24 left-4 right-4 bg-red-500/90 rounded-full px-4 py-2 items-center">
                    <Text className="text-white text-xs font-medium">No connection — messages may be delayed</Text>
                </View>
            )}
        </View>
    )
}

export default ChatsTab