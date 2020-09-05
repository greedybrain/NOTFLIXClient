import React from 'react'
import { Logo } from './Logo'
import '../../assets/Header/header.css'
import { Link, NavLink } from 'react-router-dom'

const Header = ({ loggedInStatus,  handleLogoutRequest, user }) => {

    const renderCorrectNavItems = () => {
        if(loggedInStatus === true) {
            return (
                <>
                    {/* <li style={{ backgroundColor: 'transparent', color: '#fff' }}>{ user.user.username }</li> */}
                    {/* <li style={{ backgroundColor: 'transparent', color: '#fff' }}>{ user.movies.length }</li> */}
                    <li onClick={handleLogoutRequest} style={{ cursor: 'pointer', color: '#fff' }}>Logout</li>
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
