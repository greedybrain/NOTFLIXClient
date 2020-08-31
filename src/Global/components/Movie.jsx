import React from 'react'

const Movie = ({ movie }) => {
    return (
        <li key={movie.id} className="movie-info">
            <div className="poster">
                <img src={movie.attributes.poster} alt={ movie.attributes.title }/>
            </div>
            <div className="content">
                <p>{movie.attributes.title}</p>
                <p>{movie.attributes.genre}</p>
                <p>{movie.attributes.country}</p>
                <p>{movie.attributes.actors}</p>
                <p>{movie.attributes.imdb_rating}</p>
                <p>{movie.attributes.language}</p>
                <p>{movie.attributes.plot}</p>
                <p>{movie.attributes.production}</p>
                <p>{movie.attributes.runtime}</p>
                <p>{movie.attributes.release_year}</p>
            </div>
        </li>
    )
}

export default Movie