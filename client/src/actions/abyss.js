import axios from 'axios';
import {
    GET_ABYSS,
    ADD_ABYSS,
    DELETE_ABYSS,
    UPDATE_ABYSS
} from '../actiontypes/index';
import { loadUser } from "./auth/auth"; 

export const loadAbyss = () => async (dispatch) => {
    try {
        const res = await axios.get("/crown/abyss")
        dispatch({
            type: GET_ABYSS,
            payload: res
        })
    } catch(err) {
        console.error(err)
    }
}

export const saveAbyss = (abyss) => async (dispatch) => {
    try {
        const res = await axios.post('/crown/abyss/new', abyss)
        dispatch({
            type: ADD_ABYSS,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}

export const updateAbyss = (abyss) => async (dispatch) => {
    try {
        const res = await axios.post("/crown/abyss/update", abyss)
        dispatch({
            type: UPDATE_ABYSS,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}

export const deleteAbyss = (abyss) => async (dispatch) => {
    try {
        const res = await axios.delete("/crown/abyss/delete", {data: abyss})
        dispatch({
            type: DELETE_ABYSS,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}