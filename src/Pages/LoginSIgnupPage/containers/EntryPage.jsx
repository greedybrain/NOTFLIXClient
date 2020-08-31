import React, { Component } from 'react'
import '../../../assets/EntryPageStyles/entryPage.css'
import { Logo } from '../../../Global/components/Logo'

export default class EntryPage extends Component {

    handleSignupRequest = () => {
       // fetch to signup endpoint
   }

    render() {
        return (
            <>
                <div className="entry-page-bg"></div>
                <div className="entry-page-bg-overlay"></div>
                <div className="entry-page-fg">
                    <header>
                        <div className="logo-area">
                            <Logo />
                        </div>
                    </header>
                </div>
            </>

        )
    }
}
