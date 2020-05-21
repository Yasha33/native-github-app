import React, { useContext, useRef, useState } from 'react';
import { TouchableOpacity, StyleSheet, Image, Text, Dimensions } from 'react-native';
import { Context } from '../context/context';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function ItemLists({ item }) {
    const { selectedUser, loadingIndicator, changeFavoriteStatus } = useContext(Context);
    const navigation = useNavigation();

    const select = async () => {
        loadingIndicator(true);
        await selectedUser(item.login);
        loadingIndicator(false);
        navigation.navigate('Details');
    }
    const favorite = () => changeFavoriteStatus(item.login, item.favorite);

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={select}
        >
            <Image
                style={styles.image}
                source={{ uri: item.avatar_url }}
            />
            <Text style={styles.text}>{item.login}</Text>
            <TouchableOpacity
                style={styles.star}
                onPress={favorite} >
                {!item.favorite ? <AntDesign name="staro" size={24} color="black" /> : <AntDesign name="star" size={24} color="gold" />}
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        shadowColor: '#000',
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: { width: 3, height: 2 },
        elevation: 4,
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        width: '99%'
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 10,

    },
    text: {
        maxWidth: Dimensions.get('window').width - 170,
        marginLeft: -20
    },
    star: {
        padding: 15,
    }
})