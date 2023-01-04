import {
    GET_MATCHES,
    ADD_MATCH,
    DELETE_MATCH,
    UPDATE_MATCH
} from '../actiontypes/index';

const initialState = {
    matches: null,
    loading: false,
    alert: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_MATCHES:
            return { ...state, matches: payload, loading: false }
        case ADD_MATCH:
            return { ...state, alert: payload }
        case DELETE_MATCH:
            return { ...state, alert: payload }
        case UPDATE_MATCH:
            return { ...state, alert: payload }
        default:
            return initialState;
    }
}