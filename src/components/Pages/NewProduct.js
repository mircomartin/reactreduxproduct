import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { showError, removeError } from '../../actions/ui';
import { startNewProduct } from '../../actions/products';

export const NewProduct = (props) => {
	const { msgError } = useSelector((state) => state.ui);
	const dispatch = useDispatch();

	const [formValues, handleInputChange, reset] = useForm({
		name: '',
		price: 0,
	});

	const { name, price } = formValues;

	const handleFileChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			formValues.file = file;
		}
	};

	const handleNewProduct = (e) => {
		e.preventDefault();

		if (name.trim().length <= 3) {
			return dispatch(showError('Name is required'));
		} else if (price.trim() <= 0) {
			return dispatch(showError('Price is required and must may than 0'));
		}

		dispatch(removeError());

		dispatch(startNewProduct(formValues));

		reset();

		setTimeout(() => {
			props.history.push('/home');
		}, 3000);
	};

	return (
		<div className="container formulario">
			<h1>Nuevo Producto</h1>

			<form className="row" onSubmit={handleNewProduct}>
				{msgError && (
					<p className="alert alert-danger d-block text-center w-100">
						{msgError}
					</p>
				)}

				<div className="col-12 formulario__campo">
					<label htmlFor="nombre">Nombre del Producto</label>
					<input
						type="text"
						name="name"
						value={name}
						onChange={handleInputChange}
						id="name"
						placeholder="Nombre del producto"
					/>
				</div>

				<div className="col-12 formulario__campo">
					<label htmlFor="precio">Precio</label>
					<input
						type="number"
						name="price"
						value={price}
						onChange={handleInputChange}
						id="precio"
						placeholder="Precio del producto"
					/>
				</div>

				<div className="col-12 formulario__campo">
					<label htmlFor="image">Cargar Imagen:</label>
					<input
						id="fileSelector"
						type="file"
						name="file"
						onChange={handleFileChange}
					/>
				</div>

				<button className="formulario__boton" type="submit">
					Ingresar Producto
				</button>
			</form>
		</div>
	);
};
