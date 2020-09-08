import React from 'react'

const SortContainer = ({ movies, sortMovies }) => {
    const sortAZ = () => {
        const fromA_Z = movies.sort((a, b) => {
            let aTitle = a.attributes.title
            let bTitle = b.attributes.title
            return aTitle.localeCompare(bTitle)
        }) 
        sortMovies(fromA_Z)
    }

    const sortZA = () => {
        const fromZ_A = movies.sort((a, b) => {
            let aTitle = a.attributes.title
            let bTitle = b.attributes.title
            return aTitle.localeCompare(bTitle)
        }).reverse() 
        sortMovies(fromZ_A)
    }

    const sortOldest = () => {
        const byYear = movies.sort((a, b) => {
            let aYear = a.attributes.release_year.split(' ').slice(-1)[0]
            let bYear = b.attributes.release_year.split(' ').slice(-1)[0]
            return aYear.localeCompare(bYear)
        })
        sortMovies(byYear)
    }

    const sortMostRecent = () => {
        const byYear = movies.sort((a, b) => {
            let aYear = a.attributes.release_year.split(' ').slice(-1)[0]
            let bYear = b.attributes.release_year.split(' ').slice(-1)[0]
            return aYear.localeCompare(bYear)
        }).reverse()
        sortMovies(byYear)
    }

    return (
        <ul>
            <li className="most_recent">
                <button onClick={sortMostRecent}>Newest</button>
            </li>
            <li className="by-yea">
                <button onClick={sortOldest}>Oldest</button>
            </li>
            <li className="sort_in_asc">
                <button onClick={sortAZ}>A-Z</button>
            </li>
            <li className="sort_in_desc">
                <button onClick={sortZA}>Z-A</button>
            </li>
        </ul>
    )
}

export default SortContainer
