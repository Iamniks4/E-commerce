import { orderConstants } from "../constants/orderConstants";
import axios from "axios";


export const createOrder = (order) => async (dispatch, getState) => {
    try {


        dispatch({
            type: orderConstants.ORDER_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`http://localhost:3000/api/orders`, order, config);

        dispatch({
            type: orderConstants.ORDER_CREATE_SUCCESS,
            payload: data
        })
    } catch (e) {
        console.error(e);
        dispatch({
            type: orderConstants.ORDER_CREATE_FAIL ,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message

        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: orderConstants.ORDER_DETAILS_REQUEST });

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`http://localhost:3000/api/orders/${id}`, config);

        dispatch({
            type: orderConstants.ORDER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (e) {
        console.error(e);
        dispatch({
            type: orderConstants.ORDER_DETAILS_FAIL,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message

        })
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: orderConstants.ORDER_PAY_REQUEST });

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`http://localhost:3000/api/orders/${orderId}/pay`, paymentResult, config);

        dispatch({
            type: orderConstants.ORDER_PAY_SUCCESS,
            payload: data
        })
    } catch (e) {
        console.error(e);
        dispatch({
            type: orderConstants.ORDER_PAY_FAIL,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message

        })
    }
}