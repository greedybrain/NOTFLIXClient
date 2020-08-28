export const getFrom = {
    endpoints: {
        baseUrl: 'http://localhost:3001/',
        parameters: {
            allMovies: 'api/v1/movies',
            userMovies: userId => {
                return `api/v1/users/${userId}/movies`
            }
        }
    }
}