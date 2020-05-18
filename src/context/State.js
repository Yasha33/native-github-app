import React, { useReducer } from 'react';
import { Context } from './context';
import { reducer } from './reducer';
import axios from 'axios';
import { Keyboard, Alert } from 'react-native';
import { SEARCH } from './types';


const initialState = {
    users: [],
};
export default function ({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const searchUser = async (name) => {
        Keyboard.dismiss()
        try {
            const response = await axios.get(`https://api.github.com/search/users?q=${name}`);
            dispatch({ type: SEARCH, payload: response.data.items.map(el => ({ login: el.login, avatar_url: el.avatar_url })) });
        }
        catch (e) {
            Alert.alert('Возникла ошибка');
        }

    };

    return (
        <Context.Provider
            value={{
                users: state.users,
                searchUser,
            }}
        >
            {children}
        </Context.Provider>
    )
}