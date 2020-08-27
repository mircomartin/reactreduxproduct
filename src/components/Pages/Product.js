import React from 'react';
import {useDispatch} from 'react-redux';

import {activeProduct, startDeleteProduct} from './../../actions/products';
import { Link } from 'react-router-dom';

export const Product = ({ id, name, price, file }) => {
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(activeProduct({ id, name, price, file }));
		dispatch(startDeleteProduct());
	}


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
				<button className="product__eliminar" onClick={handleDelete}>Eliminar</button>
				<Link to={ `./product/edit/${ id }` } onClick={() => dispatch(activeProduct({ id, name, price, file }))} className="product__editar">Editar</Link>
			</div>
		</div>
	);
};
