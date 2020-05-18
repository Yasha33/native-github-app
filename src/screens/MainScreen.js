import React from 'react';
import { View, Text,StatusBar, StyleSheet, Button, ActivityIndicator } from 'react-native';
import Menu from '../components/Menu';
import ListUsers from '../components/ListUsers';

export default function MainScreen({navigation, route}) {
    
    return (
      <View style={styles.wrapper}>
        <StatusBar backgroundColor='#fff' barStyle='dark-content'  />
        <Menu/>
        <ListUsers/>
      </View>
    );
  }

  const styles = StyleSheet.create({
      wrapper:{
          flex:1,
          paddingHorizontal:10,
      }
  })