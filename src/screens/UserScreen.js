import React from 'react';
import { View, Text, Button } from 'react-native';

export default function UserScreen({navigation,route}) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{route.params.vasya}</Text>
        <Button title="Go to Home" onPress={() =>navigation.navigate('Home')} />

      </View>
    );
  }