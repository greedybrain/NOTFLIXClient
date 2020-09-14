//! BUILT IN
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

//! CUSTOM
import { Logo } from './Logo'
import '../../assets/Header/header.css'
import '../../assets/Header/header.css'
import { logoutUserThunk } from '../../Store/middleware/authUsers'

const Header = () => {
    const user = useSelector(state => ({
        status: state.userRed.loggedInStatus,
        userInfo: state.userRed.userInfo
    }))
    const dispatch = useDispatch()

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

                        user.status === "LOGGED_IN" ? 
                        
                        <>
                            <li style={{ backgroundColor: 'transparent', color: '#fff' }}>
                                { user.userInfo.data.attributes.username }
                            </li>
                            <li style={{ backgroundColor: 'transparent', color: '#fff' }}>
                                { user.userInfo.data.attributes.movies.length }
                            </li>
                            <li onClick={() => dispatch(logoutUserThunk())} style={{ cursor: 'pointer', color: '#fff' }}>
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
