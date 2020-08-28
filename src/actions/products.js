import Swal from 'sweetalert2';

import {
	NEW_PRODUCT,
	SET_PRODUCTS,
	ACTIVE_PRODUCT,
	DELETE_PRODUCT,
	EDIT_PRODUCT,
	CLEAN_LOGOUT
} from './../types/index';
import { db } from '../firebase/firebase-config';
import { loadProducts } from './../helpers/loadProduct';
import { startLoading, finishLoading } from './ui';
import { fileUpload } from '../helpers/fileUpload';

export const startNewProduct = (product) => {
	return async (dispatch, getState) => {
		const { file } = product;
		const { uid } = getState().auth;

		try {
			if (!file) {
				product.file = '';
			} else {
				const fileUrl = await fileUpload(file);
				file.url = fileUrl;
				product.file = fileUrl;
			}

			const doc = await db.collection(`${uid}/hunt/products`).add(product);

			dispatch(newProduct(doc.id, product));

			Swal.fire('Success', 'Producto cargado con exito', 'success');
		} catch (error) {
			console.log(error);
			Swal.fire('Error', error.message, 'error');
		}
	};
};

export const startListProducts = () => {
	return async (dispatch, getState) => {
		dispatch(startLoading());
		const { uid } = getState().auth;
		try {
			const products = await loadProducts(uid);
			dispatch(setProducts(products));
			dispatch(finishLoading());
		} catch (error) {
			console.log(error);
			Swal.fire('Error', error.message, 'error');
			dispatch(finishLoading());
		}
	};
};

export const startDeleteProduct = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		const { productActive } = getState().products;
		const { id } = productActive;

		try {
			await db.doc(`${uid}/hunt/products/${id}`).delete();
			dispatch(deleteProduct(id));
			Swal.fire('Success', 'Producto eliminado con exito', 'success');
		} catch (error) {
			console.log(error);
			Swal.fire('Error', error.message, 'error');
		}
	};
};

export const startEditProduct = (product) => {
	return async (dispatch, getState) => {
		const {uid} = getState().auth

		try {

			await db.doc(`${uid}/hunt/products/${product.id}`).update(product);
			dispatch(editProducts(product))
			Swal.fire('Success', 'Producto editado con exito', 'success');
		} catch (error) {
			console.log(error)
		}
	}
}

//no async
const newProduct = (id, product) => ({
	type: NEW_PRODUCT,
	payload: {
		id,
		...product,
	},
});

const setProducts = (products) => ({
	type: SET_PRODUCTS,
	payload: products,
});

const editProducts = (product) => ({
	type: EDIT_PRODUCT,
	payload: product,
});

export const activeProduct = (product) => ({
	type: ACTIVE_PRODUCT,
	payload: product,
});

const deleteProduct = (id) => ({
	type: DELETE_PRODUCT,
	payload: id,
});

export const cleanLogout = () => ({
	type: CLEAN_LOGOUT,
})