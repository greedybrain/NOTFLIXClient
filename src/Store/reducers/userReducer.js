//! STARTING OFF WITH CREATING A REDUCER FOR MOVIES 
const initialState = {
        loggedInStatus: 'NOT_LOGGED_IN',
        userInfo: {},
        userMovies: []
}

export default  function userReducer(state = initialState, action) { //pure function
        switch(action.type) {
                case VALIDATE_LOGIN_STATUS_THEN_RELOAD_USER_INFO:
                        return {
                                ...state,
                                userInfo: action.payload.userInfo,
                                loggedInStatus: action.payload.isLoggedIn,
                        }
                case LOGIN_USER: 
                        return {
                                ...state,
                                userInfo: action.payload.userInfo,
                                loggedInStatus: "LOGGED_IN",
                        }
                case LOGOUT_USER:
                        return {
                                ...state,
                                userInfo: action.payload.userInfo,
                                userMovies: [],
                                loggedInStatus: "NOT_LOGGED_IN"
                        }
                case LOAD_USERS_FAVORITE_MOVIES: 
                        return {
                                ...state,
                                userMovies: action.payload.movies
                        }
                case USER_ADD_MOVIE_TO_FAVORITES:
                        return {
                                ...state,
                                userMovies: [action.payload.movie, ...state.userMovies]
                        }
                default: 
                        return state
        }
}

//! TYPES 
const VALIDATE_LOGIN_STATUS_THEN_RELOAD_USER_INFO  = "VALIDATE_LOGIN_STATUS_THEN_RELOAD_USER_INFO"
const LOGIN_USER = "LOGIN_USER"
const LOGOUT_USER = "LOGOUT_USER"
const USER_ADD_MOVIE_TO_FAVORITES = "USER_ADD_MOVIE_TO_FAVORITES"
const LOAD_USERS_FAVORITE_MOVIES = "LOAD_USERS_FAVORITE_MOVIES"

//! ACTION CREATORS
export const validateLoginStatusThenReloadUserInfo = (userInfo, isLoggedIn) => ({
        type: VALIDATE_LOGIN_STATUS_THEN_RELOAD_USER_INFO,
        payload: {
                userInfo,
                isLoggedIn
        }
})

export const loginUser = userInfo => ({
        type: LOGIN_USER,
        payload: {
                userInfo
        }
})

export const logoutUser = userInfo => ({
        type: LOGOUT_USER,
        payload: {
                userInfo
        }
})

export const loadUsersFavoriteMovies = movies => ({
        type: LOAD_USERS_FAVORITE_MOVIES,
        payload: {
                movies
        }
})

export const userAddMovieToFavorites = movie => ({
        type: USER_ADD_MOVIE_TO_FAVORITES, 
        payload: {
                movie
        }
})