import { useAuth } from '@clerk/expo'
import { Redirect, Stack } from 'expo-router'

const AuthLayout = () => {
    const { isSignedIn, isLoaded } = useAuth()
    if (!isLoaded) {
        return null
    }

    if (isSignedIn) {
        return <Redirect href={'/(tab)'} />
    }
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack >
    )
}

export default AuthLayout