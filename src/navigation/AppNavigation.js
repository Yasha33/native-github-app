import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from '../screens/MainScreen';
import UserScreen from '../screens/UserScreen';

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
         headerMode={null}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={MainScreen} options={{ title: 'Find user' }} />
        <Stack.Screen name="Details" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
