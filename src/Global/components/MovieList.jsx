import React from 'react'
import Movie from './Movie'
import '../../assets/MovieList/movieList.css'
import { useSelector } from 'react-redux'

const MovieList = () => {
    const state = useSelector(state => ({
        movies: state.movieRed.movies
    }))
    
    const renderMovies = state.movies.map(movie => {
        return <Movie key={movie.id} movie={movie} />
    })
    return (
        <ul className="movie-list">
            { renderMovies }
        </ul>
    )
}

export default MovieList
