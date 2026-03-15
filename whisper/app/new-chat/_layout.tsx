import { Stack } from "expo-router"



const NewChatLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name="index" />
        </Stack>
    )
}

export default NewChatLayout