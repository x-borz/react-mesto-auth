import {Link} from 'react-router-dom';

function Header({linkName, to}) {
  return (
    <header className="header page__header">
      <a className="header__logo" href="#"></a>
      <Link className="header__link" to={to}>{linkName}</Link>
    </header>
  );
}

export default Header;
