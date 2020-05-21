import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Context } from '../context/context';
import ButtonBack from '../components/ButtonBack';
import ListOfRep from '../components/ListOfRep';
import NotFoundRep from '../components/NotFoundRep';

export default function UserScreen() {
  const { userInfo } = useContext(Context);

  const content = userInfo.rep.length ? <ListOfRep /> : <NotFoundRep />

  return (
    <View style={styles.wrapper}>
      <ButtonBack />
      <Image style={styles.avatar} source={{ uri: userInfo.avatar_url }} />
      <Text style={styles.text}>{userInfo.login}</Text>
      {content}
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 25,
  },
  text: {
    margin: 15,
    fontSize: 20,
  }
})