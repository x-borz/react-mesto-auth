import {Link, Route} from "react-router-dom";

function Header({email, onSignOut}) {
  return (
    <header className="header page__header">
      <a className="header__logo" href="#"></a>
      <Route exact path="/sign-in">
        <Link className="header__link" to="/sign-up" >Регистрация</Link>
      </Route>
      <Route exact path="/sign-up">
        <Link className="header__link" to="/sign-in">Войти</Link>
      </Route>
      <Route exact path="/">
        <p className="header__email">{email}</p>
        <Link className="header__link" to="/sign-in" onClick={onSignOut}>Выйти</Link>
      </Route>
    </header>
  );
}

export default Header;
