import {
    GET_BOSSES,
    ADD_BOSS,
    DELETE_BOSS,
    UPDATE_BOSS
} from '../actiontypes/index';

const initialState = {
    bosses: null,
    loading: false,
    alert: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_BOSSES:
            return { ...state, bosses: payload, loading: false }
        case ADD_BOSS:
            return { ...state, alert: payload }
        case DELETE_BOSS:
            return { ...state, alert: payload }
        case UPDATE_BOSS:
            return { ...state, alert: payload }
        default:
            return initialState;
    }
}