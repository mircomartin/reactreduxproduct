import React from 'react';
import { useDispatch } from 'react-redux';

import { activeProduct, startDeleteProduct } from './../../actions/products';
import { useHistory } from 'react-router-dom';

export const Product = ({ product }) => {
	const dispatch = useDispatch();

	const history = useHistory();

	const { id, name, price, file } = product;

	const handleDelete = () => {
		dispatch(activeProduct(product));
		dispatch(startDeleteProduct());
	};

	const handleEdit = (id) => {
		dispatch(activeProduct(product));
		history.push(`/product/edit/${id}`);
	};

	return (
		<div className="row justify-content-center align-items-center mb-4">
			{file === '' ? (
				<div className="col-2">
					<img
						src="/static/img/sin-imagen.png"
						className="product__img img-fluid"
						alt={name}
					/>
				</div>
			) : (
				<div className="col-2">
					<img src={file} className="product__img img-fluid" alt={name} />
				</div>
			)}
			<div className="col-7">
				<h2 className="product__title">{name}</h2>
				<p className="product__price">
					<span>$</span> {price}
				</p>
			</div>
			<div className="col text-center">
				<button className="product__eliminar" onClick={handleDelete}>
					Eliminar
				</button>
				<button
					onClick={() => handleEdit(id)}
					type="button"
					className="product__editar"
				>
					Editar
				</button>
			</div>
		</div>
	);
};
