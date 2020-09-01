import React from 'react'
import '../../assets/Movie/movie.css'

const Movie = ({ movie }) => {

    const lowerOpacityOnMouseEnter = event => {
        event.target.style.animation = "posterAnimation .2s linear .2s forwards"
    }

    const increaseOpacityOnMouseLeave = event => {
        event.target.style.animation = 'none'
    }

    return (
        <li key={movie.id} className="movie-info" >
            <div className="poster" onMouseEnter={lowerOpacityOnMouseEnter} onMouseLeave={increaseOpacityOnMouseLeave}>
                <p title={movie.attributes.title}>{ movie.attributes.title.length > 7 ? movie.attributes.title.slice(0, 8) + '...' :  movie.attributes.title}</p>
                <img src={movie.attributes.poster} alt={ movie.attributes.title}/>
            </div>
            <div className="content" >
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