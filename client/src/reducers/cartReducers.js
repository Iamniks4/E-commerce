import { cartConstants } from "../constants/cartConstants";

export const cartReducer = (initialState = { cartItems: [], shippingAddress: {} }, action) => {
    switch(action.type) {
        case cartConstants.CART_ADD_ITEM:
            const item = action.payload;

            const existItem = initialState.cartItems.find(x => x.product === item.product)

            if(existItem) {
                return {
                    ...initialState,
                    cartItems: initialState.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            } else {
                return {
                    ...initialState,
                    cartItems: [...initialState.cartItems, item]
                }
            }

        case cartConstants.CART_REMOVE_ITEM:
            return {
                ...initialState,
                cartItems: initialState.cartItems.filter(x => x.product !== action.payload)
            }

        case cartConstants.CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...initialState,
                shippingAddress: action.payload
            }
        
        case cartConstants.CART_SAVE_PAYMENT_METHOD:
        return {
            ...initialState,
            paymentMethod: action.payload
        }
        default:
            return initialState
    }
}