import clsx from 'clsx'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import classes from './NavbarItem.module.css'

export const NavbarItem = ({ to, children }) => {
    const location = useLocation()

    return (
        <Link
            to={to}
            className={clsx([
                classes.navbarItem,
                location.pathname === to && classes.active,
            ])}
        >
            {children}
        </Link>
    )
}
