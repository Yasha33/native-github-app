import React from 'react';
import { TouchableOpacity, StyleSheet, Image, Text, Dimensions } from 'react-native';

export default function ItemLists ({item}){
    return (
        <TouchableOpacity style={styles.button}>
            <Image 
                style={styles.image}
                source={{uri: item.avatar_url}}
            />
            <Text style={styles.text}>{item.login}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        shadowColor: '#000',
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: { width: 3, height: 2 },
        elevation: 4,
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom:10,
    },
    image:{
        height:100,
        width:100,
        borderRadius:10,

    },
    text:{
        maxWidth: Dimensions.get('window').width-170,
        marginLeft:20
    }
})