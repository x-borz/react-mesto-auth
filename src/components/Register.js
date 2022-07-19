import AuthComponent from "./AuthComponent";
import {Link} from 'react-router-dom';
import React from "react";

function Register({onRegister}) {
  return (
    <AuthComponent title="Регистрация" buttonName="Зарегистрироваться" onSubmit={onRegister}>
      <Link to="/sign-in" className="auth__link">Уже зарегистрированы? Войти</Link>
    </AuthComponent>
  );
}

export default Register;
