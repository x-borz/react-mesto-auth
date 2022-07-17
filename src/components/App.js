import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import {Redirect, Route, Switch} from 'react-router-dom';
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Cards from "./Cards";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route path="/sign-up">
            <Register />
          </Route>
          <Route path="/sign-in">
            <Login />
          </Route>
          <ProtectedRoute path="/" loggedIn={loggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser} component={Cards}/>
          <Route path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />};
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
