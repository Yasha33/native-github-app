import React, { useRef, useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { AntDesign, Feather } from '@expo/vector-icons';
import { Context } from '../context/context'

export default function Menu(props) {
    const inputEl = useRef(null);
    const { searchUser } = useContext(Context);
    const [searchName, setSearchName] = useState(null);

    return (
        <TouchableOpacity style={styles.wrapper} onPress={() => inputEl.current.focus()} >
            <TouchableOpacity style={styles.buttons}>
                <AntDesign name="staro" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
                placeholder='Enter name'
                style={styles.input}
                pointerEvents="none"
                ref={inputEl}
                value={searchName}
                onChangeText={(setSearchName)}
                autoCorrect={false}

            />
            <TouchableOpacity onPress={() => searchUser(searchName)} style={styles.buttons}>
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