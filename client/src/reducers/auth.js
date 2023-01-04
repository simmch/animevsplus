import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "../actiontypes/index";
  
  const initialState = {
    isAuthenticated: false,
    loading: true,
    user: null,
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case USER_LOADED:
        return { ...state, isAuthenticated: true, loading: false, user: payload };

      case LOGIN_SUCCESS:
        return { ...state, ...payload, isAuthenticated: true, loading: false };
      case LOGOUT:
        return { ...state, isAuthenticated: false, loading: false };
      default:
        return initialState;
    }
  }
  