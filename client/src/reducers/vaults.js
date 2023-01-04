import {
    GET_VAULTS,
    ADD_VAULT,
    DELETE_VAULT,
    UPDATE_VAULT
} from '../actiontypes/index';

const initialState = {
    vaults: null,
    loading: false,
    alert: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_VAULTS:
            return { ...state, vaults: payload, loading: false }
        case ADD_VAULT:
            return { ...state, alert: payload }
        case DELETE_VAULT:
            return { ...state, alert: payload }
        case UPDATE_VAULT:
            return { ...state, alert: payload }
        default:
            return initialState;
    }
}