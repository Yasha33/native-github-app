import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import {View, Text} from 'react-native'


export default function () {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FontAwesome5 name="users" size={100} color="gray" />
            <Text style={{ color: 'gray' }}>Not Found</Text>
        </View>
    )

}