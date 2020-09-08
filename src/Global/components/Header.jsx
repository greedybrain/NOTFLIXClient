import React from 'react'
import { Logo } from './Logo'
import '../../assets/Header/header.css'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

const Header = ({ loggedInStatus,  handleLogout, user, history }) => {

    const renderCorrectNavItems = () => {
        if(loggedInStatus === "LOGGED_IN") {
            console.log(user.username)
            return (
                <>
                    <li style={{ backgroundColor: 'transparent', color: '#fff' }}>{ user.email }</li>
                    <li style={{ backgroundColor: 'transparent', color: '#000' }}>{ user.movies }</li>
                    <li onClick={handleLogout} style={{ cursor: 'pointer', color: '#fff' }}>Logout</li>
                </>
            )
        } else {
            return (
                <>
                    <li><Link to='/' >Login</Link></li> 
                    <li><Link to='/' >Sign Up</Link></li>
                </>
            )
        }
    }

    const navItems = renderCorrectNavItems()

    return (
        <header>
            <div className="logo-area">
                <div className="logo">
                    <Link to="/all_movies"><Logo /></Link>
                </div>
                <div className="home">
                    <NavLink to='/all_movies' activeClassName="active-nav">Movies</NavLink>
                </div>
            </div>
            <div className="nav">
                <ul>
                    {navItems}
                </ul>
            </div>
        </header>
    )
}

export default Header
