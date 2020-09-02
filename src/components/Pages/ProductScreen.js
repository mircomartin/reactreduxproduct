import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';
import Swal from 'sweetalert2';

import {
	startActiveProduct,
	startEditProduct,
	startDeleteProduct,
} from '../../actions/products';

export const ProductScreen = ({ history }) => {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.ui);
	const { productActive } = useSelector((state) => state.products);
	const { uid: userUid, name: authName } = useSelector((state) => state.auth);

	const [newComments, setNewComments] = useState({});

	const { id } = useParams();

	useEffect(() => {
		dispatch(startActiveProduct(id));
	}, [dispatch, id]);

	const {
		name,
		createDate,
		file,
		description,
		comments,
		red,
		likes,
		userName,
		uid,
	} = productActive;

	const handleChange = (e) => {
		setNewComments({
			...newComments,
			[e.target.name]: e.target.value,
		});
	};

	moment.locale('es');
	const productDate = moment(createDate);

	const handleLike = () => {
		if (!uid) {
			history.push('/populares');
		}

		if (likes > 0) {
			return Swal.fire('Atencion', 'Ya le has dado Like al producto', 'warning');
		}

		const totalLikes = likes + 1;

		dispatch(startEditProduct({ ...productActive, likes: totalLikes }));
	};

	const handleComment = (e) => {
		e.preventDefault();

		if (!uid) {
			history.push('/home');
		}

		newComments.userName = userName;
		newComments.uid = uid;
		newComments.id = Math.random();

		const commentsUploaded = [...comments, newComments];

		setNewComments({
			message: '',
		});

		dispatch(startEditProduct({ ...productActive, comments: commentsUploaded }));
	};

	const handleDelete = () => {
		if (!uid) {
			history.push('/home');
		}

		dispatch(startDeleteProduct());

		setTimeout(() => {
			history.push('/home');
		}, 2000);
	};

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
					<p>
						<span className="font-weight-bold">Publicado hace:</span>{' '}
						{productDate.startOf('hour').fromNow()}
					</p>
					<p className="mt-2">
						Por:<span className="ml-2 font-weight-bold">{userName}</span>
					</p>
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

							<form onSubmit={handleComment}>
								<div className="formulario__campo">
									<input
										type="text"
										name="message"
										placeholder="Tu Mensaje"
										onChange={handleChange}
									/>
								</div>
								<button className="formulario__boton" type="submit">
									Agregar
								</button>
							</form>
						</>
					)}

					<h2 className="my-2">Comentarios</h2>
					{comments && comments.length === 0 ? (
						<p>Aun no hay comentarios</p>
					) : (
						<ul>
							{comments?.map((comment) => (
								<li
									key={comment.id}
									className="singleProduct__comentario"
								>
									<p>{comment.message}</p>
									<p>
										Escrito por:
										<span className="ml-2 font-weight-bold">
											{userUid === comment.uid
												? `Dueño - ${comment.userName}`
												: authName}
										</span>
									</p>
								</li>
							))}
						</ul>
					)}
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
						<button
							className="singleProduct__likes"
							type="button"
							onClick={handleLike}
						>
							Dale Like!
						</button>
					)}

					<p className="text-center font-weight-bold">
						{likes} <i className="far fa-thumbs-up"></i>
					</p>
				</aside>
			</div>
			{userUid === uid && (
				<button onClick={handleDelete} className="singleProduct__likes">
					Eliminar
				</button>
			)}
		</div>
	);
};
