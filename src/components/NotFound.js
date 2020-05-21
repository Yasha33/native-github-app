import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FontAwesome5 name="users" size={100} color="gray" />
            <Text style={{ color: 'gray' }}>Not Found</Text>
        </View>
    )
}