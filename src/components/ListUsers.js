import React, { useContext } from 'react';
import { FlatList, StyleSheet, Picker, View } from 'react-native';
import ItemLists from './ItemLists'
import { Context } from '../context/context';



export default function ListUsers(props) {

    const { users, length, changeLength } = useContext(Context)
    return (
        <View style={styles.wrapper}>
            <FlatList
                style={styles.container}
                data={users}
                renderItem={({ item }) => <ItemLists item={item}></ItemLists>}
                keyExtractor={item => item.login}
            />
            <Picker
                style={styles.onePicker} itemStyle={styles.onePickerItem}
                selectedValue={`${length}`}
                onValueChange={changeLength}
        >
            <Picker.Item label="5" value="5" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="15" value="15" />
            <Picker.Item label="All" value="30" />
        </Picker>
        </View >   
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 7,
        padding: 7,
    },

    wrapper: {
        flex: 1,
        justifyContent: 'space-between',
        position: 'relative'
    },
    onePicker: {
        width: '100%',
        height: 90,
    },
    onePickerItem: {
        height: 90,
        color: 'gray'
    },
})