import {
    GET_UNIVERSES,
    ADD_UNIVERSE,
    DELETE_UNIVERSE,
    UPDATE_UNIVERSE
} from '../actiontypes/index';

const initialState = {
    universes: null,
    loading: false,
    alert: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_UNIVERSES:
            return { ...state, universes: payload, loading: false }
        case ADD_UNIVERSE:
            return { ...state, alert: payload }
        case DELETE_UNIVERSE:
            return { ...state, alert: payload }
        case UPDATE_UNIVERSE:
            return { ...state, alert: payload }
        default:
            return initialState;
    }
}