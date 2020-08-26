import { MOSTRAR_ERROR, REMOVE_ERROR } from './../types';

export const showError = (msgError) => ({
    type: MOSTRAR_ERROR,
    payload: msgError
})

export const removeError = () => ({
    type: REMOVE_ERROR,
})