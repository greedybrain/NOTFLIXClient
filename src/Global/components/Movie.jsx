import React from 'react'

const Movie = ({movie}) => {
    return (
        <li key={movie.id}>
            <h1>{movie.attributes.title}</h1>
            <h3>{movie.attributes.release_year}</h3>
            <h3>{movie.attributes.plot}</h3>
            <img src={movie.attributes.poster} alt="Hulk"/>
        </li>
    )
}

export default Movie
