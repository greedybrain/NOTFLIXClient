import React, { Component } from 'react'
import '../../../assets/EntryPageStyles/entryPage.css'
import Login from '../components/Login'
import Signup from '../components/Signup'
import Header from '../../../Global/components/Header'

export default class EntryPage extends Component {
    constructor(props) {
        super(props) 
        
        this.loginForm = React.createRef()
        this.signupForm = React.createRef()
    }

    toggleForm = event => {
        if (event.target.textContent === 'Sign up now.') {
            this.loginForm.current.style.display = 'none'
            this.signupForm.current.style.display = 'flex'
        }
        if (event.target.textContent === 'Login.') {
            this.signupForm.current.style.display = 'none'
            this.loginForm.current.style.display = 'flex'
        }
    }

    handleSignupRequest = () => {
       // fetch to signup endpoint
    }

    render() {
        return (
            <>
                <div className="entry-page-bg"></div>
                <div className="entry-page-bg-overlay"></div>
                <div className="entry-page-fg">
                    <Header />
                    <div className="entry-forms">
                        <div className="login-form" ref={this.loginForm}>
                            <Login loginForm={this.loginForm} signupForm={this.signupForm} toggleForm={this.toggleForm} handleLoginRequest={this.props.handleLoginRequest} history={this.props.history} /> 
                        </div>
                        <div className="signup-form" ref={this.signupForm} style={{ display: 'none' }}>
                            <Signup loginForm={this.loginForm} signupForm={this.signupForm} toggleForm={this.toggleForm} />
                        </div>
                    </div>
                </div>
            </>

        )
    }
}
