import AuthComponent from "./AuthComponent";
import React from "react";

function Login({onLogin}) {
  return (
    <AuthComponent title="Вход" buttonName="Войти" onSubmit={onLogin} />
  );
}

export default Login;
