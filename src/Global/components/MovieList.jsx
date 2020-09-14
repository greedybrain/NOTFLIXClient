import React from 'react'
import Movie from './Movie'
import '../../assets/MovieList/movieList.css'
import { useSelector } from 'react-redux'

const MovieList = () => {
    const movies = useSelector(state => state.movieRed.movies)
    
    const renderMovies = movies.map(movie => {
        return <Movie key={movie.id} movie={movie}  />
    })
    return (
        <ul className="movie-list">
            { renderMovies }
        </ul>
    )
}

export default MovieList
