import React, { Component } from 'react'
import axios from 'axios'
import MovieList from '../../../../Global/components/MovieList'
import SearchForm from '../components/SearchForm'

class AllMoviesContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movies: []
        }

        this.apiKey = '691b7eac'
        this.baseUrl = 'http://localhost:3001/'
        this.thirdPartyBaseUrl = 'http://www.omdbapi.com/?'
        this.allMovies = 'api/v1/movies'    
    }

    componentDidMount() {
        axios(`${this.baseUrl}${this.allMovies}`)
            .then(response => {
                this.setState({
                    movies: response.data.movies.data
                })
            })
    }

    movieByTitleAndYear = (title, year)  => {
        return `${this.thirdPartyBaseUrl}t=${title}&y=${year}&plot=full&apikey=${this.apiKey}`
}
    
    movieByTitle = title => {
        return `${this.thirdPartyBaseUrl}t=${title}&plot=full&apikey=${this.apiKey}`
    }

    render() {
        let { movies } = this.state
        return (
            <div className="homepage">
                <div className="search-form">
                    <SearchForm movieByTitle={this.movieByTitle} movieByTitleAndYear={this.movieByTitleAndYear} />
                </div>
                <div className="home-movie-list">
                    <MovieList movies={movies} />
                </div>
            </div>
        )
    }
}

export default AllMoviesContainer