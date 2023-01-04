import {
    GET_PETS,
    ADD_PET,
    DELETE_PET,
    UPDATE_PET
} from '../actiontypes/index';

const initialState = {
    pets: null,
    loading: false,
    alert: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_PETS:
            return { ...state, pets: payload, loading: false }
        case ADD_PET:
            return { ...state, alert: payload }
        case DELETE_PET:
            return { ...state, alert: payload }
        case UPDATE_PET:
            return { ...state, alert: payload }
        default:
            return initialState;
    }
}