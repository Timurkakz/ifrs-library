import { useState } from "react";
import { Link } from "react-router";
import { FaSearch } from "react-icons/fa";

import { iasStandards } from "../data/iasStandards.js";
import { iasContentById } from "../content/ias/index.js";

function IAS() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showReadyOnly, setShowReadyOnly] = useState(false);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredStandards = iasStandards.filter((standard) => {
    const searchableText = `
      ${standard.code}
      ${standard.title}
      ${standard.description}
    `.toLowerCase();

    const matchesSearch = searchableText.includes(normalizedQuery);
    const hasGuide = Boolean(iasContentById[standard.id]);
    const matchesStatus = !showReadyOnly || hasGuide;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="standards-page">
      <section className="standards-heading">
        <p className="page-label">Библиотека стандартов</p>

        <h1>МСБУ (IAS)</h1>

        <p>
          Международные стандарты бухгалтерского учёта с практическими
          объяснениями, расчётами, проводками и профессиональными источниками.
        </p>
      </section>

      <section className="standards-search">
        <label htmlFor="ias-search">Поиск по стандартам</label>

        <div className="search-field">
          <FaSearch aria-hidden="true" />

          <input
            id="ias-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Например: IAS 2, запасы или основные средства"
          />
        </div>

        <div className="ifrs-filter-row">
          <label className="ready-filter">
            <input
              type="checkbox"
              checked={showReadyOnly}
              onChange={(event) =>
                setShowReadyOnly(event.target.checked)
              }
            />

            <span>Показывать только готовые руководства</span>
          </label>

          <p className="search-result-count">
            Найдено стандартов: {filteredStandards.length}
          </p>

          {(searchQuery || showReadyOnly) && (
            <button
              type="button"
              className="reset-filters-button"
              onClick={() => {
                setSearchQuery("");
                setShowReadyOnly(false);
              }}
            >
              Сбросить фильтры
            </button>
          )}
        </div>
      </section>

      {filteredStandards.length > 0 ? (
        <section
          className="standards-grid"
          aria-label="Список стандартов МСБУ"
        >
          {filteredStandards.map((standard) => {
            const hasGuide = Boolean(
              iasContentById[standard.id],
            );

            return (
              <article
                className="standard-card"
                key={standard.id}
              >
                <div className="standard-card-top">
                  <span className="standard-code">
                    {standard.code}
                  </span>

                  <span
                    className={
                      hasGuide
                        ? "material-status material-status-ready"
                        : "material-status material-status-progress"
                    }
                  >
                    {hasGuide
                      ? "Руководство готово"
                      : "Материал готовится"}
                  </span>
                </div>

                <h2>{standard.title}</h2>
                <p>{standard.description}</p>

                <Link
                  to={`/ias/${standard.id}`}
                  className="standard-button"
                >
                  {hasGuide
                    ? "Открыть руководство"
                    : "Подробнее"}
                </Link>
              </article>
            );
          })}
        </section>
      ) : (
        <section className="empty-search-result">
          <h2>Ничего не найдено</h2>

          <p>
            Попробуй изменить запрос или сбросить выбранные
            фильтры.
          </p>
        </section>
      )}
    </main> 
  );
}

export default IAS;