import React from 'react';
import AllMoviesContainer from './Pages/Home/AllMovies/containers/AllMoviesContainer';
import EntryPage from './Pages/LoginSIgnupPage/containers/EntryPage';
import Header from './Global/components/Header';
import { Switch, Route } from 'react-router-dom'

function App() {
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
              props => <EntryPage {...props}  />
            }
          />
        </Switch>
    </div>
  );
}

export default App;
