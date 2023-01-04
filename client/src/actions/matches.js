import axios from 'axios';
import {
    GET_MATCHES,
    ADD_MATCH,
    DELETE_MATCH,
    UPDATE_MATCH 
} from '../actiontypes/index';

export const loadMatches = () => async (dispatch) => {
    try {
        res = await axios.get("/crown/matches")
        dispatch({
            type: GET_MATCHES,
            payload: res
        })
    } catch(err) {
        console.log(err)
    }
}