import React from 'react';
import AllMoviesContainer from './Pages/Home/AllMovies/containers/AllMoviesContainer';
import EntryPage from './Pages/LoginSIgnupPage/containers/EntryPage';
import Header from './Global/components/Header';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'

function App() {

  const handleLoginRequest = async (email, password) => {
    const response = await axios
      .post(
        'http://localhost:3001/login',
        { email, password },
        { withCredentials: true }
    )
    console.log(response)
  }
  return (
    <div className="App">
        <Switch>
          {/* Route to all movies page  */}
          <Route
            exact
            path="/all_movies"
            render={
              props => <AllMoviesContainer {...props} />
            }
        />
        
          {/* Route to login and signup page  */}
          <Route
            exact
            path="/"
            render={
              props => <EntryPage {...props} handleLoginRequest={handleLoginRequest}  />
            }
          />
        </Switch>
    </div>
  );
}

export default App;
