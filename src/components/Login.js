import AuthComponent from "./AuthComponent";
import Header from "./Header";
import React from "react";

function Login() {
  return (
    <>
      <Header linkName="Регистрация" to="/sign-up" />
      <AuthComponent title="Вход" buttonName="Войти"/>
    </>
  );
}

export default Login;
