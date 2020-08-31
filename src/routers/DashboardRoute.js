import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

import { Header } from '../components/ui/Header'
import { Home } from '../components/pages/Home'
import { Populares } from '../components/pages/Populares'
import { NewProduct } from '../components/pages/NewProduct'
import { EditProduct } from '../components/pages/EditProduct';
import { ProductScreen } from '../components/pages/ProductScreen';

export const DashboardRoute = () => {
    return (
        <>
            <Header />

            <div className="container py-2">
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/populares" component={Populares} />
                    <Route exact path="/nuevo-producto" component={NewProduct} />
                    <Route exact path="/product/:id" component={ ProductScreen } />
                    <Route exact path="/product/edit/:id" component={ EditProduct } />

                    <Redirect to="/home" />
                </Switch>
            </div>

        </>
    )
}
