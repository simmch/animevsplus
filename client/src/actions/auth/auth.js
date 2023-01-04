import axios from "axios";
import { AUTH } from "../../UTIL/config";
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../../actiontypes/index";


export const login = () => async (dispatch) => {
    try {
        axios.get("/auth")
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                window.location.href = AUTH
                console.log("An Error Occurred. ")
            })
    } catch (err) {
        console.log(err)
    }   
      
};

export const logout = () => async (dispatch) => {
    try {
        const res = await axios.get("/auth/logout");
        console.log(res)
        dispatch({
            type: LOGOUT,
            payload: res
        })

    } catch (err) {
        console.log(err)
    }   
      
};

export const loadUser = () => async (dispatch) => {
    try {
        const res = await axios.get("/auth/user")
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch(err) {
        console.error(err)
        dispatch({
            type: AUTH_ERROR
        })
    }
}
