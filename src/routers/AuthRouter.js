import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginScreen from '../components/auth/LoginScreen';
import RegisterScreen from '../components/auth/RegisterScreen';
import { Populares } from '../components/pages/Populares';

export const AuthRouter = () => {
    return (
        <div className="auth__main">
            <div className="container">
                <Switch>

                    <Route 
                        exact
                        path="/auth/login"
                        component={ LoginScreen }
                    />

                    <Route 
                        exact
                        path="/auth/register"
                        component={ RegisterScreen }
                    />

                    <Route 
                        exact
                        path="/auth/populares"
                        component={ Populares }
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>

        </div>
    )
}