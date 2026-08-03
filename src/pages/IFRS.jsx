import { useState } from "react";
import { Link } from "react-router";
import { FaSearch } from "react-icons/fa";

import { ifrsStandards } from "../data/ifrsStandards.js";

function IFRS() {
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredStandards = ifrsStandards.filter((standard) => {
    const searchableText = `
      ${standard.code}
      ${standard.title}
      ${standard.description}
    `.toLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  return (
    <main className="standards-page">
      <section className="standards-heading">
        <p className="page-label">Библиотека стандартов</p>

        <h1>МСФО (IFRS)</h1>

        <p>
          Международные стандарты финансовой отчётности с понятными
          объяснениями, практическими примерами и профессиональными источниками.
        </p>
      </section>

      <section className="standards-search">
        <label htmlFor="ifrs-search">Поиск по стандартам</label>

        <div className="search-field">
          <FaSearch aria-hidden="true" />

          <input
            id="ifrs-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Например: IFRS 16, аренда или финансовые инструменты"
          />
        </div>

        <p className="search-result-count">
          Найдено стандартов: {filteredStandards.length}
        </p>
      </section>

      {filteredStandards.length > 0 ? (
        <section className="standards-grid" aria-label="Список стандартов МСФО">
          {filteredStandards.map((standard) => (
            <article className="standard-card" key={standard.id}>
              <span className="standard-code">{standard.code}</span>

              <h2>{standard.title}</h2>

              <p>{standard.description}</p>

             <Link
  to={`/ifrs/${standard.id}`}
  className="standard-button"
>
  Открыть стандарт
</Link>
            </article>
          ))}
        </section>
      ) : (
        <section className="empty-search-result">
          <h2>Ничего не найдено</h2>

          <p>
            Попробуй изменить запрос. Например: «IFRS 9», «выручка» или
            «аренда».
          </p>
        </section>
      )}
    </main>
  );
}

export default IFRS;