import {
    GET_ARMS,
    ADD_ARM,
    DELETE_ARM,
    UPDATE_ARM
} from '../actiontypes/index';

const initialState = {
    arms: null,
    loading: false,
    alert: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_ARMS:
            return { ...state, arms: payload, loading: false }
        case ADD_ARM:
            return { ...state, alert: payload }
        case DELETE_ARM:
            return { ...state, alert: payload }
        case UPDATE_ARM:
            return { ...state, alert: payload }
        default:
            return initialState;
    }
}