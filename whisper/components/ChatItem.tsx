import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import type { Chat } from '@/types'
import { formatDistanceToNow } from 'date-fns'
import { useSocketStore } from '@/lib/socket';
import { Ionicons } from '@expo/vector-icons';

interface ChatItemProps {
    chat: Chat;
    onPress: () => void;
}

const ChatItem = ({ chat, onPress }: ChatItemProps) => {
    const isOnline = useSocketStore((state) =>
        chat.participant ? state.onlineUsers.has(chat.participant._id) : false
    );
    const isTyping = useSocketStore((state) =>
        chat.participant ? state.typingUsers.get(chat._id) === chat.participant._id : false
    );
    const hasUnread = useSocketStore((state) => state.unreadChats.has(chat._id));

    if (!chat) return null;

    const participant = chat.participant;

    return (
        <Pressable
            onPress={onPress}
            className='flex-row items-center py-3.5 active:opacity-70'
        >
            {/* Avatar with online indicator */}
            <View className='relative'>
                {participant?.avatar ? (
                    <Image
                        source={{ uri: participant.avatar }}
                        style={{ width: 54, height: 54, borderRadius: 27 }}
                    />
                ) : (
                    <View
                        className='w-[54px] h-[54px] items-center justify-center rounded-full bg-surface-card border border-surface-light/30'
                    >
                        <Text className='text-primary font-bold text-lg'>
                            {participant?.name?.charAt(0).toUpperCase() || '?'}
                        </Text>
                    </View>
                )}
                {isOnline && (
                    <View
                        className='absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-[2.5px] border-surface-dark'
                        style={{
                            shadowColor: '#22c55e',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.4,
                            shadowRadius: 3,
                            elevation: 3,
                        }}
                    />
                )}
            </View>

            {/* Content */}
            <View className='flex-1 ml-3.5'>
                <View className='flex-row items-center justify-between'>
                    <Text
                        className={`text-[15px] font-semibold flex-1 mr-2 ${hasUnread ? 'text-foreground' : 'text-foreground/90'}`}
                        numberOfLines={1}
                    >
                        {participant?.name || 'Unknown'}
                    </Text>
                    <Text className={`text-[11px] ${hasUnread ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                        {chat.lastMessageAt
                            ? formatDistanceToNow(new Date(chat.lastMessageAt), { addSuffix: false }) : ""}
                    </Text>
                </View>

                <View className='flex-row items-center justify-between mt-1'>
                    <View className='flex-1 flex-row items-center gap-1.5'>
                        {isTyping ? (
                            <View className="flex-row items-center gap-1">
                                <Ionicons name="ellipsis-horizontal" size={14} color="#F4A261" />
                                <Text className='text-sm text-primary font-medium'>typing...</Text>
                            </View>
                        ) : (
                            <>
                                <Text
                                    className={`text-sm flex-1 ${hasUnread ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                                    numberOfLines={1}
                                >
                                    {chat.lastMessage?.text || "Tap to start chatting"}
                                </Text>
                            </>
                        )}
                    </View>
                    {hasUnread && (
                        <View className='w-2.5 h-2.5 bg-primary rounded-full ml-2' />
                    )}
                </View>
            </View>
        </Pressable>
    )
}

export default ChatItem