import React, { Component } from 'react'
import axios from 'axios'
import MovieList from '../../../../Global/components/MovieList'
import SearchForm from '../components/SearchForm'
import Header from '../../../../Global/components/Header'
import '../../../../assets/AllMoviesPageStyles/moviesPage.css'

class AllMoviesContainer extends Component {
    constructor(props) {
        super(props)

        // INITIAL STATE 
        this.state = {
            movies: [],
            title: '',
            year: ''
        }

        // MY ENDPOINTS
        this.baseUrl = 'http://localhost:3001/'
        this.allMyBackendMovies = 'api/v1/movies'
        this.movieToHome = 'api/v1/add_movie_home'

        // THIRD PARTY ENDPOINTS 
        this.apiKey = '691b7eac'
        this.thirdPartyBaseUrl = 'http://www.omdbapi.com/?'
    }

    async componentDidMount() {
        const response = await axios(`${this.baseUrl}${this.allMyBackendMovies}`)
        this.setState({
            movies: response.data.movies.data
        })
    }

    // HANDLE SEARCH MOVIE BY TITLE AND YEAR 
    movieByTitleAndYear = (title, year)  => {
        return `${this.thirdPartyBaseUrl}t=${title}&y=${year}&plot=full&apikey=${this.apiKey}`
    }

    // HANDLE SEARCH MOVIE BY TITLE
    movieByTitle = title => {
        return `${this.thirdPartyBaseUrl}t=${title}&plot=full&apikey=${this.apiKey}`
    }

    // REQUESTING ADD MOVIE TO DATABASE ENDPOINT 
    addMovieToHomePath = () => {
        return `${this.baseUrl}${this.movieToHome}`
    }

    // VALIDATES ENDPOINT PARAMETERS BEFORE INFO IS RECEIVED
    validateEndpointThenRequestMovieInfo = async (title, year) => {
        let response;
        if (title === '') {
            alert("Please enter a title")
            return
        }
        if (title !== '' && year === '') {
            response = await axios(`${this.movieByTitle(title)}`)
            this.addMovieInfo(response)
        }
        if (title !== '' && year !== '') {
            response = await axios(`${this.movieByTitleAndYear(title, year)}`)
            this.addMovieInfo(response)
        }
    }

    addMovieInfo = async (res) => {
        const response = await axios.post(
            `${this.baseUrl}${this.movieToHome}`, 
            {
                title: res.data.Title,
                actors: res.data.Actors,
                genre: res.data.Genre,
                language: res.data.Language,
                country: res.data.Country,
                plot: res.data.Plot,
                poster: res.data.Poster,
                runtime: res.data.Runtime,
                release_year: res.data.Released,
                imdb_rating: res.data.imdbRating,
                production: res.data.Production
            },
        )
        console.log(response)
    }

    render() {
        let { movies } = this.state
        return (
            <div className="movies-page-wrapper">
                <Header />
                <div className="movies-container">
                    <div className="homepage">
                        <div className="search-form">
                            <SearchForm validateEndpointThenRequestMovieInfo={this.validateEndpointThenRequestMovieInfo}/>
                        </div>
                        <div className="home-movie-list">
                            <MovieList movies={movies} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AllMoviesContainer