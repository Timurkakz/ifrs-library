import { Link, useParams } from "react-router";

import { ifrsStandards } from "../data/ifrsStandards.js";

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

  return (
    <main className="standard-details-page">
      <Link to="/ifrs" className="back-link">
        ← Все стандарты МСФО
      </Link>

      <header className="standard-details-header">
        <span className="standard-code">{standard.code}</span>

        <h1>{standard.title}</h1>

        <p>{standard.description}</p>
      </header>

      <nav
        className="standard-section-nav"
        aria-label="Разделы материала"
      >
        <a href="#overview">Обзор</a>
        <a href="#application">Применение</a>
        <a href="#examples">Примеры</a>
        <a href="#entries">Проводки</a>
        <a href="#mistakes">Ошибки</a>
        <a href="#sources">Источники</a>
      </nav>

      <div className="standard-content">
        <section id="overview" className="standard-content-section">
          <p className="page-label">Краткий обзор</p>
          <h2>Что регулирует стандарт</h2>

          <p>
            Здесь будет понятное объяснение цели стандарта, области его
            применения и основных требований.
          </p>
        </section>

        <section id="application" className="standard-content-section">
          <p className="page-label">Практика</p>
          <h2>Как применять стандарт</h2>

          <p>
            Здесь будет пошаговый алгоритм применения стандарта в реальной
            бухгалтерской и финансовой работе.
          </p>
        </section>

        <section id="examples" className="standard-content-section">
          <p className="page-label">Расчёты и кейсы</p>
          <h2>Практические примеры</h2>

          <p>
            Здесь будут числовые примеры, исходные данные, расчёты и объяснение
            полученного результата.
          </p>
        </section>

        <section id="entries" className="standard-content-section">
          <p className="page-label">Бухгалтерский учёт</p>
          <h2>Примеры проводок</h2>

          <p>
            Здесь будут типовые бухгалтерские проводки и объяснение влияния
            операций на финансовую отчётность.
          </p>
        </section>

        <section id="mistakes" className="standard-content-section">
          <p className="page-label">Контроль качества</p>
          <h2>Типичные ошибки</h2>

          <p>
            Здесь будут распространённые ошибки, спорные вопросы и практический
            чек-лист для проверки.
          </p>
        </section>

        <section id="sources" className="standard-content-section">
          <p className="page-label">Исследование</p>
          <h2>Источники и дополнительная литература</h2>

          <p>
            Здесь будут официальные и профессиональные источники на английском,
            русском и других языках с указанием организации, даты и языка
            публикации.
          </p>
        </section>
      </div>
    </main>
  );
}

export default IFRSDetails;