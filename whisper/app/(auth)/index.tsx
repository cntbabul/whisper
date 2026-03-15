import { View, Text, Pressable, ActivityIndicator, Dimensions } from 'react-native'
import React from 'react'
import logo from '@/assets/images/logo.png'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import useAuthSocial from '@/hooks/useSocialAuth'
import AnimatedBackground from '@/components/AnimatedBackground'

const { width, height } = Dimensions.get('window')

const AuthScreen = () => {
    const { handleSocialAuth, loadingStrategy } = useAuthSocial()
    const isLoading = loadingStrategy !== null

    return (
        <View className='flex-1 bg-surface-dark'>
            <View className='absolute inset-0 overflow-hidden bg-surface-dark'>
                <AnimatedBackground />
            </View>
            <SafeAreaView className='flex-1'>
                <View className='items-center pt-7'>
                    <Image source={logo}
                        style={{ width: 100, height: 100, marginVertical: -2 }}
                        contentFit='contain'
                    />
                    <Text className='text-4xl font-bold text-primary-light font-serif tracking-wider uppercase' >
                        Whisper
                    </Text>
                </View>
                <View className='flex-1 justify-center items-center px-6'>
                    <Image
                        source={require('@/assets/images/auth.png')}
                        style={{ width: width - 48, height: height * 0.3 }}
                        contentFit='contain'
                    />
                    <View className='mt-6 items-center'>
                        <Text className='text-5xl font-bold text-foreground font-sans'>
                            Connect & Chat
                        </Text>
                        <Text className='text-3xl font-bold text-primary-default font-mono'>
                            Seamlessly
                        </Text>

                    </View>
                    {/* auth button  */}
                    <View className='flex-row gap-4 mt-10'>
                        {/* google */}
                        <Pressable
                            className='flex-1 flex-row items-center justify-center gap-2 bg-white/95 py-4 rounded-2xl active:scale-[0.97]'
                            disabled={isLoading}
                            accessibilityRole='button'
                            accessibilityLabel='Sign in with Google'
                            onPress={() => !isLoading && handleSocialAuth("oauth_google")}
                        >{loadingStrategy === "oauth_google" ? <ActivityIndicator color="#000" /> : (
                            <>
                                <Ionicons name='logo-google' size={20} color="#000" />
                                <Text className='text-lg font-bold text-surface-dark'>
                                    Google
                                </Text>
                            </>
                        )}

                        </Pressable>
                        {/* apple */}
                        <Pressable
                            className='flex-1 flex-row items-center justify-center gap-2 bg-white/95 py-4 rounded-2xl active:scale-[0.97]'
                            disabled={isLoading}
                            accessibilityRole='button'
                            accessibilityLabel='Sign in with Apple'
                            onPress={() => !isLoading && handleSocialAuth("oauth_apple")}
                        >
                            {loadingStrategy === "oauth_apple" ? <ActivityIndicator color="#000" /> : (
                                <><Ionicons name='logo-apple' size={20} color="#000" />
                                    <Text className='text-lg font-bold text-surface-dark'>
                                        Apple
                                    </Text>
                                </>
                            )}
                        </Pressable>
                    </View>




                </View>


            </SafeAreaView>
        </View >
    )
}

export default AuthScreen