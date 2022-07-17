import React from "react";
import {useHistory} from "react-router-dom";

function AuthComponent({title, buttonName, children}) {
  const history = useHistory();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <section className="auth page__auth">
      <h2 className="auth__heading">{title}</h2>
      <form className="auth__form">
        <input className="auth__input" type="email" placeholder="Email" required minLength="1" maxLength="100" name="email" value={email} onChange={evt => setEmail(evt.target.value)}/>
        <input className="auth__input" type="password" placeholder="Пароль" required minLength="1" maxLength="100" name="password" value={password} onChange={evt => setPassword(evt.target.value)}/>
        <button className="auth__button" type="submit">{buttonName}</button>
      </form>
      {children}
    </section>
  );
}

export default AuthComponent;
