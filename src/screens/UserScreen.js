import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Context } from '../context/context';
import ButtonBack from '../components/ButtonBack';
import ListOfRep from '../components/ListOfRep';

export default function UserScreen({ navigation, route }) {
  const { userInfo } = useContext(Context);
  return (
    <View style={styles.wrapper}>
      <ButtonBack/>
      <Image style={styles.avatar} source={{uri:userInfo.avatar_url}}/>
      <Text style={styles.text}>{userInfo.login}</Text>
      <ListOfRep/>


    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingVertical:25,
    paddingHorizontal:10,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  avatar:{
    height:100,
    width: 100,
    borderRadius:25,
  },
  text:{
    margin:15,
    fontSize:20
  }
})