import { Link } from "react-router";

function SectionPlaceholder({
  label,
  title,
  description,
  plannedItems,
}) {
  return (
    <main className="placeholder-page">
      <section className="placeholder-hero">
        <span className="placeholder-status">Раздел в разработке</span>

        <p className="page-label">{label}</p>

        <h1>{title}</h1>

        <p className="placeholder-description">{description}</p>
      </section>

      <section className="placeholder-content">
        <h2>Что появится в этом разделе</h2>

        <ul className="placeholder-list">
          {plannedItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="placeholder-actions">
          <Link to="/ifrs" className="primary-link-button">
            Перейти к стандартам МСФО
          </Link>

          <Link to="/" className="secondary-link-button">
            Вернуться на главную
          </Link>
        </div>
      </section>
    </main>
  );
}

export default SectionPlaceholder;