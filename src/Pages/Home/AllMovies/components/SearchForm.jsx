import React, { PureComponent } from 'react'
import axios from 'axios'

class SearchForm extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            year: ''
        }

        // http://www.omdbapi.com/?t=batman&plot=full&apikey=691b7eac
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        let { movieByTitleAndYear, movieByTitle } = this.props
        let { title, year } = this.state
        
        if (this.state.title === '') {
            alert("Please enter a title")
            return
        }
        if (this.title !== '' && this.state.year === '') {
            axios(`${movieByTitle(title)}`)
                .then(response => {
                    debugger
                })
        }
        if (this.title !== '' && this.state.year !== '') {
            axios(`${movieByTitleAndYear(title, year)}`)
                .then(response => {
                    debugger
                })
        }
        
        event.preventDefault()
    }

    render() {
        return (
            <>
            <form  onSubmit={this.handleSubmit}>
                <div className="title">
                    <input
                        onChange={this.handleChange}
                        type="text"
                        placeholder="Movie Title"
                        name="title"
                        value={this.state.title}
                    />
                </div>
                <div className="year">
                    <input 
                        onChange={this.handleChange}
                        type="text" 
                        placeholder="Release Year"
                        name="year"
                        value={this.state.year}
                    />
                </div>
                <div className="submit-button">
                    <button type="submit">Search</button>
                </div>
            </form>
        </>
        )
    }
}

export default SearchForm