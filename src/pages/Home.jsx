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
    </main>
  );
}

export default Home;