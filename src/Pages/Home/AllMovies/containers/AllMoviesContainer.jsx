import React, { Component } from 'react'
import MovieList from '../../../../Global/components/MovieList'
import SearchForm from '../components/SearchForm'
import '../../../../assets/AllMoviesPageStyles/moviesPage.css'
import SortContainer from '../components/SortContainer'
import Header from '../../../../Global/components/Header' 
import { connect } from 'react-redux'
import { loadAndAddMovies } from '../../../../Store/middleware/apiMovies'
import axios from 'axios'

class AllMoviesContainer extends Component {
    
    //! FETCHING ALL MOVIES IN DATABASE ON APPLICATION START
    async componentDidMount() {
        this.props.addMoviesFromDB()
    }

    handleUserSavesMovie = async res => {
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
            await axios.delete(
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
        return (
            <div className="movies-page-wrapper">
                <div className="movies-container">
                    <Header />
                    <div className="homepage">
                        <div className="sort_and_search">
                            <div className="sort_buttons">
                                <SortContainer />
                            </div>
                            <div className="search-form">
                                <SearchForm />
                            </div>
                        </div>
                        <div className="home-movie-list">
                            <MovieList />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addMoviesFromDB: () => dispatch(loadAndAddMovies())
})

export default  connect(null, mapDispatchToProps)(AllMoviesContainer)