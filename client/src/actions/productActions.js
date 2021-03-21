import axios from "axios";
import { productConstants } from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: productConstants.PRODUCT_LIST_REQUEST });

        const { data } = await axios.get('api/products');

        dispatch({
            type: productConstants.PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch(e) {
        dispatch({
            type: productConstants.PRODUCT_LIST_FAIL,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: productConstants.PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`http://localhost:3000/api/products/${id}`);

        dispatch({
            type: productConstants.PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch(e) {
        dispatch({
            type: productConstants.PRODUCT_DETAILS_FAIL,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message
        })
    }
}