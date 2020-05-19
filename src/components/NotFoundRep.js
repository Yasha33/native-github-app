import React from 'react';
import { View, Text} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function NotFoundRep() {
    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
            <AntDesign name="github" size={80} color="gray" />
            <Text style={{ color: 'gray' }}>No public repositories</Text>
        </View>
    )
}