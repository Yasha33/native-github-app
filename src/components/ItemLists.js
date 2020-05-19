import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, Image, Text, Dimensions } from 'react-native';
import { Context } from '../context/context';
import { useNavigation } from '@react-navigation/native';

export default function ItemLists({ item }) {
    const { selectedUser, loadingIndicatorOn,loadingIndicatorOff, loading } = useContext(Context);
    const navigation = useNavigation();

    const select = async() => {
        loadingIndicatorOn();
        await selectedUser(item.login);
        loadingIndicatorOff();
        navigation.navigate('Details');
    }
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
        justifyContent: 'flex-start',
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
        marginLeft: 20
    }
})