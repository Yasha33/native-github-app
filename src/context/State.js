import React, { useReducer } from 'react';
import { Context } from './context';
import { reducer } from './reducer';
import axios from 'axios';
import { Keyboard, Alert } from 'react-native';
import { SEARCH, GET_USER } from './types';


const initialState = {
    users: [],
    userInfo: {},
};
export default function ({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const searchUser = async (name) => {
        Keyboard.dismiss()
        try {
            const response = await axios.get(`https://api.github.com/search/users?q=${name}`);
            dispatch({
                type: SEARCH,
                payload: response.data.items.map(el => ({ login: el.login, avatar_url: el.avatar_url }))
            });
        }
        catch (e) {
            Alert.alert('Возникла ошибка');
        }
    };

    const selectedUser = async (login) => {

        const info = state.users.find(el => el.login === login);

        try {
            const response = await axios.get(`https://api.github.com/users/${login}/repos`);
            const infoRep = response.data.map(el => ({
                id: el.id,
                name: el.name,
                created: el.created_at,
                forks: el.forks,
            }))
            info.rep = infoRep;
            dispatch({
                type: GET_USER,
                payload: info,
            })
        }
        catch (e) {
            Alert.alert('Ошибка', e);
        }
    }

    return (
        <Context.Provider
            value={{
                users: state.users,
                searchUser,
                selectedUser,
                userInfo: state.userInfo,
            }}
        >
            {children}
        </Context.Provider>
    )
}