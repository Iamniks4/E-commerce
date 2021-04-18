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
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages
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

export const productDeleteReducer = (initialState = {}, action) => {
    switch (action.type) {
        case productConstants.PRODUCT_DELETE_REQUEST:
            return { loading: true };

        case productConstants.PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true };

        case productConstants.PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return initialState;
    }
}

export const productCreateReducer = (initialState = {}, action) => {
    switch (action.type) {
        case productConstants.PRODUCT_CREATE_REQUEST:
            return { loading: true };

        case productConstants.PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };

        case productConstants.PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload };

        case productConstants.PRODUCT_CREATE_RESET:
            return {};

        default:
            return initialState;
    }
}

export const productUpdateReducer = (initialState = { product: {} }, action) => {
    switch(action.type) {

        case productConstants.PRODUCT_UPDATE_REQUEST:
            return { loading: true }

        case productConstants.PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true }

        case productConstants.PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case productConstants.PRODUCT_UPDATE_RESET:
            return { product: {} }

        default:
            return initialState;
    }
}


export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case productConstants.CREATE_PRODUCT_REVIEW_REQUEST:
        return { loading: true }

      case productConstants.CREATE_PRODUCT_REVIEW_SUCCESS:
        return { loading: false, success: true }

      case productConstants.CREATE_PRODUCT_REVIEW_FAIL:
        return { loading: false, error: action.payload }

      case productConstants.CREATE_PRODUCT_REVIEW_RESET:
        return {}

      default:
        return state
    }
  }

  export const topProductsReducer = (state = { products: [] }, action) => {
      switch (action.type) {
        case productConstants.PRODUCT_TOP_REQUEST:
            return { loading: true, products: [] }
    
        case productConstants.PRODUCT_TOP_SUCCESS:
            return { loading: false, products: action.payload }

        case productConstants.PRODUCT_TOP_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
      }
  }