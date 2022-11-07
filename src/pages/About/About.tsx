import React from "react";
import { NavLink } from "react-router-dom";
import "./About.scss";

export function About({ className }: { className: string }) {
  return (
    <>
      <nav className={className}>
        <ul>
          <li>
            <NavLink className="Navlink" to="/about/museum">
              Museum
            </NavLink>
          </li>
          <li>
            <NavLink className="Navlink" to="/about/project">
              Project
            </NavLink>
          </li>
          <li>
            <NavLink className="Navlink" to="/about/contacts">
              Contacts
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
