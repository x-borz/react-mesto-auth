function Header({children}) {
  return (
    <header className="header page__header">
      <a className="header__logo" href="#"></a>
      {children}
    </header>
  );
}

export default Header;
