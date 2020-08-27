import React from 'react';
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm';

export const EditProduct = () => {
    const {productActive} = useSelector(state => state.products)
    
    const [ formValues, handleInputChange ] = useForm(productActive)

    const { name, price } = formValues
    
    const handleFileChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			formValues.file = file;
		}
	};

	return (
		<div className="container formulario">
			<h1>Edita el producto</h1>

			<form className="row">
			
					<p className="alert alert-danger d-block text-center w-100">
					
					</p>
			

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
					Confirmar
				</button>
			</form>
		</div>
	);
};
