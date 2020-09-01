import React from 'react'
import '../../assets/Movie/movie.css'
import Skeleton from 'react-loading-skeleton'

const Movie = ({ movie }) => {
    return (
        <li key={movie.id} className="movie-info">
            <div className="poster">
                <img src={movie.attributes.poster} alt={ movie.attributes.title || <Skeleton />}/>
            </div>
            <div className="content" >
                <p>{movie.attributes.title || <Skeleton />}</p>
                <p>{movie.attributes.genre || <Skeleton />}</p>
                <p>{movie.attributes.country || <Skeleton />}</p>
                <p>{movie.attributes.actors || <Skeleton />}</p>
                <p>{movie.attributes.imdb_rating || <Skeleton />}</p>
                <p>{movie.attributes.language || <Skeleton />}</p>
                <p>{movie.attributes.plot || <Skeleton />}</p>
                <p>{movie.attributes.production || <Skeleton />}</p>
                <p>{movie.attributes.runtime || <Skeleton />}</p>
                <p>{movie.attributes.release_year || <Skeleton />}</p>
            </div>
        </li>
    )
}

export default Movie