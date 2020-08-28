import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { showError, removeError } from '../../actions/ui';
import { startEditProduct } from '../../actions/products';

export const EditProduct = ({ history }) => {
	const dispatch = useDispatch();

	const { productActive } = useSelector((state) => state.products);
	const { msgError } = useSelector((state) => state.ui);

	const [formValues, handleInputChange] = useForm(productActive);
	
	const { name, price } = formValues;

	useEffect(() => {
		if (!productActive) {
			history.push('/');
		}
		// eslint-disable-next-line
	}, []);

	/* const handleFileChange = (e) => {

		productActive.file = e.target.files[0];

		console.log(productActive.file)
		
	}; */

	const handleEdit = (e) => {
		e.preventDefault();

		if (name.trim().length <= 3) {
			return dispatch(showError('Name is required'));
		} else if (price.trim() <= 0) {
			return dispatch(showError('Price is required and must may than 0'));
		}

		dispatch(removeError())

		dispatch(startEditProduct(formValues))
		
		setTimeout(() => {
			history.push('/home');
		}, 3000);
	}

	return (
		<div className="container formulario">
			<h1>Edita el producto</h1>

			<form onSubmit={handleEdit} className="row">
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
						onChange={handleInputChange}
						value={name}
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
						id="price"
						onChange={handleInputChange}
						placeholder="Precio del producto"
					/>
				</div>

				{/* <div className="col-12 formulario__campo">
					<label htmlFor="image">Cargar Imagen:</label>
					<input
						id="fileSelector"
						type="file"
						name="file"
						onChange={handleFileChange}
					/>
				</div> */}

				<button className="formulario__boton" type="submit">
					Confirmar
				</button>
			</form>
		</div>
	);
};
