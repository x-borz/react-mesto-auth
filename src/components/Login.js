import AuthComponent from "./AuthComponent";
import React from "react";
import auth from "../utils/auth";
import {useHistory} from "react-router-dom";

function Login({handleLogin, showTooltip}) {
  const history = useHistory();

  const onLogin = (email, password) => {
    auth.authorize(email, password)
      .then(data => {
        if (data.token) {
          handleLogin(email);
          history.push('/');
        }
      })
      .catch(err => {
        console.log(err)
        showTooltip(false);
      });
  }

  return (
    <AuthComponent title="Вход" buttonName="Войти" onSubmit={onLogin} />
  );
}

export default Login;
