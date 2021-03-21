import { userConstants } from "../constants/userConstants"
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: userConstants.USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`http://localhost:3000/api/users/login`, { email, password }, config);

        dispatch({
            type: userConstants.USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (e) {
        console.error(e);
        dispatch({
            type: userConstants.USER_LOGIN_FAIL,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message

        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: userConstants.USER_LOGOUT })
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: userConstants.USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`http://localhost:3000/api/users/`, { name, email, password }, config);

        dispatch({
            type: userConstants.USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: userConstants.USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (e) {
        console.error(e);
        dispatch({
            type: userConstants.USER_REGISTER_FAIL,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message

        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {


        dispatch({
            type: userConstants.USER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`http://localhost:3000/api/users/${id}`, config);

        dispatch({
            type: userConstants.USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (e) {
        console.error(e);
        dispatch({
            type: userConstants.USER_DETAILS_FAIL,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message

        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {


        dispatch({
            type: userConstants.USER_UPDATE_PROFILE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`http://localhost:3000/api/users/profile`, user, config);

        dispatch({
            type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
    } catch (e) {
        console.error(e);
        dispatch({
            type: userConstants.USER_UPDATE_PROFILE_FAIL ,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message

        })
    }
}