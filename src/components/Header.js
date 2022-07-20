import {Link, Route} from "react-router-dom";
import React from "react";

function Header({email, onSignOut}) {
  const [isAdditionalHeaderVisible, setIsAdditionalHeaderVisible] = React.useState(false);

  const handleClick = evt => {
    setIsAdditionalHeaderVisible(prev => !prev);
    evt.target.classList.toggle('header__button_active');
  }

  const handleSignOut = () => {
    setIsAdditionalHeaderVisible(false);
    onSignOut();
  }

  return (
    <header className="header page__header">
      <section className={`header__additional ${isAdditionalHeaderVisible? 'header__additional_visible' : ''}`}>
        <p className="header__email">{email}</p>
        <Link className="header__link header__link_place_additional" to="/sign-in" onClick={handleSignOut}>Выйти</Link>
      </section>
      <section className="header__main">
        <a className="header__logo" href="#"></a>
        <Route exact path="/sign-in">
          <Link className="header__link header__link_place_main" to="/sign-up" >Регистрация</Link>
        </Route>
        <Route exact path="/sign-up">
          <Link className="header__link header__link_place_main" to="/sign-in">Войти</Link>
        </Route>
        <Route exact path="/">
          <button className="header__button" type="button" onClick={handleClick}></button>
          <p className="header__email header__email_place_main">{email}</p>
          <Link className="header__link header__link_place_main" to="/sign-in" onClick={handleSignOut}>Выйти</Link>
        </Route>
      </section>
    </header>
  );
}

export default Header;
