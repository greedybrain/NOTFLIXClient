import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sortMoviesFromAtoZ, sortMoviesFromZtoA, sortMoviesFromMostRecent, sortMoviesFromOldest } from '../../../../Store/reducers/movieReducer'

const SortContainer = () => {
    const movies = useSelector(state => state.movieRed.movies)
    const dispatch = useDispatch()

    return (
        <ul>
            <li className="sort_in_asc">
                <button onClick={() => dispatch(sortMoviesFromAtoZ(movies))}>A-Z</button>
            </li>
            <li className="sort_in_desc">
                <button onClick={() => dispatch(sortMoviesFromZtoA(movies))}>Z-A</button>
            </li>
            <li className="most_recent">
                <button onClick={() => dispatch(sortMoviesFromMostRecent(movies))}>Newest</button>
            </li>
            <li className="by-yea">
                <button onClick={() => dispatch(sortMoviesFromOldest(movies))}>Oldest</button>
            </li>
        </ul>
    )
}

export default SortContainer
