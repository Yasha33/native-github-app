import React, { useContext } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ItemLists from './ItemLists'
import { Context } from '../context/context';

export default function ListUsers (props){

    const {users}=useContext(Context)
    return (
        <FlatList 
        style={styles.container}
        data={users}
        renderItem={({item})=> <ItemLists item={item}></ItemLists>}
        keyExtractor={item=>item.login}
        />   
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:7,
        padding:7,
    }
})