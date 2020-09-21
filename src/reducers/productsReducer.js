import { NEW_PRODUCT, SET_PRODUCTS, DELETE_PRODUCT, ACTIVE_PRODUCT, EDIT_PRODUCT, CLEAN_LOGOUT, INDIVIDUAL_PRODUCTS } from './../types';

const initialState = {
    products: [],
    productActive: false,
}

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload],
            }
        case SET_PRODUCTS:
            return {
                ...state,
                products: [...action.payload],
                productActive: false,
            }
        case INDIVIDUAL_PRODUCTS:
            return {
                ...state,
                products: state.products.filter((product) => product.uid === action.payload.uid),
                productActive: false,
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter((product) => product.id !== state.productActive.id),
                productActive: false,
            }
        case ACTIVE_PRODUCT:
            return {
                ...state,
                productActive: action.payload
            }
        case CLEAN_LOGOUT:
            return {
                ...initialState
            }
        case EDIT_PRODUCT:
            return {
                ...state,
                products: state.products.map((product) => (
                    product.id === action.payload.id
                    ? action.payload.product
                    : product
                )),
            }
        default:
            return state;
    }
}