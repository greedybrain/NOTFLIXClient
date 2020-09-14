import axios from 'axios'
import { helper } from '../../Utils/helper'
import { userAddMovieToFavorites } from '../reducers/userReducer'

const { baseUrl, addMovie } = helper.myEndpoints

export const userAddMovieToFavoritesThunk = movie => {
        return async (dispatch, getState) => {
                try {
                        if(getState().userRed.loggedInStatus === 'LOGGED_IN') {
                                const response = await axios.post(
                                        `${baseUrl}api/v1/${addMovie(getState().userRed.userInfo.data.id)}`,
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

// handleUserSavesMovie = async res => {
//         try {
//             if (this.props.loggedInStatus === "LOGGED_IN") {
//                 const response = await axios.post(
//                     `http://localhost:3001/api/v1/users/${this.props.userId}/movies`,
//                     {
//                         title: res.title,
//                         actors: res.actors,
//                         genre: res.genre,
//                         language: res.language,
//                         country: res.country,
//                         plot: res.plot,
//                         poster: res.poster,
//                         runtime: res.runtime,
//                         release_year: res.release_year,
//                         imdb_rating: res.imdb_rating,
//                         production: res.production
//                     },
//                     { withCredentials: true }
//                 )
//                 const warning = response.data.warning ? response.data.warning : null
//                 if (warning) {
//                     alert(warning)
//                 }
//                 this.props.history.push('/all_movies')
//             } else {
//                 alert("You must be logged in to do that")
//                 this.props.history.push('/')
//             }
//         } catch(e) {
//             console.log(e)
//         }
//     }