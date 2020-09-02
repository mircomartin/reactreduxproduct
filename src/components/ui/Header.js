import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import { startLogout } from '../../actions/auth'

export const Header = () => {

    const dispatch = useDispatch()
    const {name} = useSelector(state => state.auth)
    
    const handleLogout = () => {
        dispatch(startLogout())
    }

    return (
        <div className="header py-2">
            <div className="container">
                <div className="row justify-content-between align-items-center">

                    <div className="col-auto d-flex align-items-center">
                        <Link to="/home" className="header__logo"><p>P</p></Link>
                        <form  className="header__buscar">
                            <input 
                            type="text" 
                            placeholder="Buscar Productos"
                            name="Psearch"/>
                            <Link type="button" to="/buscar">Buscar</Link>
                        </form>
                        <nav className="header__nav">
                            <NavLink exact to="/home">Inicio</NavLink>
                            <NavLink exact to="/nuevo-producto">Nuevo Producto</NavLink>
                        </nav>
                    </div>

                    <div className="col-auto header__loginzone">
                        <p className="header__user">Hola: <span>{name}</span></p>
                        <button className="header__logout" onClick={handleLogout}>Sign Out</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
