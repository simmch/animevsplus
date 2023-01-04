import axios from 'axios';
import {
    GET_GAMES,
    ADD_GAME,
    DELETE_GAME,
    UPDATE_GAME
} from '../actiontypes/index';

export const loadGames = () => async (dispatch) => {
    try{
        res = await axios.get("/pcg/games")
        dispatch({
            type: GET_GAMES,
            payload: res
        })
    } catch(err) {
        console.error(err)
    }
}