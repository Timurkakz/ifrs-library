import { Link } from "react-router";

function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-card">
        <span className="not-found-code">404</span>

        <h1>Страница не найдена</h1>

        <p>
          Возможно, адрес указан неправильно, страница была перемещена
          или материал ещё не создан.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="primary-link-button">
            На главную
          </Link>

          <Link to="/ifrs" className="secondary-link-button">
            Перейти к МСФО
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFound;