import React, { useEffect } from 'react';
import AllMoviesContainer from './Pages/Home/AllMovies/containers/AllMoviesContainer';
import EntryPage from './Pages/LoginSIgnupPage/containers/EntryPage';
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { checkLoggedInStatus } from './Store/middleware/authUsers';

function App() {
  const user = useSelector(state => ({
    status: state.userRed.loggedInStatus
  }))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLoggedInStatus())
  })

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
              props => user.status === "LOGGED_IN" ? <Redirect to="/all_movies" /> : <EntryPage {...props} />
            }
          />
        </Switch>
    </div>
  );
}

export default App;
