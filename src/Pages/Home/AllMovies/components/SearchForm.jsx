import React, { useState } from 'react'
    
const SearchForm = ({ validateEndpointThenRequestMovieInfo }) => {
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')

    const handleTitleChange = event => {
        setTitle(event.target.value)
    }

    const handleYearChange = event => {
        setYear(event.target.value)
    }

    const handleSubmit = event => {
        validateEndpointThenRequestMovieInfo(title, year)
        setTitle('')
        setYear('')
        
        event.preventDefault()
    }

    return (
        <form  onSubmit={handleSubmit}>
                <div className="title">
                    <input
                        onChange={handleTitleChange}
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={title}
                    />
                </div>
                <div className="year">
                    <input 
                        onChange={handleYearChange}
                        type="text" 
                        placeholder="Year (Optional)"
                        name="year"
                        value={year}
                    />
                </div>
                <div className="submit-button">
                    <button type="submit"><i className="fas fa-search"></i></button>
                </div>
            </form>
    )
}

export default SearchForm
