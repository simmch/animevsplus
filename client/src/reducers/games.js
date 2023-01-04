import {
    GET_GAMES,
    ADD_GAME,
    DELETE_GAME,
    UPDATE_GAME
} from '../actiontypes/index';

const initialState = {
    games: null,
    loading: false,
    alert: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_GAMES:
            return { ...state, games: payload, loading: false }
        case ADD_GAME:
            return { ...state, alert: payload }
        case DELETE_GAME:
            return { ...state, alert: payload }
        case UPDATE_GAME:
            return { ...state, alert: payload }
        default:
            return initialState;
    }
}