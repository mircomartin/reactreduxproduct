import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { firebase } from './../firebase/firebase-config';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { DashboardRoute } from './DashboardRoute';
import { AuthRouter } from './AuthRouter';
import { startListProducts } from '../actions/products';

export const AppRouter = () => {

	const dispatch = useDispatch();

	const [checking, setChecking] = useState(true);
	const [isloggedin, setIsloggedin] = useState(false);

	useEffect(() => {
		firebase.auth().onAuthStateChanged( (user) => {
			if (user?.uid) {
				dispatch(login(user.uid, user.displayName));
				dispatch(startListProducts())
				setIsloggedin(true);
			} else {
				setIsloggedin(false);
			}
			setChecking(false);
		});
	}, [dispatch, setChecking, setIsloggedin]);

	if (checking) {
		return <h1>Please Wait...</h1>;
	}

	return (
        <Router>
            <div>
                <Switch> 
                    <PublicRoute
                        isAuthenticated={ isloggedin }
                        path="/auth" 
                        component={ AuthRouter } 
                    />
                    
                    <PrivateRoute 
                        path="/" 
                        isAuthenticated={ isloggedin }
                        component={ DashboardRoute } 
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
	);
};
