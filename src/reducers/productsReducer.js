import { NEW_PRODUCT, SET_PRODUCTS, DELETE_PRODUCT, ACTIVE_PRODUCT } from './../types';

const initialState = {
    products: [],
    productActive: false,
}

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case SET_PRODUCTS:
            return {
                ...state,
                products: [...action.payload]
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter((product) => product.id !== state.productActive.id)
            }
        case ACTIVE_PRODUCT:
            return {
                ...state,
                productActive: action.payload
            }
        default:
            return state;
    }
}