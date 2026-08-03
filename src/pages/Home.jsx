import {
  FaBook,
  FaBalanceScale,
  FaRobot,
  FaSearch,
  FaNewspaper,
} from "react-icons/fa";

import { MdAccountBalance } from "react-icons/md";

function Card({ icon, title, text }) {
  return (
    <article className="card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function Home() {
  return (
    <main>
      <section className="hero">
        <h1>📚 IFRS Library</h1>

        <p>
          Библиотека МСФО, МСБУ, IFRIC и законодательства Казахстана
        </p>

        <button type="button">
          <FaSearch />
          Начать поиск
        </button>
      </section>

      <section className="cards">
        <Card
          icon={<FaBook />}
          title="МСФО (IFRS)"
          text="Все международные стандарты финансовой отчетности."
        />

        <Card
          icon={<MdAccountBalance />}
          title="МСБУ (IAS)"
          text="Международные стандарты бухгалтерского учета."
        />

        <Card
          icon={<FaBalanceScale />}
          title="Законодательство"
          text="Нормативные документы Республики Казахстан."
        />

        <Card
          icon={<FaRobot />}
          title="ИИ-помощник"
          text="Ответы на вопросы по МСФО простым языком."
        />

        <Card
          icon={<FaNewspaper />}
          title="Новости"
          text="Последние изменения стандартов и законодательства."
        />
      </section>
    </main>
  );
}

export default Home;