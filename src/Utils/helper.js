export const helper = {
        myEndpoints: {
                baseUrl: 'http://localhost:3001/',
                loggedIn: 'logged_in',
                logIn: 'sessions',
                logout: 'logout',
                backendMovies: 'api/v1/movies',
                addMovieToBackend: 'api/v1/add_movie_home',
                addMovie: userId => {
                        return `users/${userId}/movies`
                }
        },
        thirdPartyEP: {
                apiKey: '691b7eac',
                omdbEP: 'http://www.omdbapi.com/?'
        }
}