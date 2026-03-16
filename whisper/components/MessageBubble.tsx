import { Message, MessageSender } from "@/types";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { format, isToday, isYesterday } from "date-fns";

// Date separator shown between message groups
export function DateSeparator({ date }: { date: string }) {
    const d = new Date(date);
    let label = format(d, "MMM d, yyyy");
    if (isToday(d)) label = "Today";
    else if (isYesterday(d)) label = "Yesterday";

    return (
        <View className="items-center my-4">
            <View className="bg-surface-card/80 px-4 py-1.5 rounded-full">
                <Text className="text-subtle-foreground text-[11px] font-medium">
                    {label}
                </Text>
            </View>
        </View>
    );
}

// Typing indicator with animated dots feel
export function TypingIndicator({ avatar }: { avatar?: string }) {
    return (
        <View className="flex-row justify-start items-end gap-2 mb-1">
            {avatar && (
                <Image
                    source={{ uri: avatar }}
                    style={{ width: 24, height: 24, borderRadius: 12 }}
                />
            )}
            <View className="bg-surface-card rounded-2xl rounded-bl-sm border border-surface-light px-4 py-3">
                <View className="flex-row items-center gap-1">
                    <View className="w-2 h-2 rounded-full bg-muted-foreground opacity-40" />
                    <View className="w-2 h-2 rounded-full bg-muted-foreground opacity-60" />
                    <View className="w-2 h-2 rounded-full bg-muted-foreground opacity-80" />
                </View>
            </View>
        </View>
    );
}

function MessageBubble({ message, isFromMe, showAvatar }: {
    message: Message;
    isFromMe: boolean;
    showAvatar?: boolean;
}) {
    const time = message.createdAt ? format(new Date(message.createdAt), "h:mm a") : "";
    const isOptimistic = message._id.startsWith("temp-");
    const senderAvatar = !isFromMe && typeof message.sender !== "string"
        ? (message.sender as MessageSender).avatar
        : undefined;

    return (
        <View className={`flex-row ${isFromMe ? "justify-end" : "justify-start"} items-end gap-2`}>
            {/* Participant avatar for received messages */}
            {!isFromMe && (
                <View style={{ width: 28 }}>
                    {showAvatar && senderAvatar ? (
                        <Image
                            source={{ uri: senderAvatar }}
                            style={{ width: 28, height: 28, borderRadius: 14 }}
                        />
                    ) : null}
                </View>
            )}

            <View
                className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl ${isFromMe
                    ? "bg-primary rounded-br-sm"
                    : "bg-surface-card rounded-bl-sm border border-surface-light"
                    }`}
                style={isOptimistic ? { opacity: 0.6 } : undefined}
            >
                <Text className={`text-[15px] leading-5 ${isFromMe ? "text-surface-dark" : "text-foreground"}`}>
                    {message.text}
                </Text>
                <Text
                    className={`text-[10px] mt-1 ${isFromMe ? "text-surface-dark/50" : "text-muted-foreground"} text-right`}
                >
                    {isOptimistic ? "Sending..." : time}
                </Text>
            </View>
        </View>
    );
}

export default MessageBubble;