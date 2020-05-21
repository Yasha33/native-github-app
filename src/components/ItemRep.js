import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ItemRep({ title }) {
    return (
        <TouchableOpacity style={styles.box}>
            <Text style={styles.textCente}>{title.name}</Text>
            <Text>ID:{title.id}</Text>
            <Text>Stars:{title.forks}</Text>
            <Text>Created at:{title.created.split('T')[0]} </Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    box: {
        shadowColor: '#000',
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: { width: 3, height: 2 },
        elevation: 4,
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
        width: '99%',
        padding:3
    },
    textCente: {
        fontSize: 18,
        padding:5
    },
})