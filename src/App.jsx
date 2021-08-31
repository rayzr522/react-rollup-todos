import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './global.css'
import { NavbarItem } from './components/NavbarItem'

import { Login } from './page/Login'
import { Todos } from './page/Todos'
import { Home } from './page/Home'

export const App = () => {
    return (
        <BrowserRouter>
            <nav>
                <span>Custom React App</span>
                <NavbarItem to="/">Home</NavbarItem>
                <NavbarItem to="/login">Login</NavbarItem>
                <NavbarItem to="/todos">Todos</NavbarItem>
            </nav>
            <main>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/todos">
                        <Todos />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </main>
        </BrowserRouter>
    )
}
