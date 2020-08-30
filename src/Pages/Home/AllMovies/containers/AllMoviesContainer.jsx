import React, { Component } from 'react'
import axios from 'axios'
import MovieList from '../../../../Global/components/MovieList'
import SearchForm from '../components/SearchForm'

class AllMoviesContainer extends Component {
    constructor(props) {
        super(props)

        // INITIAL STATE 
        this.state = {
            movies: [],
            title: '',
            year: '',
            movieInfo: {
                title: '',
                actors: '',
                genre: '',
                language: '',
                country: '',
                runtime: '',
                releaseDate: '',
                plot: '',
                poster: '',
                imdbRating: '', 
                production: ''
            }
        }

        // ENDPOINTS 
        this.apiKey = '691b7eac'
        this.baseUrl = 'http://localhost:3001/'
        this.thirdPartyBaseUrl = 'http://www.omdbapi.com/?'
        this.allMyBackendMovies = 'api/v1/movies'   
        this.results = 'api/v1/results'
    }

    componentDidMount() {
        axios(`${this.baseUrl}${this.allMyBackendMovies}`)
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

    validateEndpointThenRequestMovieInfo = (title, year) => {
        if (title === '') {
            alert("Please enter a title")
            return
        }
        if (title !== '' && year === '') {
            axios(`${this.movieByTitle(title)}`)
                .then(response => {
                    this.addMovieInfoToState(response)
                })
        }
        if (title !== '' && year !== '') {
            axios(`${this.movieByTitleAndYear(title, year)}`)
                .then(response => {
                    this.addMovieInfoToState(response)
                })
        }
    }

    addMovieInfoToState = (response) => {
        this.setState({
            movieInfo: {
                title: response.data.Title,
                actors: response.data.Actors,
                genre: response.data.Genre,
                language: response.data.Language,
                country: response.data.Country,
                runtime: response.data.Runtime,
                imdbRating: response.data.imdbRating,
                production: response.data.Production
            }
        })
    }

    render() {
        let { movies } = this.state
        return (
            <div className="homepage">
                <div className="search-form">
                    <SearchForm validateEndpointThenRequestMovieInfo={this.validateEndpointThenRequestMovieInfo}/>
                </div>
                <div className="home-movie-list">
                    <MovieList movies={movies} />
                </div>
            </div>
        )
    }
}

export default AllMoviesContainer