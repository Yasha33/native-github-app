import React, { useContext, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Image, Text, Dimensions, Alert } from 'react-native';
import { Context } from '../context/context';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-easy-toast';

export default function ItemLists({ item }) {
    const { selectedUser, loadingIndicator, changeFavoriteStatus} = useContext(Context);
    const navigation = useNavigation();
    const toast = useRef(null);

    const select = async () => {
        loadingIndicator(true);
        await selectedUser(item.login);
        loadingIndicator(false);
        navigation.navigate('Details');
    }

    const longPress= async()=>{
        const status = await changeFavoriteStatus(item.login);
        Alert.alert(status);
        // toast.current.show(status,700);
    }
    return (
        <>
            <TouchableOpacity
                style={styles.button}
                onPress={select}
                onLongPress={longPress}
            >
                <Image
                    style={styles.image}
                    source={{ uri: item.avatar_url }}
                />
                <Text style={styles.text}>{item.login}</Text>

            </TouchableOpacity>
            <Toast
                style={{ backgroundColor: null }}
                textStyle={{ color: 'black' }}
                position='center'
                ref={toast} />
        </>
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