import React, { useEffect, useState } from 'react';
import AllMoviesContainer from './Pages/Home/AllMovies/containers/AllMoviesContainer';
import EntryPage from './Pages/LoginSIgnupPage/containers/EntryPage';
// import Header from './Global/components/Header';
import { Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'

function App() {

  const [loggedInStatus, setLoggedInStatus] = useState(false)
  const [user, setUser] = useState({})

  const checkLoggedInStatus = async () => {
    const response = await axios.get("http://localhost:3001/logged_in", {
      withCredentials: true
    })
    if (response.data.logged_in && loggedInStatus === false) {
      setLoggedInStatus(true)
      setUser(response.data.user)
    } else if (!response.data.logged_in && loggedInStatus === true) {
      setLoggedInStatus(false)
      setUser({})
    }
  }
  
  useEffect(() => {
    checkLoggedInStatus()
  })

  const handleLoginRequest = async (email, password) => {
    const response = await axios
      .post(
        'http://localhost:3001/login',
        { email, password },
        { withCredentials: true }
    )
    setUser(response.data)
    console.log(user)
  }

  const handleLogoutRequest = async () => {
    await axios.delete('http://localhost:3001/logout')
    setUser({})
  }

  return (
    <div className="App">
        <Switch>
          {/* Route to all movies page  */}
          <Route
            exact
            path="/all_movies"
            render={
              props => <AllMoviesContainer loggedInStatus={loggedInStatus} {...props} />
            }
        />
        
          {/* Route to login and signup page  */}
          <Route
            exact
            path="/"
            render={
              props => loggedInStatus === true ? <Redirect to="/all_movies" /> : <EntryPage {...props} handleLoginRequest={handleLoginRequest}  />
            }
          />
        </Switch>
    </div>
  );
}

export default App;
