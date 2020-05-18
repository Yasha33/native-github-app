import { SEARCH } from './types'

const handlers = {
    [SEARCH]: (state, { payload }) => ({
        ...state,
        users:[...payload]
    }),

    DEFAULT: state => state
}

export const reducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}