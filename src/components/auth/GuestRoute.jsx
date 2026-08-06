import { Navigate, Outlet } from "react-router";

import { useAuth } from "../../context/AuthContext.jsx";

function GuestRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="auth-loading-page">
        <div className="auth-loading-spinner" />
        <p>Проверяем аккаунт…</p>
      </main>
    );
  }

  if (user) {
    return <Navigate to="/book" replace />;
  }

  return <Outlet />;
}

export default GuestRoute;