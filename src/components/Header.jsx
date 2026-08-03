import { NavLink } from "react-router";

function Header() {
  const getLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <header className="site-header">
      <div className="header-container">
        <NavLink to="/" className="logo">
          IFRS Library
        </NavLink>

        <nav className="nav-menu" aria-label="Основная навигация">
          <NavLink to="/" end className={getLinkClass}>
            Главная
          </NavLink>

          <NavLink to="/ifrs" className={getLinkClass}>
            МСФО
          </NavLink>

          <NavLink to="/ias" className={getLinkClass}>
            МСБУ
          </NavLink>

          <NavLink to="/ifric" className={getLinkClass}>
            IFRIC
          </NavLink>

          <NavLink to="/laws" className={getLinkClass}>
            Законодательство
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;