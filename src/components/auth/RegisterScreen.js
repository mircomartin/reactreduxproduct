import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { startUserRegister } from '../../actions/auth';
import { showError, removeError } from '../../actions/ui';

const RegisterScreen = () => {
	const {msgError} = useSelector(state => state.ui)
	const dispatch = useDispatch();

	const [formValues, handleInputChange] = useForm({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = formValues;

	const handleRegister = (e) => {
		e.preventDefault();
		if (isFormValid()) {
            dispatch(startUserRegister(name, email, password))
        }
	}

	const isFormValid = () => {
		if (name.trim().length === 0) {
			dispatch(showError('Name is required'));
			return false;
		} else if (!validator.isEmail(email)) {
			dispatch(showError('Email is not valid'));
			return false;
		} else if ( password !== password2 || password < 5) {
			dispatch(showError('Password shoud be at least six characters and match each other'));
			return false;
		}

		dispatch(removeError());
		
		return true;
	}

	return (
		<div className="container formulario">
			<h1>Crear Cuenta</h1>
			<form onSubmit={handleRegister} className="row">

				{msgError && <p className="alert alert-danger d-block text-center w-100"> {msgError} </p>}

				<div className="col-12 formulario__campo">
					<label htmlFor="nombre">Nombre</label>
					<input
						type="text"
						name="name"
						value={name}
						onChange={handleInputChange}
						id="name"
						placeholder="Tu Nombre"
					/>
				</div>

				<div className="col-12 formulario__campo">
					<label htmlFor="email">Email</label>
					<input 
						type="text" 
						name="email"
						value={email}
						onChange={handleInputChange} 
						id="email" 
						placeholder="Tu Email" />
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

				<div className="col-12 formulario__campo">
					<label htmlFor="password">Repeti Password</label>
					<input
						type="password"
						name="password2"
						value={password2}
						onChange={handleInputChange} 
						id="password2"
						placeholder="Repeti el Password"
					/>
				</div>

				<button className="formulario__boton" type="submit">
					Crear Cuenta
				</button>
			</form>
		</div>
	);
};

export default RegisterScreen;
