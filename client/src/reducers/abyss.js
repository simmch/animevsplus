import {
    GET_ABYSS,
    ADD_ABYSS,
    DELETE_ABYSS,
    UPDATE_ABYSS
} from '../actiontypes/index';

const initialState = {
    abyss: null,
    loading: false,
    alert: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_ABYSS:
            return { ...state, abyss: payload, loading: false }
        case ADD_ABYSS:
            return { ...state, alert: payload }
        case DELETE_ABYSS:
            return { ...state, alert: payload }
        case UPDATE_ABYSS:
            return { ...state, alert: payload }
        default:
            return initialState;
    }
}