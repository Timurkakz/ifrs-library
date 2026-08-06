import { useMemo, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
} from "react-router";

import BookUserMenu from "../components/auth/BookUserMenu.jsx";
import { ifrsStandards } from "../data/ifrsStandards.js";
import { iasStandards } from "../data/iasStandards.js";

import { ifrsContentById } from "../content/ifrs/index.js";
import { iasContentById } from "../content/ias/index.js";

function BookSection({
  title,
  standards,
  contentMap,
  type,
  query,
  onNavigate,
}) {
  const filteredStandards = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return standards;
    }

    return standards.filter((standard) => {
      const searchValue = [
        standard.code,
        standard.title,
        standard.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchValue.includes(normalizedQuery);
    });
  }, [standards, query]);

  if (filteredStandards.length === 0) {
    return null;
  }

  return (
    <details className="book-navigation-section" open>
      <summary>
        <span>{title}</span>
        <small>{filteredStandards.length}</small>
      </summary>

      <div className="book-chapter-list">
        {filteredStandards.map((standard) => {
          const isReady = Boolean(contentMap[standard.id]);

          return (
            <NavLink
              key={standard.id}
              to={`/book/${type}/${standard.id}`}
              onClick={onNavigate}
              className={({ isActive }) =>
                [
                  "book-chapter-link",
                  isActive ? "is-active" : "",
                  isReady ? "is-ready" : "is-in-progress",
                ]
                  .filter(Boolean)
                  .join(" ")
              }
            >
              <span
                className="book-chapter-status"
                aria-label={
                  isReady
                    ? "Руководство готово"
                    : "Руководство готовится"
                }
              />

              <span className="book-chapter-code">
                {standard.code}
              </span>

              <span className="book-chapter-title">
                {standard.title}
              </span>
            </NavLink>
          );
        })}
      </div>
    </details>
  );
}

function BookLayout() {
  

  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="book-shell">
      <button
        type="button"
        className={`book-sidebar-overlay ${
          isMenuOpen ? "is-visible" : ""
        }`}
        onClick={closeMenu}
        aria-label="Закрыть содержание"
      />

      <aside
        className={`book-sidebar ${
          isMenuOpen ? "is-open" : ""
        }`}
      >
        <div className="book-sidebar-header">
          <Link
            to="/book"
            className="book-logo"
            onClick={closeMenu}
          >
            <span>IFRS</span>
            <strong>Library</strong>
          </Link>

          <button
            type="button"
            className="book-sidebar-close"
            onClick={closeMenu}
            aria-label="Закрыть содержание"
          >
            ×
          </button>
        </div>

        <div className="book-sidebar-introduction">
          <p>Большая практическая книга</p>
          <span>
            Стандарты, расчёты, проводки и чек-листы
          </span>
        </div>

        <nav
          className="book-navigation"
          aria-label="Содержание книги"
        >
          <BookSection
            title="IFRS"
            standards={ifrsStandards}
            contentMap={ifrsContentById}
            type="ifrs"
            query={query}
            onNavigate={closeMenu}
          />

          <BookSection
            title="IAS"
            standards={iasStandards}
            contentMap={iasContentById}
            type="ias"
            query={query}
            onNavigate={closeMenu}
          />

          {!query && (
            <>
              <section className="book-future-section">
                <div>
                  <strong>IFRIC</strong>
                  <span>Разъяснения стандартов</span>
                </div>

                <small>Скоро</small>
              </section>

              <section className="book-future-section">
                <div>
                  <strong>SIC</strong>
                  <span>Интерпретации</span>
                </div>

                <small>Скоро</small>
              </section>

              <section className="book-future-section">
                <div>
                  <strong>Другие главы</strong>
                  <span>
                    Conceptual Framework, IFRS for SMEs и IFRS S
                  </span>
                </div>

                <small>Скоро</small>
              </section>
            </>
          )}
        </nav>

        <div className="book-sidebar-footer">
          <Link to="/" className="book-public-link">
            ← Вернуться на сайт
          </Link>
        </div>
      </aside>

      <div className="book-workspace">
        <header className="book-topbar">
          <div className="book-topbar-start">
            <button
              type="button"
              className="book-menu-button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Открыть содержание"
            >
              ☰
            </button>

            <Link to="/book" className="book-mobile-logo">
              IFRS Library
            </Link>
          </div>

          <label className="book-search">
            <span aria-hidden="true">⌕</span>

            <input
              type="search"
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Поиск по всей книге"
              aria-label="Поиск по всей книге"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Очистить поиск"
              >
                ×
              </button>
            )}
          </label>

         <div className="book-topbar-end">
  <BookUserMenu />
</div>
        </header>

        <div className="book-reader">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default BookLayout;