import React, { useState } from 'react'

const Signup = ({ toggleForm }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = event => {
        setUsername(event.target.value)
    }

    const handleEmailChange = event => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="fields-wrapper">
            <h1>Sign Up</h1>
                <div className="username">
                    <input
                        onChange={handleUsernameChange}
                        type="text"
                        placeholder="Username"
                        value={username}
                    />
                </div>
                <div className="email">
                    <input
                        onChange={handleEmailChange}
                        type="email"
                        placeholder="Email"
                        value={email}
                    />
                </div>
                <div className="password">
                    <input
                        onChange={handlePasswordChange}
                        type="password"
                        placeholder="Password"
                        value={password}
                    />
                </div>
                <div className="submit-btn">
                    <button type="submit">Sign Up</button>
                </div>
                <div className="signup-instead">
                    <div className="new-to-netflix">
                        Already have an account? 
                    </div>
                    <div className="signup" onClick={toggleForm}>
                        Login.
                    </div>
                </div>
                <div className="captcha">
                    This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className="learn-more">Learn more</span>.
                </div>
            </div>
        </form>
    )
}

export default Signup

// params.permit(:username, :email, :password, :image)