import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import type { Chat } from '@/types'
import { formatDistanceToNow } from 'date-fns'

interface ChatItemProps {
    chat: Chat;
    onPress: () => void;
}

const ChatItem = ({ chat, onPress }: ChatItemProps) => {
    if (!chat) return null;

    const participant = chat.participant;
    const isOnline = true;
    const isTyping = false;
    const hasUnread = false;

    return (
        <Pressable
            onPress={onPress}
            className='flex-row items-center py-3 active:opacity-70'
        >
            {/* Avatar */}
            <View className='relative'>
                {participant?.avatar ? (
                    <>
                        <Image
                            source={{ uri: participant.avatar }}
                            style={{ width: 56, height: 56, borderRadius: 28 }}
                        />
                        {isOnline && (
                            <View className='absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white' />
                        )}
                    </>
                ) : (
                    <View className='w-14 h-14 items-center justify-center bg-blue-100 rounded-full'>
                        <Text className='text-blue-600 font-bold text-lg'>
                            {participant?.name?.charAt(0).toUpperCase() || '?'}
                        </Text>
                    </View>
                )}
            </View>

            {/* Content */}
            <View className='flex-row items-center gap-2'>
                {hasUnread && (<View className='w-2 h-2 bg-primary rounded-full' />)}
                <Text className='text-xs text-subtle-foreground'>
                    {chat.lastMessageAt
                        ? formatDistanceToNow(new Date(chat.lastMessageAt), { addSuffix: false }) : ""}
                </Text>
            </View>
            <View className='flex-row items-center justify-between mt-1'>
                {isTyping ? (
                    <Text className='text-sm text-primary-default italic'>Typing ...</Text>
                ) : (
                    <Text className={`text-sm ${hasUnread ? 'text-foreground font-medium' : 'text-subtle-foreground'}`} numberOfLines={1}>
                        {chat.lastMessage?.text || "No new Message"}
                    </Text>
                )}

            </View>
        </Pressable>
    )
}

export default ChatItem