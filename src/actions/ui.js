import { MOSTRAR_ERROR, REMOVE_ERROR, START_LOADING, FINISH_LOADING } from './../types';

export const showError = (msgError) => ({
    type: MOSTRAR_ERROR,
    payload: msgError
})

export const removeError = () => ({
    type: REMOVE_ERROR,
})

export const startLoading = () => ({
    type: START_LOADING,
})

export const finishLoading = () => ({
    type: FINISH_LOADING,
})