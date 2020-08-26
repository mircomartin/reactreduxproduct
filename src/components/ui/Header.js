import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { startLogout } from '../../actions/auth'

export const Header = () => {

    const dispatch = useDispatch()
    const {uid, name} = useSelector(state => state.auth)
    
    const handleLogout = () => {
        dispatch(startLogout())
    }

    return (
        <div className="header py-2">
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-auto d-flex align-items-center">
                        <Link to="/home" className="header__logo"><p>P</p></Link>
                        <div className="header__buscar">
                            <input type="text" placeholder="Buscar Productos"/>
                            <button type="submit">Buscar</button>
                        </div>
                        <nav className="header__nav">
                            <NavLink to="/">Inicio</NavLink>
                            <NavLink to="/populares">Populares</NavLink>
                            {!!uid && <NavLink to="/nuevo-producto">Nuevo Producto</NavLink>}
                        </nav>
                    </div>

                    {!uid 
                        ? 
                            (<div className="col-auto header__loginzone">
                            <Link className="header__login" to="/auth/login">Log in</Link>
                            <Link className="header__new" to="/auth/register">Sign Up</Link>
                            </div>)
                        : 
                            (<div className="col-auto header__loginzone">
                                <p className="header__user">Hola: <span>{name}</span></p>
                                <button className="header__logout" onClick={handleLogout}>Sign Out</button>
                            </div>)
                    }
                    
                </div>
            </div>
        </div>
    )
}
