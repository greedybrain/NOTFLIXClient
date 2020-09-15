import axios from 'axios'
import { helper } from '../../Utils/helper'
import { userAddMovieToFavorites, userRemovesMovieFromFavorites } from '../reducers/userReducer'

const { baseUrl, addMovie, deleteMovie } = helper.myEndpoints

export const userAddMovieToFavoritesThunk = movie => {
        return async (dispatch, getState) => {
                try {
                        if(getState().userRed.loggedInStatus === 'LOGGED_IN') {
                                const response = await axios.post(
                                        `${baseUrl}api/v1/${addMovie(getState().userRed.userInfo.id)}`,
                                        {
                                                title: movie.title,
                                                actors: movie.actors,
                                                genre: movie.genre,
                                                language: movie.language,
                                                country: movie.country,
                                                plot: movie.plot,
                                                poster: movie.poster,
                                                runtime: movie.runtime,
                                                release_year: movie.release_year,
                                                imdb_rating: movie.imdb_rating,
                                                production: movie.production
                                        },
                                        { withCredentials: true }
                                )
                                const warning = response.data.warning ? response.data.warning : null
                                if (warning) {
                                        alert(warning)
                                }  else {
                                        window.location = '/all_movies'
                                        dispatch(userAddMovieToFavorites(response.data.movie.data))
                                }
                        } else {
                                alert("You must be logged in to do that")
                                window.location = '/'
                        }
                } catch(e) {
                        console.log(e)
                }
        }
}

export const userRemovesMovieFromFavoritesThunk = movie => {
        return async (dispatch, getState) => {
                try {
                        const response = await axios.delete(
                                `${baseUrl}api/v1/${deleteMovie(getState().userRed.userInfo.id, movie.id)}`,
                                { withCredentials: true }
                        )
                        debugger
                        dispatch(userRemovesMovieFromFavorites(getState().userRed.userMovies, movie))
                } catch(e) {
                        alert(e)
                }
        }
}