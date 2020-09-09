import React from 'react'
import Movie from './Movie'
import '../../assets/MovieList/movieList.css'

const MovieList = ({ movies, handleUserSavesMovie, handleUserDeletesMovie, userMovies, userId}) => {
    
    const renderMovies = movies.map(movie => {
        return <Movie key={movie.id} movie={movie} handleUserSavesMovie={handleUserSavesMovie} userMovies={userMovies} userId={userId} handleUserDeletesMovie={handleUserDeletesMovie} />
    })
    return (
        <ul className="movie-list">
            { renderMovies }
        </ul>
    )
}

export default MovieList
