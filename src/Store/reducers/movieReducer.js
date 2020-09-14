// STARTING OFF WITH CREATING A REDUCER FOR MOVIES 

const initialState = {
        movies: [],
        title: '',
        year: '',
        loadMoviesRequest: false
}

export default function movieReducer(state = initialState, action) { //pure function 
        switch(action.type) {
                case START_LOAD_MOVIES_REQUEST:
                        return {
                                ...state,
                                loadMoviesRequest: true
                        }
                case ADD_MOVIE_AFTER_SUCCESSFUL_REQUEST:
                        return {
                                ...state, 
                                movies: action.payload.movies,
                                loadMoviesRequest: false
                        }
                case SORT_MOVIES_A_Z:
                        return {
                                ...state,
                                movies: [...action.payload.movies]
                        }
                case SORT_MOVIES_Z_A:
                        return {
                                ...state,
                                movies: [...action.payload.movies]
                        }
                case SORT_MOVIES_MOST_RECENT:
                        return {
                                ...state,
                                movies: [...action.payload.movies]
                        }
                case SORT_MOVIES_OLDEST:
                        return {
                                ...state,
                                movies: [...action.payload.movies]
                        }
                case ADD_MOVIE:
                        return {
                                ...state,
                                movies: [action.payload.movie, ...state.movies]
                        }
                default:
                        return state
        }
}

// TYPES 
const START_LOAD_MOVIES_REQUEST = "START_LOAD_MOVIES_REQUEST"
const ADD_MOVIE_AFTER_SUCCESSFUL_REQUEST = "ADD_MOVIE_AFTER_SUCCESSFUL_REQUEST"
const SORT_MOVIES_A_Z = "SORT_MOVIES_A_Z"
const SORT_MOVIES_Z_A = "SORT_MOVIES_Z_A"
const SORT_MOVIES_MOST_RECENT = "SORT_MOVIES__MOST_RECENT"
const SORT_MOVIES_OLDEST = "SORT_MOVIES_OLDEST"
const ADD_MOVIE = "ADD_MOVIE"

//!ACTION CREATORS

// LOADING MOVIES 
export const startLoadMoviesRequest = () => ({ // used in middleware
        type: START_LOAD_MOVIES_REQUEST
})

export const addMoviesAfterSuccessfulRequest = movies => ({ // used in middleware
        type: ADD_MOVIE_AFTER_SUCCESSFUL_REQUEST,
        payload: {
                movies
        }
})

// SORTING MOVIES 
export const sortMoviesFromAtoZ = _movies => ({
        type: SORT_MOVIES_A_Z,
        payload: {
                movies: _movies.sort((a, b) => a.attributes.title.localeCompare(b.attributes.title))
        }
})

export const sortMoviesFromZtoA = _movies => ({
        type: SORT_MOVIES_Z_A,
        payload: {
                movies: _movies.sort((a, b) => a.attributes.title.localeCompare(b.attributes.title)).reverse()
        }
})

export const sortMoviesFromMostRecent = _movies => ({
        type: SORT_MOVIES_MOST_RECENT,
        payload: {
                movies: _movies.sort((a, b) => a.attributes.release_year.split(' ').slice(-1)[0].localeCompare(b.attributes.release_year.split(' ').slice(-1)[0])).reverse()
        }
})

export const sortMoviesFromOldest = _movies => ({
        type: SORT_MOVIES_OLDEST,
        payload: {
                movies: _movies.sort((a, b) => a.attributes.release_year.split(' ').slice(-1)[0].localeCompare(b.attributes.release_year.split(' ').slice(-1)[0]))
        }
})

//ADDING MOVIE TO DATABASE THEN RERENDER MOVIE LIST
export const addMovie = movie => ({
        type: ADD_MOVIE,
        payload: {
                movie
        }
})