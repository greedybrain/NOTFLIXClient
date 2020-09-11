// STARTING OFF WITH CREATING A REDUCER FOR MOVIES 

const initialState = {
        movies: [],
        title: '',
        year: '',
        loadMoviesRequest: false
}

export default function movieReducer(state = initialState, action) { //pure function 
        switch(action.type) {
                case START_LOAD_MOVIES_REQUEST:
                        return {
                                ...state,
                                loadMoviesRequest: true
                        }
        }
}

// TYPES 
const START_LOAD_MOVIES_REQUEST = "START_LOAD_MOVIES_REQUEST"

// ACTION CREATORS
const startLoadMoviesRequest = () => ({
        type: START_LOAD_MOVIES
})

const addMoviesAfterSuccessfulRequest = movies => {
        type:
}

// this.state = {
//         movies: [],
//         title: '',
//         year: ''
// }

// // HANDLE SEARCH MOVIE BY TITLE AND YEAR 
// movieByTitleAndYear = (title, year)  => {
//         return `${this.thirdPartyBaseUrl}t=${title}&y=${year}&plot=full&apikey=${this.apiKey}`
//     }

//     // HANDLE SEARCH MOVIE BY TITLE
//     movieByTitle = title => {
//         return `${this.thirdPartyBaseUrl}t=${title}&plot=full&apikey=${this.apiKey}`
//     }

//     // REQUESTING ADD MOVIE TO DATABASE ENDPOINT 
//     addMovieToHomePath = () => {
//         return `${this.baseUrl}${this.movieToHome}`
//     }

//     // VALIDATES ENDPOINT PARAMETERS BEFORE INFO IS RECEIVED
//     validateEndpointThenRequestMovieInfo = async (title, year) => {
//         let response;
//         if (title === '') {
//             alert("Please enter a title")
//             return
//         }
//         if (title !== '' && year === '') {
//             response = await axios(`${this.movieByTitle(title)}`)
//             this.addMovieInfo(response)
//         }
//         if (title !== '' && year !== '') {
//             response = await axios(`${this.movieByTitleAndYear(title, year)}`)
//             this.addMovieInfo(response)
//         }
//     }

//     // PERSISTING MOVIE INFO TO DATABASE 
//     addMovieInfo = async res => {
//         const response = await axios.post(
//             `${this.baseUrl}${this.movieToHome}`, 
//             {
//                 title: res.data.Title,
//                 actors: res.data.Actors,
//                 genre: res.data.Genre,
//                 language: res.data.Language,
//                 country: res.data.Country,
//                 plot: res.data.Plot,
//                 poster: res.data.Poster,
//                 runtime: res.data.Runtime,
//                 release_year: res.data.Released,
//                 imdb_rating: res.data.imdbRating,
//                 production: res.data.Production
//             },
//         )
//         this.validateMovie(response)
//     }

//     // VALIDATING IF MOVIE EXISTS ALREADY, OR IS EVEN A VALID MOVIE 
//     validateMovie = res => {
//         if (res.data.movie !== undefined) {
//             const movie = res.data.movie.data
//             let existingMovie = this.state.movies.find(mov => mov.id === movie.id)
//             if (existingMovie === undefined) {
//                 this.setState(prevState => ({
//                     movies: [movie, ...prevState.movies]
//                 }))
//             } else {
//                 alert("Movie already exists")
//             }
//         } else {
//             alert("That movie doesn't exist")
//         }
//     }