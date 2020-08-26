import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { Header } from '../components/ui/Header';
import { Home } from '../components/Pages/Home';
import { Populares } from '../components/Pages/Populares';
import LoginScreen from '../components/auth/LoginScreen';
import RegisterScreen from '../components/auth/RegisterScreen';

export const AppRouter = () => {

    return (
        <Router>
            <Header/>
            <div>
                <Switch>
                    <Route
                        exact 
                        path="/home" 
                        component={ Home }
                    />
                    <Route
                        exact 
                        path="/populares" 
                        component={ Populares }
                    />
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

                    <Redirect to="/home"/>
                </Switch>
            </div>
        </Router>
    )
}