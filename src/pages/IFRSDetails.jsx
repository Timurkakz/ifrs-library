import { Link, useParams } from "react-router";

import Checklist from "../components/standards/Checklist.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import JournalEntries from "../components/standards/JournalEntries.jsx";
import ScheduleTable from "../components/standards/ScheduleTable.jsx";
import SourcesList from "../components/standards/SourcesList.jsx";
import { formatCurrency } from "../utils/formatCurrency.js";
import { ifrsStandards } from "../data/ifrsStandards.js";
import StandardActions from "../components/standards/StandardActions.jsx";
import { ifrsContentById } from "../content/ifrs/index.js";



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

  const content = ifrsContentById[standard.id] ?? null;

const readyStandards = ifrsStandards.filter((item) =>
  Boolean(ifrsContentById[item.id])
);

const currentReadyIndex = readyStandards.findIndex(
  (item) => item.id === standard.id
);

const previousStandard =
  currentReadyIndex > 0
    ? readyStandards[currentReadyIndex - 1]
    : null;

const nextStandard =
  currentReadyIndex >= 0 &&
  currentReadyIndex < readyStandards.length - 1
    ? readyStandards[currentReadyIndex + 1]
    : null;


  return (
    <main className="standard-details-page">

<Breadcrumbs
  items={[
    {
      label: "Главная",
      to: "/",
    },
    {
      label: "МСФО",
      to: "/ifrs",
    },
    {
      label: standard.code,
    },
  ]}
/>



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

{content?.replacedBy && (
  <section
    className="replacement-notice"
    aria-label="Информация о замене стандарта"
  >
    <div>
      <span className="replacement-notice-label">
        Архивный стандарт
      </span>

      <h2>{content.replacedBy.title}</h2>

      <p>{content.replacedBy.description}</p>
    </div>

    <Link
      to={content.replacedBy.path}
      className="replacement-notice-link"
    >
      Перейти к {content.replacedBy.code} →
    </Link>
  </section>
)}


{content && <StandardActions />}

     {content && (
  <nav className="standard-toc" aria-label="Содержание стандарта">
    <h2>Содержание</h2>

    <div className="standard-toc-links">
      <a href="#overview">Краткий обзор</a>
      <a href="#scope">Область применения</a>
      <a href="#steps">Порядок применения</a>
      <a href="#example">Практический пример</a>
      <a href="#entries">Бухгалтерские проводки</a>
      <a href="#impact">Влияние на отчётность</a>
      <a href="#mistakes">Типичные ошибки</a>
      <a href="#checklist">Чек-лист</a>
      <a href="#sources">Источники</a>
    </div>
  </nav>
)}

     

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

          <section id="scope" className="standard-content-section">
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

          <section id="steps" className="standard-content-section">
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

          <section id="example" className="standard-content-section">
            <p className="page-label">Расчёты и кейсы</p>
            <h2>{content.practicalExample.title}</h2>

            <h3>Исходные данные</h3>

            <ul className="content-list">
              {content.practicalExample.assumptions.map((assumption) => (
                <li key={assumption}>{assumption}</li>
              ))}
            </ul>

            <div className="formula-box">
              <span>
  {content.practicalExample.calculation.label ??
    "Основной расчёт"}
</span>
              <strong>{content.practicalExample.calculation.formula}</strong>
            </div>

           <div className="calculation-summary">
  {(
    content.practicalExample.calculation.summary ?? [
      {
        label: "Обязательство по аренде",
        value:
          content.practicalExample.calculation
            .initialLeaseLiability,
        format: "currency",
      },
      {
        label: "Актив в форме права пользования",
        value:
          content.practicalExample.calculation
            .initialRightOfUseAsset,
        format: "currency",
      },
      {
        label: "Годовая амортизация",
        value:
          content.practicalExample.calculation
            .annualDepreciation,
        format: "currency",
      },
    ]
  ).map((item) => (
    <article key={item.label}>
      <span>{item.label}</span>

      <strong>
        {item.format === "currency"
          ? formatCurrency(
              item.value,
              content.practicalExample.currency,
            )
          : item.value}
      </strong>
    </article>
  ))}
</div>
            <p>{content.practicalExample.calculation.explanation}</p>

<ScheduleTable
  schedule={content.practicalExample.schedule}
  columns={content.practicalExample.scheduleColumns}
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

         <section id="impact" className="standard-content-section">
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

           <div id="checklist" className="standard-anchor-section">
  <h3>Практический чек-лист</h3>

  <Checklist items={content.practicalChecklist} />
</div>
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
              Практические руководства добавляются постепенно на основе
              официальных и профессиональных международных источников.
            </p>
          </section>
        </div>
      )}

{content && (previousStandard || nextStandard) && (
  <nav
    className="standard-pagination"
    aria-label="Навигация между готовыми руководствами"
  >
    <div>
      {previousStandard && (
        <Link
          to={`/ifrs/${previousStandard.id}`}
          className="standard-pagination-link standard-pagination-previous"
        >
          <span>← Предыдущее руководство</span>
          <strong>{previousStandard.code}</strong>
          <small>{previousStandard.title}</small>
        </Link>
      )}
    </div>

    <div>
      {nextStandard && (
        <Link
          to={`/ifrs/${nextStandard.id}`}
          className="standard-pagination-link standard-pagination-next"
        >
          <span>Следующее руководство →</span>
          <strong>{nextStandard.code}</strong>
          <small>{nextStandard.title}</small>
        </Link>
      )}
    </div>
  </nav>
)}


    </main>
  );
}

export default IFRSDetails;