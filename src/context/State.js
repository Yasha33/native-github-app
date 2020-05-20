import React, { useReducer, useEffect } from 'react';
import { Context } from './context';
import { reducer } from './reducer';
import axios from 'axios';
import { Keyboard, Alert } from 'react-native';
import { SEARCH, GET_USER, LOADING } from './types';
import { AsyncStorage } from 'react-native';




const initialState = {
    users: [],
    userInfo: {},
    loading: false,
};
export default function ({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const FAVORITE = 'FAVORITE';

    useEffect(() => {
        //  setStorage();
    });

    const setStorage = async () => {
        // const data = [{ "avatar_url": "https://avatars0.githubusercontent.com/u/57111386?v=4", "login": "Yasha33", }];
        // try {
        //     await AsyncStorage.setItem(FAVORITE, JSON.stringify(data));
        // } catch (error) {
        //     Alert.alert('Error Favotite', error);
        // }
        await AsyncStorage.removeItem(FAVORITE);
    }

    const searchUser = async (name) => {
        Keyboard.dismiss();
        let data = [];
        if (name) {

            try {
                const response = await axios.get(`https://api.github.com/search/users?q=${name}`);
                data = response.data.items.map(el => ({ login: el.login, avatar_url: el.avatar_url }));
            }
            catch (e) {
                Alert.alert('Incorect request');
            }
        }
        dispatch({
            type: SEARCH,
            payload: data,
        });
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
            Alert.alert('Incorect request');
        }
    }

    const loadingIndicator = (status) => {
        dispatch({
            type: LOADING,
            payload: status
        })
    }

    const loadFavorite = async () => {

        try {
            const value = JSON.parse(await AsyncStorage.getItem(FAVORITE));
            if (value !== null) {
                // We have data!!
                // console.log('all storaged users', value);
                dispatch({
                    type: SEARCH,
                    payload: value,
                });
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    const changeFavoriteStatus = async (login) => {

        try {
            const allFavorite = JSON.parse(await AsyncStorage.getItem(FAVORITE)) || [];
            const addFavorite = state.users.find(el => el.login === login);

            if (allFavorite.some(el => el.login === login)) {
                const newAllFavorite = allFavorite.filter(el => el.login !== login);
                await AsyncStorage.setItem(FAVORITE, JSON.stringify(newAllFavorite));
                await loadFavorite();
                return 'Removed from favotire';

            } else {
                const newAllFavorite = [...allFavorite, addFavorite];
                await AsyncStorage.setItem(FAVORITE, JSON.stringify(newAllFavorite));
                return 'Add to favorite';
            }

        } catch (error) {
            console.log('Error', error);

        }
    }


    return (
        <Context.Provider
            value={{
                users: state.users,
                searchUser,
                selectedUser,
                userInfo: state.userInfo,
                loading: state.loading,
                loadFavorite,
                loadingIndicator,
                changeFavoriteStatus
            }}
        >
            {children}
        </Context.Provider>
    )
}