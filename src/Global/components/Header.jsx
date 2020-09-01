import React from 'react'
import { Logo } from './Logo'
import '../../assets/Header/header.css'

const Header = () => {
    return (
        <header>
            <div className="logo-area">
                <Logo />
            </div>
        </header>
    )
}

export default Header
