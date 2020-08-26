import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

import { Header } from '../components/ui/Header'
import { Home } from '../components/Pages/Home'
import { Populares } from '../components/Pages/Populares'
import { NewProduct } from '../components/Pages/NewProduct'

export const DashboardRoute = () => {
    return (
        <>
            <Header />

            <div className="container mt-2">
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/populares" component={Populares} />
                    <Route exact path="/nuevo-producto" component={NewProduct} />

                    <Redirect to="/home" />
                </Switch>
            </div>

        </>
    )
}
