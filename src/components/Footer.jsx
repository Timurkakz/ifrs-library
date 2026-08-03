import { Link } from "react-router";
import { FaGithub } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-about">
          <Link to="/" className="footer-logo">
            IFRS Library
          </Link>

          <p>
            Практическая библиотека по МСФО, бухгалтерскому учёту и
            законодательству Казахстана.
          </p>
        </div>

        <div className="footer-navigation">
          <h2>Разделы</h2>

          <nav aria-label="Навигация в подвале">
            <Link to="/ifrs">МСФО</Link>
            <Link to="/ias">МСБУ</Link>
            <Link to="/ifric">IFRIC и SIC</Link>
            <Link to="/laws">Законодательство</Link>
          </nav>
        </div>

        <div className="footer-project">
          <h2>Проект</h2>

          <a
            href="https://github.com/Timurkakz/ifrs-library"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub aria-hidden="true" />
            GitHub
          </a>
        </div>
      </div>

      <div className="footer-disclaimer">
        <p>
          Материалы сайта предназначены для обучения и общего ознакомления.
          Они не заменяют официальный текст стандартов, законодательство или
          профессиональную консультацию.
        </p>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} IFRS Library</p>
      </div>
    </footer>
  );
}

export default Footer;