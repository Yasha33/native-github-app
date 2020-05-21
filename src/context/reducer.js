import { SEARCH, GET_USER, LOADING, CHANGE_FAVORITE } from './types'

const handlers = {
    [SEARCH]: (state, { payload }) => ({
        ...state,
        users: [...payload]
    }),
    [GET_USER]: (state, { payload }) => ({
        ...state,
        userInfo: { ...payload }
    }),
    [LOADING]: (state, { payload }) => ({
        ...state,
        loading: payload
    }),
    [CHANGE_FAVORITE]:(state, {payload}) =>({
        ...state,
        favorite:[...payload]
    }),

    DEFAULT: state => state
}

export const reducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}