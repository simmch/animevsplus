import {
    GET_SESSIONS,
    ADD_SESSION,
    DELETE_SESSION,
    UPDATE_SESSION
} from '../actiontypes/index';

const initialState = {
    sessions: null,
    loading: false,
    alert: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_SESSIONS:
            return { ...state, sessions: payload, loading: false }
        case ADD_SESSION:
            return { ...state, alert: payload }
        case DELETE_SESSION:
            return { ...state, alert: payload }
        case UPDATE_SESSION:
            return { ...state, alert: payload }
        default:
            return initialState;
    }
}