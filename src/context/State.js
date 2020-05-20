import React, { useReducer, useEffect, useState } from 'react';
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
    const [favorite, setFavorite] = useState([]);
    const [inFavorite, setInFavorite] = useState(false);
    const FAVORITE = 'FAVORITE';

    useEffect(() => {
        setStorage();
    }, []);

    const setStorage = async () => {
        try {
            const data = JSON.parse(await AsyncStorage.getItem(FAVORITE));
            data && setFavorite(data);
        } catch (error) {
            console.log(error);
        }
    }

    const inFavoriteChange = (status) => {
        setInFavorite(status);     
    }

    const changeUsers = (newArray) => {
        dispatch({
            type: SEARCH,
            payload: newArray,
        });
    }

    const searchUser = async (name) => {
        Keyboard.dismiss();
        let data = [];
        if (name) {
            try {
                const response = await axios.get(`https://api.github.com/search/users?q=${name}`);
                data = response.data.items.map(el => ({
                    login: el.login,
                    avatar_url: el.avatar_url,
                    favorite: checkFavorite(el.login)
                }));
            }
            catch (e) {
                console.log(e);
            }
        }
        changeUsers(data);
    };

    const checkFavorite = login => favorite.some(el => el.login === login)

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
            console.log(e);
        }
    }

    const loadingIndicator = (status) => {
        dispatch({
            type: LOADING,
            payload: status
        })
    }

    const loadFavorite = () => changeUsers(favorite);

    const changeFavoriteStatus = (login, status) => {
        const users = state.users.map(el => el.login === login ? ({ ...el, favorite: !status }) : el);

        if (status) {
            const newFavorite = favorite.filter(el => el.login !== login);
            setFavorite([...newFavorite]);

            if (inFavorite) {
                changeUsers(newFavorite);
                return
            }
        }
        else {
            const user = state.users.find(el => el.login === login);
            user.favorite = !status;
            setFavorite([...favorite, user]);
        }    
        changeUsers(users);
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
                changeFavoriteStatus,
                inFavoriteChange
            }}
        >
            {children}
        </Context.Provider>
    )
}