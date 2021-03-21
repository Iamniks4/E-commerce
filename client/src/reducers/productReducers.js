import { productConstants } from "../constants/productConstants"

export const productListReducer = (initialState = { products: [] }, action) => {
    switch (action.type) {
        case productConstants.PRODUCT_LIST_REQUEST:
            return {
                ...initialState,
                loading: true
            }
        
        case productConstants.PRODUCT_LIST_SUCCESS:
            return {
                ...initialState,
                loading: false,
                products: action.payload
            }

        case productConstants.PRODUCT_LIST_FAIL:
            return {
                ...initialState,
                loading: false,
                error: action.payload
            }

        default:
            return initialState;
    }
}

export const productDetailsReducer = (initialState = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case productConstants.PRODUCT_DETAILS_REQUEST:
            return {
                ...initialState,
                loading: true
            }
        
        case productConstants.PRODUCT_DETAILS_SUCCESS:
            return {
                ...initialState,
                loading: false,
                product: action.payload
            }

        case productConstants.PRODUCT_DETAILS_FAIL:
            return {
                ...initialState,
                loading: false,
                error: action.payload
            }

        default:
            return initialState;
    }
}