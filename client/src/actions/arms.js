import axios from 'axios';
import {
    ADD_ARM,
    GET_ARMS,
    DELETE_ARM,
    UPDATE_ARM
} from '../actiontypes/index';
import { loadUser } from "./auth/auth"; 


export const loadArms = () => async (dispatch) => {
    try {
        const res = await axios.get("/crown/arms")
        dispatch({
            type: GET_ARMS,
            payload: res
        })
    } catch (err) {
        console.error(err)
    }
}

export const loadSingleArm = (arm) => async (dispatch) => {
    try {
        const res = await axios.get(`/crown/arms/${arm}`)
        dispatch({
            type: GET_ARMS,
            payload: res
        })
        dispatch(loadUser());
    } catch (err) {
        console.error(err)
    }
}

export const saveArm = (arm) => async (dispatch) => {
    try {
        const res = await axios.post('/crown/arms/new', arm)
        dispatch({
            type: ADD_ARM,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}

export const updateArm = (arm) => async (dispatch) => {
    try {
        const res = await axios.post('/crown/arms/update', arm)
        dispatch({
            type: UPDATE_ARM,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}

export const deleteArm = (arm) => async (dispatch) => {
    
    try {
        console.log(arm)
        const res = await axios.delete('/crown/arms/delete', {data: arm})
        dispatch({
            type: DELETE_ARM,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}