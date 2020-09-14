//! MY CUSTOM IMPORTS
import { helper } from '../../Utils/helper'
import { addMoviesAfterSuccessfulRequest, startLoadMoviesRequest, addMovie } from '../reducers/movieReducer'

//! BUILT IN
import axios from 'axios'

//! DESTRUCTURING HELPER FROM UTILS 
const { baseUrl, backendMovies, addMovieToBackend } = helper.myEndpoints
const { apiKey, omdbEP } = helper.thirdPartyEP

//!THUNK CREATORS
export const loadAndAddMovies = () => {
        return async dispatch => {
                try {
                        dispatch(startLoadMoviesRequest())
                        const response = await axios(`${baseUrl}${backendMovies}`)
                        dispatch(addMoviesAfterSuccessfulRequest(response.data.movies.data))
                } catch(e) {
                        alert(e)
                }
        }
}

//! SEARCHING FOR MOVIES  & ADDING MOVIE TO DATABASE THEN RERENDER MOVIE LIST
export const validateEndpointThenRequestMovieInfo = (title, year) => {
        let response;
        return async (dispatch) => {
                try {
                        if (title === '') {
                                alert("Please enter a title")
                                return;
                        } 
                        if (title !== '' && year === '') {
                                response = await axios(`${omdbEP}t=${title}&plot=full&apikey=${apiKey}`)
                                dispatch(addMovieInfo(response))
                        }
                        if (title !== '' && year !== '') {
                                response = await axios(`${omdbEP}t=${title}&y=${year}&plot=full&apikey=${apiKey}`)
                                dispatch(addMovieInfo(response))
                        }
                        
                } catch(e) {
                        alert(e)
                }
        }
}

const addMovieInfo = res => {
        return  async (dispatch, getState) => {
                try {
                        const response = await axios.post(
                                `${baseUrl}${addMovieToBackend}`,
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
                                }
                        )
                        dispatch(validateMoviePresence(response, getState().movies))
                } catch(e) {
                        alert(e)
                }
        }
}

const validateMoviePresence = (res, _movies) => {
        return dispatch => {
                if (res.data.movie !== undefined) {
                        const movie = res.data.movie.data
                        let existingMovie = _movies.find(mov => mov.id === movie.id)
                        if (existingMovie === undefined) {
                                dispatch(addMovie(movie))
                        } else {
                                alert("Movie already exists")
                                return;
                        }
                }
        }
}