import React from 'react';
import AllMoviesContainer from './Pages/Home/AllMovies/containers/AllMoviesContainer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import EntryPage from './Pages/LoginSIgnupPage/containers/EntryPage';

function App() {
  return (
    <div className="App">
      <Router>
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
      </Router>
    </div>
  );
}

export default App;
