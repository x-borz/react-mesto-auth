import AuthComponent from "./AuthComponent";
import {Link, useHistory} from 'react-router-dom';
import Header from "./Header";
import React from "react";
import auth from "../utils/auth";

function Register({showTooltip}) {
  const history = useHistory();

  const onRegister = (email, password) => {
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

  return (
    <>
      <Header>
        <Link className="header__link" to="/sign-in">Войти</Link>
      </Header>
      <AuthComponent title="Регистрация" buttonName="Зарегистрироваться" onSubmit={onRegister}>
        <Link to="/sign-in" className="auth__link">Уже зарегистрированы? Войти</Link>
      </AuthComponent>
    </>
  );
}

export default Register;
