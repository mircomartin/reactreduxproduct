import Swal from 'sweetalert2';

import {
	NEW_PRODUCT,
	SET_PRODUCTS,
	ACTIVE_PRODUCT,
	DELETE_PRODUCT,
	EDIT_PRODUCT,
	CLEAN_LOGOUT,
	INDIVIDUAL_PRODUCTS,
} from './../types/index';
import { db } from '../firebase/firebase-config';
import { loadProductsAll } from './../helpers/loadProduct';
import { startLoading, finishLoading } from './ui';
import { fileUpload } from '../helpers/fileUpload';

export const startNewProduct = (product) => {
	return async (dispatch, getState) => {
		const { file, name, price, description, red } = product;
		const { uid, name: userName } = getState().auth;

		try {
			if (!file) {
				product.file = '';
			} else {
				const fileUrl = await fileUpload(file);
				file.url = fileUrl;
				product.file = fileUrl;
			}

			const newProduct = {
				uid,
				userName,
				name,
				price,
				description,
				file: product.file,
				red,
				likes: 0,
				comments: [],
				createDate: Date.now(),
			};

			//const doc = await db.collection(`${uid}/hunt/products`).add(newProduct);
			const doc = await db.collection("products").add(newProduct);

			dispatch(addNewProduct(doc.id, newProduct));

			Swal.fire('Success', 'Producto cargado con exito', 'success');
		} catch (error) {
			console.log(error);
			Swal.fire('Error', error.message, 'error');
		}
	};
};

export const startListProducts = () => {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			const products = await loadProductsAll();
			dispatch(setProducts(products));
			dispatch(finishLoading());
		} catch (error) {
			console.log(error);
			Swal.fire('Error', error.message, 'error');
			dispatch(finishLoading());
		}
	};
};

export const startListIndividualProducts = () => {
	return async (dispatch, getState) => {
		dispatch(startLoading());
		const { uid } = getState().auth;
		try {
			const products = await loadProductsAll();
			dispatch(setProducts(products));
			dispatch(individualProducts(uid, products));
			dispatch(finishLoading());
		} catch (error) {
			console.log(error);
			Swal.fire('Error', error.message, 'error');
			dispatch(finishLoading());
		}
	};
};

export const startActiveProduct = (id) => {
	return async (dispatch, getState) => {
		dispatch(startLoading());
		//const { uid } = getState().auth;
		try {
			const productQuery = await db
				.collection("products")
				.doc(id)
				//.collection('products')
				//.doc(id);
			const product = await productQuery.get();
			const active = product.data();

			dispatch(activeProduct(product.id, active));
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
		//const { uid } = getState().auth;
		const { productActive } = getState().products;
		const { id } = productActive;

		try {
			await db.doc(`products/${id}`).delete();
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
		//const { uid } = getState().auth;

		try {
			await db.doc(`/products/${product.id}`).update(product);
			dispatch(editProducts(product));
			dispatch(startActiveProduct(product.id))
			Swal.fire('Success', 'La solicitud se realizo con exito.', 'success');
		} catch (error) {
			console.log(error);
			Swal.fire('Error', error.message, 'error');
		}
	};
};

//no async
const addNewProduct = (id, product) => ({
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

const individualProducts = (uid, products) => ({
	type: INDIVIDUAL_PRODUCTS,
	payload: {
		uid,
		products
	},
});

const editProducts = (id, product) => ({
	type: EDIT_PRODUCT,
	payload: {
		id,
		...product,
	},
});

export const activeProduct = (id, product) => ({
	type: ACTIVE_PRODUCT,
	payload: {
		id,
		...product,
	},
});

const deleteProduct = (id) => ({
	type: DELETE_PRODUCT,
	payload: id,
});

export const cleanLogout = () => ({
	type: CLEAN_LOGOUT,
});
