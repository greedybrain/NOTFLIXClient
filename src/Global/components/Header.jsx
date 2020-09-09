import React from 'react'
import { Logo } from './Logo'
import '../../assets/Header/header.css'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { useState } from 'react'
import '../../assets/Header/header.css'

const Header = ({ loggedInStatus,  handleLogout, userId, username, userMovies }) => {
    // const [bgColor, setBgColor] = useState({ backgroundColor: '' })
    const history = useHistory()

    // const setCorrectBgColor = () => {
    //     if (history.location.pathname === '/') {
    //         setBgColor({ backgroundColor: 'transparent' })
    //     } else if(history.location.pathname === '/all_movies') {
    //         setBgColor({ backgroundColor: '#242424' })
    //     }
    // }

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
                    {

                        loggedInStatus === "LOGGED_IN" ? 
                        
                        <>
                            <li style={{ backgroundColor: 'transparent', color: '#fff' }}>
                                { username }
                            </li>
                            <li style={{ backgroundColor: 'transparent', color: '#fff' }}>
                                { userMovies.length }
                            </li>
                            <li onClick={handleLogout} style={{ cursor: 'pointer', color: '#fff' }}>
                                Logout
                            </li>
                        </>

                        :

                        <>
                            <li><Link to='/' >Login</Link></li> 
                            <li><Link to='/' >Sign Up</Link></li>
                        </>

                    }
                </ul>
            </div>
        </header>
    )
}

export default Header
