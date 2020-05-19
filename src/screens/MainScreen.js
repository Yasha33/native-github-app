import React, { useContext, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, Button, ActivityIndicator } from 'react-native';
import Menu from '../components/Menu';
import ListUsers from '../components/ListUsers';
import { Context } from '../context/context';
import NotFound from '../components/NotFound';
import ModalLoading from '../components/ModalLoading';

export default function MainScreen() {

  const {users,loading}=useContext(Context);
  let content = users.length ? <ListUsers/> : <NotFound/>

  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor='#fff' barStyle='dark-content' />
      <Menu />
      {content}
      <ModalLoading status={loading}/>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
  }
})