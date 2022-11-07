import React from "react";
import { Loading } from "components/Loading/Loading";
import { useAuth } from "contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { LogoutBtn } from "./LogoutBtn";
import "./Authbar.scss";

export function Authbar() {
  const { currentUser } = useAuth();

  if (currentUser === undefined) {
    return <Loading />;
  }

  return (
    <>
      <li className="Authbar__login">
        {!currentUser && (
          <NavLink className="Authbar__Navlink" to="/login">
            Login
          </NavLink>
        )}
      </li>
      <li className="Authbar__signup">
        {!currentUser && (
          <NavLink className="Authbar__Navlink" to="/registration">
            Registration
          </NavLink>
        )}
      </li>
      <li className="Authbar__logout">{currentUser && <LogoutBtn />}</li>
    </>
  );
}
