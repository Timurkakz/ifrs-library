import { Link, useParams } from "react-router";

import { ifrsStandards } from "../data/ifrsStandards.js";
import { ifrs16Content } from "../content/ifrs/ifrs16.js";

function formatCurrency(value, currency = "тенге") {
  return `${new Intl.NumberFormat("ru-RU").format(value)} ${currency}`;
}

function IFRSDetails() {
  const { standardId } = useParams();

  const standard = ifrsStandards.find(
    (item) => String(item.id) === standardId
  );

  if (!standard) {
    return (
      <main className="standard-details-page">
        <section className="standard-not-found">
          <h1>Стандарт не найден</h1>

          <p>
            Возможно, адрес указан неправильно или материал ещё не добавлен.
          </p>

          <Link to="/ifrs" className="back-link">
            Вернуться к списку МСФО
          </Link>
        </section>
      </main>
    );
  }

  const content = standard.id === 16 ? ifrs16Content : null;

  return (
    <main className="standard-details-page">
      <Link to="/ifrs" className="back-link">
        ← Все стандарты МСФО
      </Link>

      <header className="standard-details-header">
        <span className="standard-code">{standard.code}</span>

        <h1>{standard.title}</h1>

        <p>{standard.description}</p>

        {content && (
          <div className="standard-meta">
            <span>{content.status}</span>
            <span>Действует с: {content.effectiveDate}</span>
            <span>Проверено: {content.lastReviewed}</span>
          </div>
        )}
      </header>

      <nav
        className="standard-section-nav"
        aria-label="Разделы материала"
      >
        <a href="#overview">Обзор</a>
        <a href="#application">Применение</a>
        <a href="#examples">Пример</a>
        <a href="#entries">Проводки</a>
        <a href="#mistakes">Ошибки</a>
        <a href="#sources">Источники</a>
      </nav>

      {content ? (
        <div className="standard-content">
          <section id="overview" className="standard-content-section">
            <p className="page-label">Краткий обзор</p>
            <h2>{content.introduction.title}</h2>

            <p>{content.introduction.text}</p>

            <h3>Основные этапы</h3>

            <ul className="content-list">
              {content.introduction.keyPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="standard-content-section">
            <p className="page-label">Область применения</p>
            <h2>{content.scope.title}</h2>

            <p>{content.scope.text}</p>

            <div className="information-grid">
              {content.scope.exemptions.map((exemption) => (
                <article className="information-card" key={exemption.title}>
                  <h3>{exemption.title}</h3>
                  <p>{exemption.description}</p>
                </article>
              ))}
            </div>

            <div className="warning-box">
              <strong>Обрати внимание:</strong>
              <p>{content.scope.warning}</p>
            </div>
          </section>

          <section id="application" className="standard-content-section">
            <p className="page-label">Практика</p>
            <h2>Пошаговый алгоритм применения</h2>

            <div className="application-steps">
              {content.applicationSteps.map((item) => (
                <article className="application-step" key={item.step}>
                  <span>{item.step}</span>

                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="examples" className="standard-content-section">
            <p className="page-label">Расчёты и кейсы</p>
            <h2>{content.practicalExample.title}</h2>

            <h3>Исходные данные</h3>

            <ul className="content-list">
              {content.practicalExample.assumptions.map((assumption) => (
                <li key={assumption}>{assumption}</li>
              ))}
            </ul>

            <div className="formula-box">
              <span>Расчёт приведённой стоимости</span>
              <strong>{content.practicalExample.calculation.formula}</strong>
            </div>

            <div className="calculation-summary">
              <article>
                <span>Обязательство по аренде</span>
                <strong>
                  {formatCurrency(
                    content.practicalExample.calculation
                      .initialLeaseLiability
                  )}
                </strong>
              </article>

              <article>
                <span>Актив в форме права пользования</span>
                <strong>
                  {formatCurrency(
                    content.practicalExample.calculation
                      .initialRightOfUseAsset
                  )}
                </strong>
              </article>

              <article>
                <span>Годовая амортизация</span>
                <strong>
                  {formatCurrency(
                    content.practicalExample.calculation
                      .annualDepreciation
                  )}
                </strong>
              </article>
            </div>

            <p>{content.practicalExample.calculation.explanation}</p>

            <div className="table-wrapper">
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Год</th>
                    <th>Начальный остаток</th>
                    <th>Проценты</th>
                    <th>Платёж</th>
                    <th>Конечный остаток</th>
                  </tr>
                </thead>

                <tbody>
                  {content.practicalExample.schedule.map((row) => (
                    <tr key={row.year}>
                      <td>{row.year}</td>
                      <td>{formatCurrency(row.openingLiability)}</td>
                      <td>{formatCurrency(row.interestExpense)}</td>
                      <td>{formatCurrency(row.payment)}</td>
                      <td>{formatCurrency(row.closingLiability)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="content-note">
              {content.practicalExample.note}
            </p>
          </section>

          <section id="entries" className="standard-content-section">
            <p className="page-label">Бухгалтерский учёт</p>
            <h2>Примеры проводок</h2>

            <div className="journal-entries">
              {content.journalEntries.map((entry) => (
                <article
                  className="journal-entry"
                  key={`${entry.moment}-${entry.debit}`}
                >
                  <h3>{entry.moment}</h3>

                  <div className="journal-entry-row">
                    <span>Дебет</span>
                    <strong>{entry.debit}</strong>
                  </div>

                  <div className="journal-entry-row">
                    <span>Кредит</span>
                    <strong>{entry.credit}</strong>
                  </div>

                  <div className="journal-entry-row">
                    <span>Сумма</span>
                    <strong>{formatCurrency(entry.amount)}</strong>
                  </div>

                  <p>{entry.explanation}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="standard-content-section">
            <p className="page-label">Финансовая отчётность</p>
            <h2>Влияние на отчётность</h2>

            <div className="information-grid">
              {content.financialStatementImpact.map((item) => (
                <article
                  className="information-card"
                  key={item.statement}
                >
                  <h3>{item.statement}</h3>
                  <p>{item.impact}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="mistakes" className="standard-content-section">
            <p className="page-label">Контроль качества</p>
            <h2>Типичные ошибки</h2>

            <ul className="content-list mistake-list">
              {content.commonMistakes.map((mistake) => (
                <li key={mistake}>{mistake}</li>
              ))}
            </ul>

            <h3>Практический чек-лист</h3>

            <ul className="checklist">
              {content.practicalChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="sources" className="standard-content-section">
            <p className="page-label">Исследование</p>
            <h2>Источники и литература</h2>

            <div className="sources-list">
              {content.sources.map((source) => (
                <article
                  className="source-card"
                  key={`${source.organization}-${source.title}`}
                >
                  <div>
                    <span>{source.language}</span>
                    <span>{source.type}</span>
                  </div>

                  <h3>{source.title}</h3>
                  <p>{source.organization}</p>

                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Открыть источник ↗
                  </a>
                </article>
              ))}
            </div>

            <div className="disclaimer-box">
              <strong>Важно</strong>
              <p>{content.disclaimer}</p>
            </div>
          </section>
        </div>
      ) : (
        <div className="standard-content">
          <section className="standard-content-section">
            <p className="page-label">Материал готовится</p>
            <h2>Практическое руководство ещё не добавлено</h2>

            <p>
              Сейчас полноценный практический материал подготовлен для
              IFRS 16. Остальные стандарты будут наполняться постепенно
              на основе официальных и профессиональных международных
              источников.
            </p>
          </section>
        </div>
      )}
    </main>
  );
}

export default IFRSDetails;