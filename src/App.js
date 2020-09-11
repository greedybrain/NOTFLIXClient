import React, { useEffect, useState } from 'react';
import AllMoviesContainer from './Pages/Home/AllMovies/containers/AllMoviesContainer';
import EntryPage from './Pages/LoginSIgnupPage/containers/EntryPage';
import Header from './Global/components/Header';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN')
  const [user, setUser] = useState({})
  const [userMovies, setUserMovies] = useState([])
  const [username, setUsername] = useState('')
  const [userId, setUserId] = useState('')
  const history = useHistory()

  const checkLoggedInStatus = async () => {
    try {
      const response = await axios.get("http://localhost:3001/logged_in", {
        withCredentials: true
      })
      if (response.data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
        setLoggedInStatus('LOGGED_IN')
        setUser(response.data.user)
        setUserMovies(response.data.user.movies)
        setUsername(response.data.user.username)
        setUserId(response.data.user.id)
      } else if (!response.data.logged_in && loggedInStatus === "LOGGED_IN") {
        setLoggedInStatus('NOT_LOGGED_IN')
        setUser({})
        setUserMovies([])
        setUsername('')
        setUserId('')
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    checkLoggedInStatus()
  })

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/sessions",
        { email, password },
        { withCredentials: true }
      )
      setLoggedInStatus("LOGGED_IN")
      setUser(response.data)
      setUserMovies(response.data.user.data.attributes.movies)
      setUsername(response.data.user.data.attributes.username)
      setUserId(response.data.user.data.id)
      this.props.history.replace('/all_movies')
    } catch(e) {
      console.log(e)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await axios.delete("http://localhost:3001/logout", {
        withCredentials: true
      })
      setLoggedInStatus("NOT_LOGGED_IN")
      setUser({})
      setUserMovies([])
      setUsername('')
      setUserId('')
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <div className="App">
        <Switch>
          {/* Route to all movies page  */}
          <Route
            exact
            path="/all_movies"
            render={
              props => <AllMoviesContainer {...props} 
              loggedInStatus={loggedInStatus} 
              username={username} 
              userMovies={userMovies}
              setUserMovies={setUserMovies}
              handleLogout={handleLogout}
              userId={userId}
              />
            }
          />
        
          {/* Route to login and signup page  */}
          <Route
            exact
            path="/"
            render={
              props => loggedInStatus === "LOGGED_IN" ? <Redirect to="/all_movies" /> : <EntryPage {...props} handleLogin={handleLogin} />
            }
          />
        </Switch>
    </div>
  );
}

export default App;
