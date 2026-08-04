import { ifrsContentById } from "../content/ifrs/index.js";
import { ifrsStandards } from "../data/ifrsStandards.js";

import { iasContentById } from "../content/ias/index.js";
import { iasStandards } from "../data/iasStandards.js";


import { Link } from "react-router";
import {
  FaBalanceScale,
  FaBook,
  FaNewspaper,
  FaPuzzlePiece,
  FaRobot,
  FaSearch,
} from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";

function Card({ icon, title, text, to, status }) {
  const content = (
    <>
      <div className="icon">{icon}</div>

      {status && <span className="home-card-status">{status}</span>}

      <h3>{title}</h3>
      <p>{text}</p>

      {to && <span className="home-card-action">Открыть раздел →</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className="card card-link">
        {content}
      </Link>
    );
  }

  return <article className="card card-disabled">{content}</article>;
}

function Home() {

   const readyGuides = [
  ...ifrsStandards
    .filter((standard) => Boolean(ifrsContentById[standard.id]))
    .map((standard) => ({
      ...standard,
      section: "IFRS",
      path: `/ifrs/${standard.id}`,
    })),

  ...iasStandards
    .filter((standard) => Boolean(iasContentById[standard.id]))
    .map((standard) => ({
      ...standard,
      section: "IAS",
      path: `/ias/${standard.id}`,
    })),
];

  return (
    <main>
      <section className="hero">
        <h1>📚 IFRS Library</h1>

        <p>
          Практическая библиотека МСФО, МСБУ, интерпретаций и законодательства
          Казахстана
        </p>

        <Link to="/ifrs" className="hero-button">
          <FaSearch />
          Перейти к стандартам
        </Link>
      </section>

      <section className="cards" aria-label="Основные разделы">
        <Card
          icon={<FaBook />}
          title="МСФО (IFRS)"
          text="Международные стандарты с объяснениями, примерами, расчётами и проводками."
          to="/ifrs"
        />

        <Card
          icon={<MdAccountBalance />}
          title="МСБУ (IAS)"
          text="Международные стандарты бухгалтерского учёта."
          to="/ias"
        />

        <Card
          icon={<FaPuzzlePiece />}
          title="IFRIC и SIC"
          text="Интерпретации и разъяснения по применению стандартов."
          to="/ifric"
        />

        <Card
          icon={<FaBalanceScale />}
          title="Законодательство"
          text="Законы и нормативные документы Республики Казахстан."
          to="/laws"
        />

        <Card
          icon={<FaRobot />}
          title="ИИ-помощник"
          text="Практические ответы на вопросы по финансовому учёту и МСФО."
          status="В разработке"
        />

        <Card
          icon={<FaNewspaper />}
          title="Новости"
          text="Изменения стандартов, публикации и профессиональные материалы."
          status="В разработке"
        />
      </section>

   <section
        className="ready-guides-section"
        aria-labelledby="ready-guides-title"
      >
        <div className="ready-guides-heading">
          <div>
            <p className="page-label">Практические материалы</p>

            <h2 id="ready-guides-title">
              Готовые руководства по МСФО
            </h2>

            <p>
              Руководства с объяснениями, расчётами, бухгалтерскими
              проводками, типичными ошибками и источниками.
            </p>
          </div>

          <Link to="/ifrs" className="ready-guides-all-link">
            Смотреть все стандарты →
          </Link>
        </div>

        <div className="ready-guides-grid">
          {readyGuides.map((standard) => (
            <Link
  key={`${standard.section}-${standard.id}`}
  to={standard.path}
  className="ready-guide-card"
>
                  <div className="ready-guide-card-top">
                <span className="standard-code">{standard.code}</span>
                <span className="ready-guide-status">Готово</span>
              </div>

              <h3>{standard.title}</h3>
              <p>{standard.description}</p>

              <span className="ready-guide-action">
                Открыть руководство →
              </span>
            </Link>
          ))}
        </div>
           </section>
      
    </main>
  );
}

export default Home;