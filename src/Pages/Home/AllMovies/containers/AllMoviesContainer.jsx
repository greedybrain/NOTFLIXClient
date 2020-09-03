import React, { Component } from 'react'
import axios from 'axios'
import MovieList from '../../../../Global/components/MovieList'
import SearchForm from '../components/SearchForm'
import Header from '../../../../Global/components/Header'
import '../../../../assets/AllMoviesPageStyles/moviesPage.css'
import SortASCButton from '../components/SortASCButton'
import SortDESCButton from '../components/SortDESCButton'
import SortOldestButton from '../components/SortOldestButton'
import SortMostRecent from '../components/SortMostRecent'

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

    // FETCHING ALL MOVIES IN DATABASE ON APPLICATION START
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

    // PERSISTING MOVIE INFO TO DATABASE 
    addMovieInfo = async res => {
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
        this.validateMovie(response)
    }

    // VALIDATING IF MOVIE EXISTS ALREADY, OR IS EVEN A VALID MOVIE 
    validateMovie = res => {
        if (res.data.movie !== undefined) {
            const movie = res.data.movie.data
            let existingMovie = this.state.movies.find(mov => mov.id === movie.id)
            if (existingMovie === undefined) {
                this.setState(prevState => ({
                    movies: [movie, ...prevState.movies]
                }))
            } else {
                alert("Movie already exists")
            }
        } else {
            alert("That movie doesn't exist")
        }
    }

    // ALLOWING FOR MOVIES TO BE SORTED, AND THEN RE-RENDERED 
    sortMovies = movies => {
        this.setState({
            movies
        })
    }

    sortAZ = () => {
        const fromA_Z = this.state.movies.sort((a, b) => {
            let aTitle = a.attributes.title
            let bTitle = b.attributes.title
            return aTitle.localeCompare(bTitle)
        }) 
        this.sortMovies(fromA_Z)
    }

    sortZA = () => {
        const fromZ_A = this.state.movies.sort((a, b) => {
            let aTitle = a.attributes.title
            let bTitle = b.attributes.title
            return aTitle.localeCompare(bTitle)
        }).reverse() 
        this.sortMovies(fromZ_A)
    }

    sortOldest = () => {
        const byYear = this.state.movies.sort((a, b) => {
            let aYear = a.attributes.release_year.split(' ').slice(-1)[0]
            let bYear = b.attributes.release_year.split(' ').slice(-1)[0]
            return aYear.localeCompare(bYear)
        })
        this.sortMovies(byYear)
    }

    sortMostRecent = () => {
        const byYear = this.state.movies.sort((a, b) => {
            let aYear = a.attributes.release_year.split(' ').slice(-1)[0]
            let bYear = b.attributes.release_year.split(' ').slice(-1)[0]
            return aYear.localeCompare(bYear)
        }).reverse()
        this.sortMovies(byYear)
    }

    render() {
        let { movies } = this.state
        return (
            <div className="movies-page-wrapper">
                <Header />
                <div className="movies-container">
                    <div className="homepage">
                        <div className="sort_and_search">
                            <div className="sort_buttons">
                                <ul>
                                    <li className="most_recent">
                                        <SortMostRecent sortMostRecent={this.sortMostRecent} />
                                    </li>
                                    <li className="by-yea">
                                        <SortOldestButton sortOldest={this.sortOldest} />
                                    </li>
                                    <li className="sort_in_asc">
                                        <SortASCButton sortAZ={this.sortAZ} />
                                    </li>
                                    <li className="sort_in_desc">
                                        <SortDESCButton sortZA={this.sortZA} />
                                    </li>
                                </ul>
                            </div>
                            <div className="search-form">
                                <SearchForm validateEndpointThenRequestMovieInfo={this.validateEndpointThenRequestMovieInfo}/>
                            </div>
                        </div>
                        <div className="home-movie-list">
                            <MovieList movies={movies} sortMovies={this.sortMovies} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AllMoviesContainer