import Swal from 'sweetalert2';

import { firebase } from './../firebase/firebase-config';
import { LOGIN, LOGOUT } from './../types';
import { cleanLogout } from './products';


//async functions
export const startUserRegister = (name, email, password) => {
	return async (dispatch) => {
		try {
			const resp = await firebase
				.auth()
				.createUserWithEmailAndPassword(email, password);

			const { user } = resp;

			await user.updateProfile({ displayName: name });
			dispatch(login(user.uid, user.displayName));
		} catch (error) {
			console.log(error);
			Swal.fire('Error', error.message, 'error');
		}
	};
};

export const startLoginEmailAndPassword = (email, password) => {
	return async (dispatch) => {
		try {
			const { user } = await firebase
				.auth()
				.signInWithEmailAndPassword(email, password);

			dispatch(login(user.uid, user.displayName));
		} catch (error) {
			console.log(error);
			Swal.fire('Error', error.message, 'error');
		}
	};
};

export const startLogout = () => {
	return async (dispatch) => {
		try {
			await firebase.auth().signOut();

			dispatch(logout());
			dispatch(cleanLogout())
		} catch (error) {
			console.log(error);
			Swal.fire('Error', error.message, 'error');
		}
	};
};

//NoAsync
export const login = (uid, name) => ({
	type: LOGIN,
	payload: {
		uid,
		name,
	},
});

export const logout = () => ({
	type: LOGOUT,
});
