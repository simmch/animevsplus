import axios from 'axios';
import {
    GET_UNIVERSES,
    ADD_UNIVERSE,
    DELETE_UNIVERSE,
    UPDATE_UNIVERSE
} from '../actiontypes/index';
import { loadUser } from "./auth/auth"; 

export const loadUniverses = () => async (dispatch) => {
    try {
        const res = await axios.get("/crown/universes")
        dispatch({
            type: GET_UNIVERSES,
            payload: res
        })
    } catch(err) {
        console.error(err)
    }
}

export const saveUniverse = (universe) => async (dispatch) => {
    try {
        const res = await axios.post('/crown/universes/new', universe)
        dispatch({
            type: ADD_UNIVERSE,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}

export const updateUniverse = (universe) => async (dispatch) => {
    try {
        const res = await axios.post("/crown/universes/update", universe)
        dispatch({
            type: UPDATE_UNIVERSE,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}

export const deleteUniverse = (universe) => async (dispatch) => {
    try {
        const res = await axios.delete("/crown/universes/delete", {data: universe})
        dispatch({
            type: DELETE_UNIVERSE,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}