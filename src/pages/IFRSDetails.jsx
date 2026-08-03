import { Link, useParams } from "react-router";

import Checklist from "../components/standards/Checklist.jsx";
import JournalEntries from "../components/standards/JournalEntries.jsx";
import ScheduleTable from "../components/standards/ScheduleTable.jsx";
import SourcesList from "../components/standards/SourcesList.jsx";
import { formatCurrency } from "../utils/formatCurrency.js";
import { ifrsStandards } from "../data/ifrsStandards.js";
import { ifrs16Content } from "../content/ifrs/ifrs16.js";



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

<ScheduleTable
  schedule={content.practicalExample.schedule}
  currency={content.practicalExample.currency}
/>

            <p className="content-note">
              {content.practicalExample.note}
            </p>
          </section>

          <section id="entries" className="standard-content-section">
            <p className="page-label">Бухгалтерский учёт</p>
            <h2>Примеры проводок</h2>

           <JournalEntries
  entries={content.journalEntries}
  currency={content.practicalExample.currency}
/>
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

           <Checklist items={content.practicalChecklist} />
</section>

          <section id="sources" className="standard-content-section">
            <p className="page-label">Исследование</p>
            <h2>Источники и литература</h2>

            <SourcesList sources={content.sources} />

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