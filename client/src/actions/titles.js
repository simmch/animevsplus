import axios from 'axios';
import {
    ADD_TITLE,
    GET_TITLES,
    DELETE_TITLE,
    UPDATE_TITLE
} from '../actiontypes/index';
import { loadUser } from "./auth/auth"; 


export const loadTitles = () => async (dispatch) => {
    try {
        const res = await axios.get("/crown/titles")
        dispatch({
            type: GET_TITLES,
            payload: res
        })
    } catch (err) {
        console.error(err)
    }
}

export const loadSingleTitle = (title) => async (dispatch) => {
    try {
        const res = await axios.get(`/crown/titles/${title}`)
        dispatch({
            type: GET_TITLES,
            payload: res
        })
        dispatch(loadUser());
    } catch (err) {
        console.error(err)
    }
}

export const saveTitle = (title) => async (dispatch) => {
    try {
        const res = await axios.post('/crown/titles/new', title)
        dispatch({
            type: ADD_TITLE,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}

export const updateTitle = (title) => async (dispatch) => {
    try {
        const res = await axios.post('/crown/titles/update', title)
        dispatch({
            type: UPDATE_TITLE,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}

export const deleteTitle = (title) => async (dispatch) => {
    
    try {
        console.log(title)
        const res = await axios.delete('/crown/titles/delete', {data: title})
        dispatch({
            type: DELETE_TITLE,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}