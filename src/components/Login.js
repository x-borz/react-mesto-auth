import AuthComponent from "./AuthComponent";
import Header from "./Header";
import React from "react";
import auth from "../utils/auth";
import {Link, useHistory} from "react-router-dom";

function Login({handleLogin, showTooltip}) {
  const history = useHistory();

  const onLogin = (email, password) => {
    auth.authorize(email, password)
      .then(data => {
        if (data.token) {
          handleLogin();
          history.push('/');
        }
      })
      .catch(err => {
        console.log(err)
        showTooltip(false);
      });
  }

  return (
    <>
      <Header>
        <Link className="header__link" to="/sign-up">Регистрация</Link>
      </Header>
      <AuthComponent title="Вход" buttonName="Войти" onSubmit={onLogin} />
    </>
  );
}

export default Login;
