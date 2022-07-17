import AuthComponent from "./AuthComponent";
import {Link} from 'react-router-dom';
import Header from "./Header";
import React from "react";
import RegistrationResultPopup from "./RegistrationResultPopup";

function Register() {
  let isOpen=true;
  let isRegistrationSuccessful=false;
  return (
    <>
      <Header linkName="Войти" to="/sign-in"/>

      <AuthComponent title="Регистрация" buttonName="Зарегистрироваться">
        <Link to="/sign-in" className="auth__link" exact>Уже зарегистрированы? Войти</Link>
      </AuthComponent>

      <RegistrationResultPopup isRegistrationSuccessful={isRegistrationSuccessful} isOpen={isOpen} />
    </>
  );
}

export default Register;
