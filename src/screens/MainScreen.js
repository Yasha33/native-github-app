import React, { useContext } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { Context } from '../context/context';
import Menu from '../components/Menu';
import ListUsers from '../components/ListUsers';
import NotFound from '../components/NotFound';
import ModalLoading from '../components/ModalLoading';

export default function MainScreen() {

  const { users, loading } = useContext(Context);
  const content = users.length ? <ListUsers /> : <NotFound />

  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor='#fff' barStyle='dark-content' />
      <Menu />
      {content}
      <ModalLoading status={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
  }
})