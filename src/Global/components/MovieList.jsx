import React from 'react'
import Movie from './Movie'
import '../../assets/MovieList/movieList.css'

const MovieList = ({ movies, user, handleUserSavesMovie }) => {
    
    const renderMovies = movies.map(movie => {
        return <Movie key={movie.id} movie={movie} handleUserSavesMovie={handleUserSavesMovie} />
    })
    return (
        <ul className="movie-list">
            { renderMovies }
        </ul>
    )
}

export default MovieList
