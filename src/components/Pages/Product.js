import React from 'react';
import moment from 'moment';
import 'moment/locale/es';

import { useHistory } from 'react-router-dom';

export const Product = ({ product }) => {

	const history = useHistory();

	const { id, name, file, description, comments, createDate, likes } = product;

	moment.locale('es');
	const productDate = moment(createDate);

	const handleProduct = (id) => {
		history.push(`/product/${id}`);
	};

	return (
		<div className="row bg-white justify-content-between align-items-center py-4 product">
			<div className="col">
				<div className="row align-items-center">
					{file === '' ? (
						<div className="text-center col-2">
							<img
								src="/static/img/sin-imagen.png"
								className="product__img img-fluid"
								alt={name}
							/>
						</div>
					) : (
						<div className="text-center col-2">
							<img
								src={file}
								className="product__img img-fluid"
								alt={name}
							/>
						</div>
					)}
					<div className="col">
						<h2 className="product__title" onClick={() => handleProduct(id)}>{name}</h2>
						<p className="product__description">{description}</p>
						<div className="row no-gutters">
							<div className="product__comments col-auto p-2">
								<img
									src="/static/img/comentario.png"
									alt="Comment Icon"
								/>
								<p>{comments.length} Comentarios</p>
							</div>
							<p className="col-12 product__fecha">
								Publicado hace: {productDate.startOf('hour').fromNow()}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="col-auto product__votos">
				<div>&#9650;</div>
				<p>{likes}</p>
			</div>
		</div>
	);
};
