import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "FirebaseConfig";
import { useAuth } from "contexts/AuthContext";
import "./LogoutBtn.scss";

export function LogoutBtn() {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      setLoading(true);
      await logout(auth);
      navigate("/", { replace: false });
    } catch (err) {
      console.log(err);
      return;
    }
    setLoading(false);
  }

  return (
    <button
      className="LogoutBtn"
      type="submit"
      onClick={handleLogout}
      disabled={loading}
    >
      logout
    </button>
  );
}
