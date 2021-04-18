import { userConstants } from '../constants/userConstants';

export const userLoginReducer = (initialState = {  }, action) => {
    switch (action.type) {
        case userConstants.USER_LOGIN_REQUEST:
            return { loading: true }
        
        case userConstants.USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case userConstants.USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case userConstants.USER_LOGOUT:
            return {}

        default:
            return initialState;
    }
}

export const userRegisterReducer = (initialState = {  }, action) => {
    switch (action.type) {
        case userConstants.USER_REGISTER_REQUEST:
            return { loading: true }
        
        case userConstants.USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case userConstants.USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }

        default:
            return initialState;
    }
}

export const userDetailsReducer = (initialState = { user: {} }, action) => {
    switch (action.type) {
        case userConstants.USER_DETAILS_REQUEST:
            return { ...initialState, loading: true }
        
        case userConstants.USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }

        case userConstants.USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case userConstants.USER_DETAILS_RESET:
            return { user: {} }

        default:
            return initialState;
    }
}

export const userListReducer = (initialState = { users: [] }, action) => {
    switch(action.type) {
        case userConstants.USER_LIST_REQUEST:
            return { loading: true };
        
        case userConstants.USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }

        case userConstants.USER_LIST_FAIL:
            return { loading: false, error: action.payload }
        
        case userConstants.USER_LIST_RESET:
            return { users: [] }

        default:
            return initialState;
    }
}

export const userUpdateProfileReducer = (initialState = { user: {} }, action) => {
    switch (action.type) {
        case userConstants.USER_UPDATE_PROFILE_REQUEST:
            return { loading: true, success: false }
        
        case userConstants.USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, userInfo: action.payload, success: true }

        case userConstants.USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload, success: false }

        default:
            return initialState;
    }
}

export const userDeleteReducer = (initialState = {}, action) => {
    switch(action.type) {
        case userConstants.USER_DELETE_REQUEST:
            return { loading: true }
        
        case userConstants.USER_DELETE_SUCCESS:
            return { loading: false, success: true }

        case userConstants.USER_DELETE_FAIL:
            return { loading: false }

        default:
            return initialState;
    }
}

export const updateUserReducer = (initialState = { user: {} }, action) => {
    switch(action.type) {

        case userConstants.USER_UPDATE_REQUEST:
            return { loading: true }

        case userConstants.USER_UPDATE_SUCCESS:
            return { loading: false, success: true }
        
        case userConstants.USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        
        case userConstants.USER_UPDATE_RESET:
            return { user: {} }

        default:
            return initialState;
    }
}