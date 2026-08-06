import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router";

import { useAuth } from "../../context/AuthContext.jsx";

function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <main className="auth-loading-page">
        <div className="auth-loading-spinner" />
        <p>Открываем библиотеку…</p>
      </main>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;