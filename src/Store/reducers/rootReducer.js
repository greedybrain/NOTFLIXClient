import { combineReducers } from 'redux'
import userReducer from './userReducer'
import movieReducer from './movieReducer'

const rootReducer = combineReducers({
        userRed: userReducer,
        movieRed: movieReducer
})

export default  rootReducer