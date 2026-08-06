import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router";

import { supabase } from "../lib/supabase.js";

function getAuthErrorMessage(message) {
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes(
      "invalid login credentials",
    )
  ) {
    return "Неверная электронная почта или пароль.";
  }

  if (normalizedMessage.includes("email not confirmed")) {
    return "Сначала подтвердите электронную почту.";
  }

  if (normalizedMessage.includes("too many requests")) {
    return "Слишком много попыток. Повторите немного позже.";
  }

  return "Не удалось войти. Проверьте данные и повторите попытку.";
}

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const previousLocation = location.state?.from;

  const destination = previousLocation
    ? `${previousLocation.pathname ?? ""}${
        previousLocation.search ?? ""
      }${previousLocation.hash ?? ""}`
    : "/book";

  async function handleSubmit(event) {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const { error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (error) {
        throw error;
      }

      navigate(destination || "/book", {
        replace: true,
      });
    } catch (error) {
      console.error("Ошибка входа:", error);

      setErrorMessage(
        getAuthErrorMessage(error.message ?? ""),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-brand-panel">
        <Link to="/" className="auth-brand">
          <span>IFRS</span>
          <strong>Library</strong>
        </Link>

        <div className="auth-brand-content">
          <p className="auth-eyebrow">
            Практическая библиотека МСФО
          </p>

          <h1>Одна большая книга для работы с МСФО</h1>

          <p>
            Понятные руководства, расчёты, бухгалтерские
            проводки, чек-листы и источники в единой
            навигации.
          </p>
        </div>

        <Link to="/" className="auth-back-link">
          ← Вернуться на главную
        </Link>
      </section>

      <section className="auth-form-panel">
        <div className="auth-card">
          <div className="auth-card-heading">
            <p className="auth-eyebrow">Личный кабинет</p>
            <h2>Вход в библиотеку</h2>
            <p>
              Введите данные аккаунта, чтобы продолжить
              чтение.
            </p>
          </div>

          {errorMessage && (
            <div className="auth-message auth-message-error">
              {errorMessage}
            </div>
          )}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <label>
              <span>Электронная почта</span>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="name@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label>
              <span>Пароль</span>

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Введите пароль"
                autoComplete="current-password"
                required
              />
            </label>

            <button
              type="submit"
              className="auth-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Выполняется вход…"
                : "Войти"}
            </button>
          </form>

          <p className="auth-switch">
            Ещё нет аккаунта?{" "}
            <Link to="/register">
              Создать аккаунт
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;