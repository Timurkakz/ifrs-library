import { useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "../../context/AuthContext.jsx";

function BookUserMenu() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const [isSigningOut, setIsSigningOut] =
    useState(false);

  const fullName =
    user?.user_metadata?.full_name?.trim();

  const displayName =
    fullName ||
    user?.email?.split("@")[0] ||
    "Читатель";

  const initial =
    displayName.charAt(0).toUpperCase() || "И";

  async function handleSignOut() {
    setIsSigningOut(true);

    const { error } = await signOut();

    if (error) {
      console.error("Ошибка выхода:", error);
      setIsSigningOut(false);
      return;
    }

    navigate("/", {
      replace: true,
    });
  }

  return (
    <div className="book-user-menu">
      <div
        className="book-user-avatar"
        aria-hidden="true"
      >
        {initial}
      </div>

      <div className="book-user-information">
        <strong>{displayName}</strong>
        <span>{user?.email}</span>
      </div>

      <button
        type="button"
        onClick={handleSignOut}
        disabled={isSigningOut}
      >
        {isSigningOut ? "Выход…" : "Выйти"}
      </button>
    </div>
  );
}

export default BookUserMenu;