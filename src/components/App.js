import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Cards from "./Cards";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/auth";

function App() {
  const history = useHistory();

  const [currentUser, setCurrentUser] = React.useState({});
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = React.useState(false);
  const [isTooltipOpened, setIsTooltipOpened] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const showTooltip = isSuccessful => {
    setIsTooltipOpened(true);
    setIsRegistrationSuccessful(isSuccessful);
  }

  const handleLogin = () => {
    setLoggedIn(true);
  }

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then(res => {
          if (res) {
            setLoggedIn(true);
            history.push("/");
          }
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <InfoTooltip isRegistrationSuccessful={isRegistrationSuccessful} isOpened={isTooltipOpened} onClose={() => setIsTooltipOpened(false)}/>
        <Switch>
          <Route path="/sign-up">
            <Register showTooltip={showTooltip}/>
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} showTooltip={showTooltip}/>
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
