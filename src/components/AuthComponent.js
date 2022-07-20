import React from "react";

function AuthComponent({title, buttonName, onSubmit, children}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(email, password);
  }

  return (
    <section className="auth page__auth">
      <h2 className="auth__heading">{title}</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input className="auth__input" type="email" placeholder="Email" required minLength="1" maxLength="100" name="email" value={email} onChange={evt => setEmail(evt.target.value)}/>
        <input className="auth__input" type="password" placeholder="Пароль" required minLength="1" maxLength="100" name="password" value={password} onChange={evt => setPassword(evt.target.value)}/>
        <button className="auth__button" type="submit">{buttonName}</button>
      </form>
      {children}
    </section>
  );
}

export default AuthComponent;
