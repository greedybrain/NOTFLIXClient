import React, { Component } from 'react'
import axios from 'axios'
import MovieList from '../../../../Global/components/MovieList'
import SearchForm from '../components/SearchForm'
import '../../../../assets/AllMoviesPageStyles/moviesPage.css'
import SortContainer from '../components/SortContainer'
import Header from '../../../../Global/components/Header' 

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

    handleUserSavesMovie = async res => {
        // debugger
        try {
            if (this.props.loggedInStatus === "LOGGED_IN") {
                const response = await axios.post(
                    `http://localhost:3001/api/v1/users/${this.props.userId}/movies`,
                    {
                        title: res.title,
                        actors: res.actors,
                        genre: res.genre,
                        language: res.language,
                        country: res.country,
                        plot: res.plot,
                        poster: res.poster,
                        runtime: res.runtime,
                        release_year: res.release_year,
                        imdb_rating: res.imdb_rating,
                        production: res.production
                    },
                    { withCredentials: true }
                )
                const warning = response.data.warning ? response.data.warning : null
                if (warning) {
                    alert(warning)
                }
                this.props.history.push('/all_movies')
            } else {
                alert("You must be logged in to do that")
                this.props.history.push('/')
            }
        } catch(e) {
            console.log(e)
        }
    }

    handleUserDeletesMovie = async movieId => {
        try {
            const response = await axios.delete(
                `http://localhost:3001/api/v1/users/${this.props.userId}/movies/${movieId}`, 
                { withCredentials: true }
            )
        } catch(e) {
            console.log(e)
        }
        const leftoverUserMovies = this.props.userMovies.filter(movie => movie.id  !== parseInt(movieId))
        this.props.setUserMovies(leftoverUserMovies)
    }

    render() {
        let { movies } = this.state
        return (
            <div className="movies-page-wrapper">
                <div className="movies-container">
                    <Header
                        loggedInStatus={this.props.loggedInStatus} 
                        userId={this.props.userId}
                        username={this.props.username} 
                        userMovies={this.props.userMovies}
                        handleLogout={this.props.handleLogout}
                    />
                    <div className="homepage">
                        <div className="sort_and_search">
                            <div className="sort_buttons">
                                <SortContainer movies={movies} sortMovies={this.sortMovies} />
                            </div>
                            <div className="search-form">
                                <SearchForm validateEndpointThenRequestMovieInfo={this.validateEndpointThenRequestMovieInfo}/>
                            </div>
                        </div>
                        <div className="home-movie-list">
                            <MovieList movies={movies} sortMovies={this.sortMovies} handleUserSavesMovie={this.handleUserSavesMovie} handleUserDeletesMovie={this.handleUserDeletesMovie} userMovies={this.props.userMovies} userId={this.props.userId} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AllMoviesContainer