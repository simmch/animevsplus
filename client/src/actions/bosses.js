import axios from "axios";
import {
    GET_BOSSES,
    ADD_BOSS,
    DELETE_BOSS,
    UPDATE_BOSS
} from '../actiontypes/index';

export const loadBosses = () => async (dispatch) => {
    try {
        res = await axios.get("/pcg/bosses")
        dispatch({
            type: GET_BOSSES,
            payload: res
        })
    } catch (err) {
        console.error(err);
    }
}