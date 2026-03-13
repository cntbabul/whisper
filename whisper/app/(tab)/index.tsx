import { Text, ScrollView, Button } from 'react-native'
import React from 'react'
import * as Sentry from '@sentry/react-native'


const ChatsTab = () => {
    return (
        <ScrollView
            className='bg-surface-dark flex-1' contentInsetAdjustmentBehavior='automatic'>
            <Text className='text-white'>ChatsTab</Text>
            <Button title='Try!' onPress={() => { Sentry.captureException(new Error('First error')) }} />

        </ScrollView>
    )
}

export default ChatsTab