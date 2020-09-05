import React, { useRef } from 'react'
import '../../assets/Movie/movie.css'

const Movie = ({ movie }) => {
    const refContent = useRef(null)

    const lowerOpacityOnMouseEnter = event => {
        event.target.style.animation = "posterAnimation .2s linear .2s forwards"
    }

    const increaseOpacityOnMouseLeave = event => {
        event.target.style.animation = 'none'
    }

    const handleContentRenderOnClick = () => {
        refContent.current.style.display = "block"
        refContent.current.style.animation = "movieContentModal .3s linear forwards"
    }

    const handleHideContentOnMouseLeave = () => {
        refContent.current.style.display = "none"
    }

    return (
        <li key={movie.id} className="movie-info" onClick={handleContentRenderOnClick} onMouseLeave={handleHideContentOnMouseLeave}>
            <div className="poster" onMouseEnter={lowerOpacityOnMouseEnter} onMouseLeave={increaseOpacityOnMouseLeave}>
                <p title={movie.attributes.title}>{ movie.attributes.title.length > 7 ? movie.attributes.title.slice(0, 8) + '...' :  movie.attributes.title}</p>
                <img src={movie.attributes.poster === 'N/A' ? '/images/poster-nA.jpg' : movie.attributes.poster} alt={ movie.attributes.title}/>
            </div>
            <div className="content" ref={refContent}>
                <div className="modal_poster_vital_info">
                    <div className="modal_poster">
                        <img src={movie.attributes.poster === 'N/A' ? '/images/poster-nA.jpg' : movie.attributes.poster} alt={ movie.attributes.title}/>
                    </div>
                    <div className="vital_info">
                        <p className="movie_title">{movie.attributes.title}</p>
                        <p><strong>Actor(s):</strong> {movie.attributes.actors}</p>
                        <p><strong>Released:</strong> {movie.attributes.release_year}</p>
                        <p><strong>Runtime:</strong> {movie.attributes.runtime}</p>
                        <p><strong>Genre: </strong> {movie.attributes.genre}</p>
                        <p><strong>Produced by:</strong> {movie.attributes.production === null ? 'N/A' : movie.attributes.production}</p>
                    </div>
                </div>
                <div className="country_and_language">
                    <div className="country">
                        <p><i className="fas fa-globe"></i> {movie.attributes.country} -</p>
                    </div>
                    <div className="language">
                        <div className="language-icon">
                            <i className="fas fa-language language-icon"></i>
                        </div>
                        <div className="lang">
                            <p>{movie.attributes.language}</p>
                            
                        </div>
                    </div>
                </div>
                <div className="synopsis">
                    <h2>Synopsis:</h2>
                    <p>{movie.attributes.plot}</p>
                </div>
                <div className="rating_nominate_button">
                    <div className="rating">
                        <div className="rank-icon">
                            <i className="fab fa-imdb imdb"></i>
                        </div>
                        <div className="rank">
                            <p>{movie.attributes.imdb_rating}</p>
                        </div>
                    </div>
                    <div className="nominate_button">
                        <button>Nominate</button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Movie