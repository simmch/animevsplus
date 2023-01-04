import axios from 'axios';
import {
    ADD_PET,
    GET_PETS,
    DELETE_PET,
    UPDATE_PET
} from '../actiontypes/index';
import { loadUser } from "./auth/auth"; 


export const loadPets = () => async (dispatch) => {
    try {
        const res = await axios.get("/crown/pets")
        dispatch({
            type: GET_PETS,
            payload: res
        })
    } catch (err) {
        console.error(err)
    }
}

export const loadSinglePet = (pet) => async (dispatch) => {
    try {
        const res = await axios.get(`/crown/pets/${pet}`)
        dispatch({
            type: GET_PETS,
            payload: res
        })
        dispatch(loadUser());
    } catch (err) {
        console.error(err)
    }
}

export const savePet = (pet) => async (dispatch) => {
    try {
        console.log(pet)
        const res = await axios.post('/crown/pets/new', pet)
        dispatch({
            type: ADD_PET,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}

export const updatePet = (pet) => async (dispatch) => {
    try {
        console.log(pet)
        const res = await axios.post('/crown/pets/update', pet)
        dispatch({
            type: ADD_PET,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}

export const deletePet = (pet) => async (dispatch) => {
    
    try {
        const res = await axios.delete('/crown/pets/delete', {data: pet})
        dispatch({
            type: DELETE_PET,
            payload: res
        })
        dispatch(loadUser());
    } catch(err) {
        console.error(err)
    }
}