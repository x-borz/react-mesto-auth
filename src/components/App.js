import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Cards from "./Cards";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/auth";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  const history = useHistory();

  const [currentUser, setCurrentUser] = React.useState({});
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  const [isTooltipOpened, setIsTooltipOpened] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const showTooltip = isSuccessful => {
    setIsTooltipOpened(true);
    setIsSuccessful(isSuccessful);
  }

  const login = email => {
    setLoggedIn(true);
    setEmail(email);
  }

  const handleRegister = (email, password) => {
    auth.register(email, password)
      .then(res => {
        showTooltip(true);
        history.push('/sign-in');
      })
      .catch(err => {
        console.log(err);
        showTooltip(false);
      });
  }

  const handleLogin = (email, password) => {
    auth.authorize(email, password)
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          login(email);
          history.push('/');
        }
      })
      .catch(err => {
        console.log(err);
        showTooltip(false);
      });
  }

  const handleSignOut = () => {
    localStorage.removeItem('token');
    history.push('/sign-in');
    setLoggedIn(false);
    setEmail("");
  }

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then(res => {
          if (res) {
            login(res.data.email);
            history.push("/");
          }
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={handleSignOut}/>
        <Switch>
          <Route path="/sign-up">
            <Register onRegister={handleRegister}/>
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin}/>
          </Route>
          <ProtectedRoute path="/" loggedIn={loggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser} component={Cards}/>
          <Route path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />};
          </Route>
        </Switch>
        {loggedIn && <Footer />}
        <InfoTooltip isSuccessful={isSuccessful} isOpened={isTooltipOpened} onClose={() => setIsTooltipOpened(false)}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
