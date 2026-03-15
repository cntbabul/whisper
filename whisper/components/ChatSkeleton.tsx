import React from 'react';
import { View } from 'react-native';
import { Skeleton } from './ui/Skeleton';

export const ChatSkeleton = () => {
  return (
    <View className="flex-row items-center p-4 border-b border-white/5">
      {/* Avatar Skeleton */}
      <Skeleton width={52} height={52} borderRadius={26} />
      
      <View className="flex-1 ml-4 justify-center">
        <View className="flex-row justify-between items-center mb-1">
          {/* Name Skeleton */}
          <Skeleton width="40%" height={16} borderRadius={4} />
          {/* Time Skeleton */}
          <Skeleton width="12%" height={12} borderRadius={3} />
        </View>
        
        <View className="flex-row justify-between items-center">
          {/* Message Skeleton */}
          <Skeleton width="70%" height={14} borderRadius={4} />
          {/* Unread/Status indicator */}
          <Skeleton width={12} height={12} borderRadius={6} />
        </View>
      </View>
    </View>
  );
};

export const ChatTabLoading = () => {
  return (
    <View className="flex-1 bg-surface-dark pt-8">
      {/* Header mock */}
      <View className="px-5 py-6 mb-2">
          <Skeleton width="40%" height={32} borderRadius={8} />
      </View>
      
      {/* Chat list skeletons */}
      <View className="flex-1">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <ChatSkeleton key={i} />
        ))}
      </View>
    </View>
  );
};
