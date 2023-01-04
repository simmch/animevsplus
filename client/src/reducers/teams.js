import {
    GET_TEAMS,
    ADD_TEAM,
    DELETE_TEAM,
    UPDATE_TEAM
} from '../actiontypes/index';

const initialState = {
    teams: null,
    loading: false,
    alert: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_TEAMS:
            return { ...state, teams: payload, loading: false }
        case ADD_TEAM:
            return { ...state, alert: payload }
        case DELETE_TEAM:
            return { ...state, alert: payload }
        case UPDATE_TEAM:
            return { ...state, alert: payload }
        default:
            return initialState;
    }
}