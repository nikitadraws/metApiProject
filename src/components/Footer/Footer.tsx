import React from "react";
import "./Footer.scss";

export default function Footer() {
  return (
    <div className="Footer">
      <p className="Footer__text">Created by Liubin Nikita</p>
      <p className="Footer__text">
        MET official website:{" "}
        <a
          className="Footer__link"
          target="_blank"
          href="https://www.metmuseum.org"
        >
          https://www.metmuseum.org
        </a>
      </p>
    </div>
  );
}
