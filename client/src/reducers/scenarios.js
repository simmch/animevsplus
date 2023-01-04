import {
    GET_SCENARIOS,
    ADD_SCENARIO,
    DELETE_SCENARIO,
    UPDATE_SCENARIO
} from '../actiontypes/index';

const initialState = {
    scenarios: null,
    loading: false,
    alert: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_SCENARIOS:
            return { ...state, scenarios: payload, loading: false }
        case ADD_SCENARIO:
            return { ...state, alert: payload }
        case DELETE_SCENARIO:
            return { ...state, alert: payload }
        case UPDATE_SCENARIO:
            return { ...state, alert: payload }
        default:
            return initialState;
    }
}