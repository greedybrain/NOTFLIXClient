import React, { PureComponent } from 'react'
import axios from 'axios'
import { getFrom } from '../../../../Tools/config'
import MovieList from '../../../../Global/components/MovieList'

class AllMoviesContainer extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        let { baseUrl, parameters} = getFrom.endpoints
        axios(`${baseUrl}${parameters.allMovies}`)
            .then(response => {
                this.setState({
                    movies: response.data.movies.data
                })
            })
    }

    render() {
        let { movies } = this.state
        return (
            <div className="home-movie-list">
                <MovieList movies={movies} />
            </div>
        )
    }
}

export default AllMoviesContainer