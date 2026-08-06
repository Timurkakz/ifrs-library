import { Link } from "react-router";

import { ifrsContentById } from "../content/ifrs/index.js";
import { iasContentById } from "../content/ias/index.js";

function BookHome() {
  const readyIFRSCount = Object.keys(ifrsContentById).length;
  const readyIASCount = Object.keys(iasContentById).length;

  return (
    <main className="book-home">
      <section className="book-home-hero">
        <p className="page-label">
          Практическая библиотека
        </p>

        <h1>Большая книга МСФО</h1>

        <p className="book-home-lead">
          Выберите стандарт в содержании слева и изучайте
          понятные объяснения, расчёты, бухгалтерские проводки,
          типичные ошибки и рабочие чек-листы.
        </p>

        <div className="book-home-actions">
          <Link
            to="/book/ifrs/16"
            className="primary-button"
          >
            Начать с IFRS 16
          </Link>

          <Link
            to="/book/ias/2"
            className="secondary-button"
          >
            Открыть IAS 2
          </Link>
        </div>
      </section>

      <section className="book-progress-overview">
        <article>
          <span>IFRS</span>
          <strong>{readyIFRSCount}</strong>
          <p>готовых практических руководств</p>
        </article>

        <article>
          <span>IAS</span>
          <strong>{readyIASCount}</strong>
          <p>готовых практических руководств</p>
        </article>

        <article>
          <span>Формат</span>
          <strong>1 книга</strong>
          <p>с единым содержанием и навигацией</p>
        </article>
      </section>

      <section className="book-home-section">
        <div className="book-home-section-heading">
          <p className="page-label">Как пользоваться</p>
          <h2>Всё необходимое находится внутри главы</h2>
        </div>

        <div className="book-feature-grid">
          <article>
            <span>01</span>
            <h3>Изучи правило</h3>
            <p>
              Краткий обзор, сфера применения и пошаговый
              алгоритм без лишнего канцеляризма.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Разбери пример</h3>
            <p>
              Цифры, формулы, таблицы и объяснение результата.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Проверь проводки</h3>
            <p>
              Практические бухгалтерские записи с пояснениями.
            </p>
          </article>

          <article>
            <span>04</span>
            <h3>Пройди чек-лист</h3>
            <p>
              Контрольный список для подготовки и проверки
              финансовой отчётности.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default BookHome;