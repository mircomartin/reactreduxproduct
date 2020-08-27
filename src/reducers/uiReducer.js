import { MOSTRAR_ERROR, REMOVE_ERROR, START_LOADING, FINISH_LOADING } from './../types';

const initialState = {
    msgError: null,
    loading: null,
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
        case START_LOADING:
            return {
                loading: true,
            }
        case FINISH_LOADING:
            return {
                loading: null,
            }
        default:
            return state;
    }
}