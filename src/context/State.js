import React, { useReducer, useEffect, useState } from 'react';
import { Keyboard, AsyncStorage } from 'react-native';
import axios from 'axios';
import { Context } from './context';
import { reducer } from './reducer';
import { SEARCH, GET_USER, LOADING, CHANGE_FAVORITE } from './types';

const initialState = {
    users: [],
    userInfo: {},
    loading: false,
    favorite: [],
};

export default function ({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [inFavorite, setInFavorite] = useState(false);
    const [length, setLength] = useState(5);
    const [input, setInput] = useState('');
    const FAVORITE = 'FAVORITE';

    useEffect(() => {
        readStorage();
    }, []);

    useEffect(() => {
        setStorage(state.favorite);
    }, [state.favorite]);

    useEffect(() => {
        if (!inFavorite)
            searchUser(input);
        else
            loadFavorite();
    }, [length]);

    const readStorage = async () => {
        try {
            const data = JSON.parse(await AsyncStorage.getItem(FAVORITE));
            data && setFavorite(data);
        } catch (error) {
            console.log(error);
        }
    }
    const setStorage = async (array) => {
        try {
            await AsyncStorage.setItem(FAVORITE, JSON.stringify(array));

        } catch (error) {
            console.log(error);
        }
    }

    const inFavoriteChange = (status) => setInFavorite(status);

    const changeUsers = (newArray) => {
        dispatch({
            type: SEARCH,
            payload: newArray,
        });
    }

    const setFavorite = (array) => {
        dispatch({
            type: CHANGE_FAVORITE,
            payload: array,
        })
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

        changeUsers(checkUserLength(data));
    };

    const checkFavorite = login => state.favorite.some(el => el.login === login)

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

    const loadFavorite = () => changeUsers(checkUserLength(state.favorite));

    const changeFavoriteStatus = (login, status) => {
        const users = state.users.map(el => el.login === login ? ({ ...el, favorite: !status }) : el);

        if (status) {
            const newFavorite = state.favorite.filter(el => el.login !== login);
            setFavorite(newFavorite);

            if (inFavorite) {
                changeUsers(newFavorite);
                return
            }
        }
        else {
            const user = state.users.find(el => el.login === login);
            user.favorite = !status;
            setFavorite([...state.favorite, user]);

        }
        changeUsers(users);
    }
    const checkUserLength = (data) => data.slice(0, length);

    const changeLength = value => setLength(+value);

    const changeInput = string => setInput(string);
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
                inFavoriteChange,
                changeLength,
                length,
                input,
                changeInput
            }}
        >
            {children}
        </Context.Provider>
    )
}