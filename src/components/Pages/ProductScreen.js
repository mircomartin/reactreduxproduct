import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';

import { startActiveProduct, startEditProduct } from '../../actions/products';

export const ProductScreen = ({history}) => {
	const dispatch = useDispatch();
	const { productActive } = useSelector((state) => state.products);
	const { loading } = useSelector((state) => state.ui);
	const { uid } = useSelector((state) => state.auth);

	const { id } = useParams();

	useEffect(() => {
		dispatch(startActiveProduct(id));
		// eslint-disable-next-line
	}, [id]);

	const {
		name,
		createDate,
		file,
		description,
		comments,
		red,
		likes,
		userName,
	} = productActive;

	moment.locale('es');
	const productDate = moment(createDate);

	const handleLike = () => {
		if (!uid) {
			history.push('/populares')
		}

		const totalLikes = likes + 1
		
		dispatch(startEditProduct({...productActive, likes: totalLikes}))

		history.push('/')
	}

	if (loading) {
		return <h1>Waiting...</h1>;
	}

	return (
		<div className="container singleProduct">
			<div className="row">
				<div className="col-12">
					<h1 className="singleProduct__title">{name}</h1>
				</div>
			</div>
			<div className="row">
				<div className="col-6">
					<p>Publicado hace: {productDate.startOf('hour').fromNow()}</p>
					<p className="mt-2">Por: {userName}</p>
					{file === '' ? (
						<div className="text-center">
							<img
								src="/static/img/sin-imagen.png"
								className="img-fluid"
								alt={name}
							/>
						</div>
					) : (
						<div className="text-center">
							<img src={file} className="img-fluid" alt={name} />
						</div>
					)}
					<p className="mt-4">{description}</p>

					{uid && (
						<>
							<h2>Agrega tu comentario</h2>

							<form>
								<div className="formulario__campo">
									<input
										type="text"
										name="message"
										placeholder="Tu Mensaje"
									/>
								</div>
								<button className="formulario__boton" type="submit">
									Agregar
								</button>
							</form>
						</>
					)}

					<h2 className="my-2">Comentarios</h2>

					{comments?.map((comment) => (
						<li>
							<p>{comment.name}</p>
							<p>Escrito por: {comment.usuarioNombre}</p>
						</li>
					))}
				</div>
				<aside className="col-6">
					<a
						className="singleProduct__boton"
						href={red}
						target="_blank"
						rel="noopener noreferrer"
					>
						Ir a perfil de Red Social
					</a>

					{uid && (
						<button className="singleProduct__likes" type="button" onClick={handleLike}>
							Dale Like!
						</button>
					)}

					<p className="text-center font-weight-bold">{likes} Likes</p>
				</aside>
			</div>
		</div>
	);
};
