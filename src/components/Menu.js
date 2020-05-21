import React, { useRef, useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import { AntDesign, Feather } from '@expo/vector-icons';
import { Context } from '../context/context'

export default function Menu() {
    const inputEl = useRef(null);
    const { searchUser, loadFavorite, loadingIndicator, inFavoriteChange, input, changeInput } = useContext(Context);
    const [changeFavorite, setChangeFavorite] = useState(false);

    const favotite = () => {
        Keyboard.dismiss();
        inFavoriteChange(!changeFavorite);
        if (!changeFavorite) {
            loadFavorite();
        }
        else {
            searchUser(input);
        }
        setChangeFavorite(!changeFavorite);
    }

    const search = async () => {
        if (input) {
            setChangeFavorite(false);
            loadingIndicator(true);
            await searchUser(input);
            loadingIndicator(false);
        }
        else {
            setChangeFavorite(false);
            searchUser(input);
        }
        inFavoriteChange(false);
    }

    return (
        <TouchableOpacity style={styles.wrapper} onPress={() => inputEl.current.focus()} >
            <TouchableOpacity style={styles.buttons} onPress={favotite} >
                {!changeFavorite
                    ? <AntDesign name="staro" size={24} color="black" />
                    : <AntDesign name="star" size={24} color="gold" />}
            </TouchableOpacity>
            <TextInput
                placeholder='Enter username'
                style={styles.input}
                pointerEvents="none"
                ref={inputEl}
                value={input}
                onChangeText={(changeInput)}
                onSubmitEditing={search}
                autoCorrect={false}
                maxLength={30}
            />
            <TouchableOpacity onPress={search} style={styles.buttons}>
                <Feather name="search" size={24} color="black" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    input: {
        flexGrow: 1,
        height: '100%',
        textAlign: 'center',
    },
    buttons: {
        padding: 10
    },
    wrapper: {
        height: 50,
        marginTop: 30,
        shadowColor: '#000',
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        elevation: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})