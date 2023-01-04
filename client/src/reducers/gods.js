import {
    GET_GODS,
    ADD_GOD,
    DELETE_GOD,
    UPDATE_GOD
} from '../actiontypes/index';

const initialState = {
    bosses: null,
    loading: false,
    alert: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_GODS:
            return { ...state, bosses: payload, loading: false }
        case ADD_GOD:
            return { ...state, alert: payload }
        case DELETE_GOD:
            return { ...state, alert: payload }
        case UPDATE_GOD:
            return { ...state, alert: payload }
        default:
            return initialState;
    }
}