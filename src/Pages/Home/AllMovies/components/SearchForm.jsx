import React, { Component } from 'react'
class SearchForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            year: '',        
        }

    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        let { title, year } = this.state
        this.props.validateEndpointThenRequestMovieInfo(title, year)
        event.preventDefault()
    }

    render() {
        return (
            <>
            <form  onSubmit={this.handleSubmit}>
                <div className="title">
                    <input
                        onChange={this.handleChange}
                        type="text"
                        placeholder="Movie Title"
                        name="title"
                        value={this.state.title}
                    />
                </div>
                <div className="year">
                    <input 
                        onChange={this.handleChange}
                        type="text" 
                        placeholder="Release Year"
                        name="year"
                        value={this.state.year}
                    />
                </div>
                <div className="submit-button">
                    <button type="submit">Search</button>
                </div>
            </form>
        </>
        )
    }
}

export default SearchForm

// response.data >>
// {Title: "Halloween", Year: "2007", Rated: "R", Released: "31 Aug 2007", Runtime: "109 min", …}
// Actors: "Malcolm McDowell, Brad Dourif, Tyler Mane, Daeg Faerch"
// Awards: "2 wins & 2 nominations."
// BoxOffice: "$58,192,545"
// Country: "USA"
// DVD: "18 Dec 2007"
// Director: "Rob Zombie"
// Genre: "Horror"
// Language: "English"
// Metascore: "47"
// Plot: "The residents of Haddonfield don't know it yet... but death is coming to their small sleepy town. Sixteen years ago, a ten year old boy called Michael Myers brutally kills his step father, his elder sister and her boyfriend. Sixteen years later, he escapes from the mental institution and makes his way back to his hometown intent on a murderous rampage pursued by Dr Sam Loomis who is Michael's doctor and the only one who knows Michael's true evil. Elsewhere a shy teenager by the name of Laurie Strode is babysitting on the night Michael comes home... is it pure coincidence that she and her friends are being stalked by him?"
// Poster: "https://m.media-amazon.com/images/M/MV5BMTMzOTg4MzcxNF5BMl5BanBnXkFtZTcwMzY5MDE1MQ@@._V1_SX300.jpg"
// Production: "MGM"
// Rated: "R"
// Ratings: (3) [{…}, {…}, {…}]
// Released: "31 Aug 2007"
// Response: "True"
// Runtime: "109 min"
// Title: "Halloween"
// Type: "movie"
// Website: "N/A"
// Writer: "Rob Zombie (screenplay), John Carpenter, Debra Hill"
// Year: "2007"
// imdbID: "tt0373883"
// imdbRating: "6.1"
// imdbVotes: "106,763"
// __proto__: Object