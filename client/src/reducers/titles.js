import {
    GET_TITLES,
    ADD_TITLE,
    DELETE_TITLE,
    UPDATE_TITLE
} from '../actiontypes/index';

const initialState = {
    titles: null,
    loading: false,
    alert: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_TITLES:
            return { ...state, titles: payload, loading: false }
        case ADD_TITLE:
            return { ...state, alert: payload }
        case DELETE_TITLE:
            return { ...state, alert: payload }
        case UPDATE_TITLE:
            return { ...state, alert: payload }
        default:
            return initialState;
    }
}