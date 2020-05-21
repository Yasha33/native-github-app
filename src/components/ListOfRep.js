import React, { useContext } from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import { Context } from '../context/context';
import ItemRep from './ItemRep';


export default function ListOfRep(props) {
    const { userInfo } = useContext(Context);
    return (
        <FlatList
            style={styles.wrapper}
            data={userInfo.rep}
            renderItem={({ item }) => <ItemRep title={item} />}
            keyExtractor={item => item.name}
        />
    )
}
const styles = StyleSheet.create({
    wrapper: {
        width: '100%'
    }
})