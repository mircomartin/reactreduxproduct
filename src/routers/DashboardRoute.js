import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

import { Header } from '../components/ui/Header'
import { Home } from '../components/Pages/Home'
import { Populares } from '../components/Pages/Populares'
import { NewProduct } from '../components/Pages/NewProduct'
import { EditProduct } from '../components/Pages/EditProduct';

export const DashboardRoute = () => {
    return (
        <>
            <Header />

            <div className="container mt-2">
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/populares" component={Populares} />
                    <Route exact path="/nuevo-producto" component={NewProduct} />
                    <Route exact path="/product/edit/:id" component={ EditProduct } />

                    <Redirect to="/home" />
                </Switch>
            </div>

        </>
    )
}
