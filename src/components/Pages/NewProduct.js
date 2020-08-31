import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { showError, removeError } from '../../actions/ui';
import { startNewProduct } from '../../actions/products';

export const NewProduct = ({history}) => {
	const { msgError } = useSelector((state) => state.ui);
	const dispatch = useDispatch();

	const [formValues, handleInputChange, reset] = useForm({
		name: '',
		price: 0,
		description: '',
		red: '',
		file:'',
	});

	const { name, price, description, red } = formValues;

	const handleFileChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			formValues.file = file;
		}
	};

	const handleNewProduct = (e) => {
		e.preventDefault();

		if(isFormValid()) {
			dispatch(startNewProduct(formValues));
			
			reset();

			setTimeout(() => {
				history.push('/home');
			}, 5000);
		}

	};

	const isFormValid = () => {
		if (name.trim().length <= 3) {
			dispatch(showError('Name is required'));
			return false
		} else if (!validator.isURL(red)) {
			dispatch(showError('Social Netwoork is required'));
			return false
		} else if (price <= 0) {
			dispatch(showError('Price is required and must may than 0'));
			return false
		} if (description.trim() === '') {
			dispatch(showError('Description is required'));
			return false
		}
	
		dispatch(removeError());
		
		return true

	}
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
					<label htmlFor="red">Red Social:</label>
					<input
						type="text"
						name="red"
						value={red}
						onChange={handleInputChange}
						id="red"
						placeholder="Ej. https://www.instagram.com/layback.ar"
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
						accept="image/x-png,image/gif,image/jpeg"
						type="file"
						name="file"
						onChange={handleFileChange}
					/>
				</div>

				<div className="col-12 formulario__campo">
					<label htmlFor="description">Descripcion:</label>
					<textarea
						name="description"
						id="description"
						value={description}
						onChange={handleInputChange}
					/>
				</div>

				<button className="formulario__boton" type="submit">
					Ingresar Producto
				</button>
			</form>
		</div>
	);
};
