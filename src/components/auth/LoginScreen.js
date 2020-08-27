import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { startLoginEmailAndPassword } from '../../actions/auth';

const LoginScreen = () => {
	const dispatch = useDispatch();

	const [formValues, handleInputChange] = useForm({
		email: 'mirco@carlos.com',
		password: '123456',
	});

	const { email, password } = formValues;

	const handleLogin = (e) => {
		e.preventDefault();

		dispatch(startLoginEmailAndPassword(email, password));
	};

	return (
		<div className="container formulario">
			<h1>Iniciar Sesion</h1>
			<form onSubmit={handleLogin} className="row">
				<div className="col-12 formulario__campo">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						value={email}
						onChange={handleInputChange}
						id="email"
						placeholder="Tu Email"
					/>
				</div>

				<div className="col-12 formulario__campo">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={handleInputChange}
						id="password"
						placeholder="Tu Password"
					/>
				</div>

				<button className="formulario__boton" type="submit">
					Iniciar Sesion
				</button>
			</form>
			<Link to="/auth/register" className="auth__link">
				Crear Nueva Cuenta
			</Link>
		</div>
	);
};

export default LoginScreen;
