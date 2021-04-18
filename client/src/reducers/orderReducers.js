import { orderConstants } from "../constants/orderConstants";

export const createOrderReducer = (initialState = {}, action) => {
    switch(action.type) {
        case orderConstants.ORDER_CREATE_REQUEST:
            return { ...initialState, loading: true }
        
        case orderConstants.ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload }

        case orderConstants.ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return initialState;
    }
}

export const orderDetailsReducer = (initialState = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch(action.type) {
        case orderConstants.ORDER_DETAILS_REQUEST:
            return { ...initialState, loading: true }
        
        case orderConstants.ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload }

        case orderConstants.ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return initialState;
    }
}

export const orderPayReducer = (initialState = {}, action) => {
    switch(action.type) {
        case orderConstants.ORDER_PAY_REQUEST:
            return { loading: true }
        
        case orderConstants.ORDER_PAY_SUCCESS:
            return { loading: false, success: true }

        case orderConstants.ORDER_PAY_FAILURE:
            return { loading: false, error: action.payload }

        case orderConstants.ORDER_PAY_RESET:
            return { };
        default:
            return initialState;
    }
}

export const getMyOrdersReducer = (initialState = { orders: [] }, action) => {
    switch(action.type) {
        case orderConstants.ORDER_LIST_MY_REQUEST:
            return { loading: true }
        
        case orderConstants.ORDER_LIST_MY_SUCCESS:
            return { loading: false, orders: action.payload }

        case orderConstants.ORDER_LIST_MY_FAIL:
            return { loading: false, error: action.payload }

        case orderConstants.ORDER_LIST_MY_RESET:
            return { orders: [] }

        default:
            return initialState;
    }
}

export const getAllOrdersForAdmin = (initialState = { orders: [] }, action) => {
    switch(action.type) {
        case orderConstants.ORDER_LIST_REQUEST:
            return { loading: true }

        case orderConstants.ORDER_LIST_SUCCESS:
            return { loading: false, orders: action.payload }

        case orderConstants.ORDER_LIST_FAIL:
            return { loading: false, error: action.payload }

        case orderConstants.ORDER_LIST_RESET:
            return { orders: [] }
        
        default:
            return initialState;
    }
}

export const orderDeliverReducer = (initialState = {}, action) => {
    switch(action.type) {
        case orderConstants.ORDER_DELIVER_REQUEST:
            return { loading: true }

        case orderConstants.ORDER_DELIVER_SUCCESS:
            return { loading: false, success: true }

        case orderConstants.ORDER_DELIVER_FAIL:
            return { loading: false, error: action.payload }

        case orderConstants.ORDER_DELIVER_RESET:
            return { }

        default:
            return initialState
    }
}