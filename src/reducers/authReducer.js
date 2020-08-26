import { LOGIN, LOGOUT } from './../types';

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN: 
            return {
                uid: action.payload.uid,
                name: action.payload.name,
            }
        case LOGOUT: 
            return {

            }
        default:
            return state;
    }
}