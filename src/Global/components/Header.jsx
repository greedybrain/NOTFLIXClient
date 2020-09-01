import React from 'react'
import { Logo } from './Logo'
import '../../assets/Header/header.css'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <div className="logo-area">
                <div className="logo">
                    <Logo />
                </div>
                <div className="home">
                    <NavLink to='/all_movies' activeClassName="active-nav">Movies</NavLink>
                </div>
            </div>
            <div className="nav">
                <ul>
                    <li><Link to='/' >Login</Link></li>
                    <li><Link to='/' >Sign Up</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default Header
