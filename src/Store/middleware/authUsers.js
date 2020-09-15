//! IMPORTS 
import axios from 'axios'
import { helper } from '../../Utils/helper'
import {validateLoginStatusThenReloadUserInfo, loginUser, logoutUser, loadUsersFavoriteMovies } from '../reducers/userReducer'

//! DESTRUCTURING HELPER FROM UTILS 
const { baseUrl, loggedIn, logIn, logout } = helper.myEndpoints

//! THUNK CREATORS
export const checkLoggedInStatus = () => {
        return async (dispatch, getState) => {   
                try {
                        const response = await axios(
                                `${baseUrl}${loggedIn}`,
                                { withCredentials: true }
                        )
                        if (response.data.logged_in && getState().userRed.loggedInStatus === "NOT_LOGGED_IN") {
                                dispatch(validateLoginStatusThenReloadUserInfo(response.data.user.data, "LOGGED_IN"))
                                dispatch(loadUsersFavoriteMovies(getState().userRed.userInfo.attributes.movies))
                        } else if (!response.data.logged_in && getState().userRed.loggedInStatus === "LOGGED_IN") {
                                dispatch(validateLoginStatusThenReloadUserInfo({}, "NOT_LOGGED_IN"))
                                dispatch(loadUsersFavoriteMovies([]))
                        }
                } catch(e) {
                        console.log(e)
                }
        }
}

export const loginUserThunk = (email, password) => {
        return async dispatch => {
                try {
                        const response = await axios.post(
                                `${baseUrl}${logIn}`,
                                { email, password },
                                { withCredentials: true }
                        )
                        const userData = response.data.user.data
                        dispatch(loadUsersFavoriteMovies(userData.attributes.movies))
                        window.location = '/all_movies'
                        dispatch(loginUser(userData))
                } catch(e) {
                        console.log(e)
                }
        }
}

export const logoutUserThunk = () => {
        return async dispatch => {
                try {
                        const response = await axios.delete(
                                `${baseUrl}${logout}`,
                                { withCredentials: true }
                        )
                        console.log(response)
                        window.location = '/all_movies'
                        dispatch(logoutUser({}))
                } catch(e) {
                        console.log(e)
                }
        }
}
