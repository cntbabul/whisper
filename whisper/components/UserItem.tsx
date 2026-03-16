import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { User } from '@/types';
import { useSocketStore } from '@/lib/socket';

interface UserItemProps {
    user: User;
    onPress: () => void;
    disabled?: boolean;
}

const UserItem: React.FC<UserItemProps> = ({ user, onPress, disabled }) => {
    const isOnline = useSocketStore((state) => state.onlineUsers.has(user._id));
    return (
        <View>
            <TouchableOpacity
                className="py-3 flex-row items-center"
                onPress={onPress}
                disabled={disabled}
                activeOpacity={0.7}
            >
                <View className="relative">
                    <View className="w-12 h-12 rounded-full bg-surface-light overflow-hidden items-center justify-center border border-surface-light/30">
                        {user.avatar ? (
                            <Image
                                source={{ uri: user.avatar }}
                                style={{ width: '100%', height: '100%' }}
                                contentFit="cover"
                                transition={200}
                                cachePolicy="memory-disk"
                            />
                        ) : (
                            <Text className="text-primary font-bold text-lg">
                                {user.name?.[0]?.toUpperCase() || '?'}
                            </Text>
                        )}
                    </View>

                    {/* Status Indicator */}
                    {isOnline && (
                        <View
                            className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-surface"
                            style={{
                                shadowColor: '#10b981',
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.5,
                                shadowRadius: 4,
                                elevation: 5
                            }}
                        />
                    )}
                </View>

                <View className="ml-4 flex-1">
                    <Text className="text-foreground text-base font-semibold" numberOfLines={1}>
                        {user.name}
                    </Text>
                    <Text className="text-muted-foreground text-xs" numberOfLines={1}>
                        {user.email}
                    </Text>
                </View>
                <Text className="text-xs text-primary">{isOnline ? 'Online' : 'Offline'}</Text>
            </TouchableOpacity>
            <View className="h-px bg-surface-light/20 ml-16" />
        </View>
    );
};

export default UserItem;