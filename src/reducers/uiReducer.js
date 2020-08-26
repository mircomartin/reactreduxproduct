import { MOSTRAR_ERROR, REMOVE_ERROR } from './../types';

const initialState = {
    msgError: null,
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOSTRAR_ERROR:
            return {
                msgError: action.payload,
            }
        case REMOVE_ERROR:
            return {
                msgError: null,
            }
        default:
            return state;
    }
}