import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { supabase } from "../lib/supabase.js";

function getRegistrationErrorMessage(error) {
  const code = error?.code ?? "";
  const message = error?.message ?? "";

  switch (code) {
    case "email_address_not_authorized":
      return "Supabase не разрешает отправлять письма на этот адрес. Для теста используйте электронную почту, связанную с вашим аккаунтом Supabase.";

    case "email_provider_disabled":
      return "Регистрация по электронной почте отключена в настройках Supabase.";

    case "signup_disabled":
      return "Создание новых аккаунтов отключено в настройках Supabase.";

    case "over_email_send_rate_limit":
      return "Превышен лимит отправки писем. Подождите некоторое время и повторите попытку.";

    case "over_request_rate_limit":
      return "Слишком много запросов. Подождите несколько минут и повторите попытку.";

    case "email_address_invalid":
      return "Supabase не принимает этот адрес электронной почты. Проверьте правильность адреса.";

    case "email_exists":
    case "user_already_exists":
      return "Аккаунт с этой электронной почтой уже существует.";

    case "weak_password":
      return "Пароль недостаточно надёжный. Используйте не менее 8 символов.";

    default:
      return `Ошибка Supabase: ${
        message || "неизвестная ошибка"
      }${code ? ` (${code})` : ""}`;
  }
}

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [
    passwordConfirmation,
    setPasswordConfirmation,
  ] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (password.length < 8) {
      setErrorMessage(
        "Пароль должен содержать не менее 8 символов.",
      );
      return;
    }

    if (password !== passwordConfirmation) {
      setErrorMessage("Введённые пароли не совпадают.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } =
        await supabase.auth.signUp({
          email: email.trim(),
          password,

          options: {
            emailRedirectTo: `${window.location.origin}/book`,

            data: {
              full_name: fullName.trim(),
            },
          },
        });

      if (error) {
        throw error;
      }

      if (data.session) {
        navigate("/book", {
          replace: true,
        });
        return;
      }

      setSuccessMessage(
        "Аккаунт создан. Откройте письмо от IFRS Library и подтвердите электронную почту.",
      );

      setPassword("");
      setPasswordConfirmation("");
    } catch (error) {
      console.error("Ошибка регистрации:", error);

      setErrorMessage(
        getRegistrationErrorMessage(error),
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
            Персональная библиотека
          </p>

          <h1>
            Начните собирать собственную книгу МСФО
          </h1>

          <p>
            Аккаунт позволит сохранять последнее место
            чтения, прогресс, закладки и персональные
            настройки.
          </p>
        </div>

        <Link to="/" className="auth-back-link">
          ← Вернуться на главную
        </Link>
      </section>

      <section className="auth-form-panel">
        <div className="auth-card">
          <div className="auth-card-heading">
            <p className="auth-eyebrow">
              Новый читатель
            </p>

            <h2>Создание аккаунта</h2>

            <p>
              После регистрации подтвердите адрес
              электронной почты.
            </p>
          </div>

          {errorMessage && (
            <div className="auth-message auth-message-error">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="auth-message auth-message-success">
              {successMessage}
            </div>
          )}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <label>
              <span>Имя</span>

              <input
                type="text"
                value={fullName}
                onChange={(event) =>
                  setFullName(event.target.value)
                }
                placeholder="Как к вам обращаться"
                autoComplete="name"
                minLength={2}
                required
              />
            </label>

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
                placeholder="Не менее 8 символов"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </label>

            <label>
              <span>Повторите пароль</span>

              <input
                type="password"
                value={passwordConfirmation}
                onChange={(event) =>
                  setPasswordConfirmation(
                    event.target.value,
                  )
                }
                placeholder="Повторите пароль"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </label>

            <button
              type="submit"
              className="auth-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Создаём аккаунт…"
                : "Создать аккаунт"}
            </button>
          </form>

          <p className="auth-switch">
            Уже есть аккаунт?{" "}
            <Link to="/login">Войти</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;