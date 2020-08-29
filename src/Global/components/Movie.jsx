import React from 'react'

const Movie = ({movie}) => {
    return (
        <li key={movie.id} className="movie-info">
            <div className="cover">
                <img src={movie.attributes.poster} alt="Hulk"/>
            </div>
            <div className="meta-data">
                <h1>{movie.attributes.title}</h1>
                <h3>{movie.attributes.release_year}</h3>
                <h3>{movie.attributes.plot}</h3>
            </div>
        </li>
    )
}

export default Movie
